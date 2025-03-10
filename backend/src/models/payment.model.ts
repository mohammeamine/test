import { RowDataPacket, OkPacket } from 'mysql2';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../config/db';

export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded' | 'overdue';
export type PaymentMethodType = 'credit_card' | 'paypal' | 'bank_transfer' | 'cash';

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  description: string;
  status: PaymentStatus;
  paymentMethod?: PaymentMethodType;
  transactionId?: string;
  dueDate: Date;
  paymentDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  paymentId: string;
  invoiceNumber: string;
  studentId: string;
  amount: number;
  description: string;
  status: PaymentStatus;
  dueDate: Date;
  issueDate: Date;
  paidDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMethod {
  id: string;
  studentId: string;
  type: 'credit_card' | 'paypal' | 'bank_account';
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePaymentDTO {
  studentId: string;
  amount: number;
  description: string;
  status?: PaymentStatus;
  paymentMethod?: PaymentMethodType;
  transactionId?: string;
  dueDate: Date;
}

export interface UpdatePaymentDTO {
  amount?: number;
  description?: string;
  status?: PaymentStatus;
  paymentMethod?: PaymentMethodType;
  transactionId?: string;
  dueDate?: Date;
  paymentDate?: Date;
}

export interface CreateInvoiceDTO {
  paymentId: string;
  invoiceNumber: string;
  studentId: string;
  amount: number;
  description: string;
  status?: PaymentStatus;
  dueDate: Date;
  issueDate: Date;
  paidDate?: Date;
}

export interface CreatePaymentMethodDTO {
  studentId: string;
  type: 'credit_card' | 'paypal' | 'bank_account';
  lastFour?: string;
  expiryDate?: string;
  isDefault?: boolean;
}

interface PaymentRow extends Payment, RowDataPacket {}
interface InvoiceRow extends Invoice, RowDataPacket {}
interface PaymentMethodRow extends PaymentMethod, RowDataPacket {}

export class PaymentModel {
  /**
   * Create the payments table if it doesn't exist
   */
  async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS payments (
        id VARCHAR(36) PRIMARY KEY,
        studentId VARCHAR(36) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        description TEXT NOT NULL,
        status ENUM('pending', 'completed', 'failed', 'refunded', 'overdue') NOT NULL DEFAULT 'pending',
        paymentMethod ENUM('credit_card', 'paypal', 'bank_transfer', 'cash'),
        transactionId VARCHAR(255),
        dueDate DATE NOT NULL,
        paymentDate DATETIME,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    await pool.query(query);
  }

  /**
   * Create the invoices table if it doesn't exist
   */
  async createInvoicesTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS invoices (
        id VARCHAR(36) PRIMARY KEY,
        paymentId VARCHAR(36) NOT NULL,
        invoiceNumber VARCHAR(50) NOT NULL UNIQUE,
        studentId VARCHAR(36) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        description TEXT NOT NULL,
        status ENUM('pending', 'completed', 'failed', 'refunded', 'overdue') NOT NULL DEFAULT 'pending',
        dueDate DATE NOT NULL,
        issueDate DATE NOT NULL,
        paidDate DATETIME,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (paymentId) REFERENCES payments(id) ON DELETE CASCADE,
        FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    await pool.query(query);
  }

  /**
   * Create the payment methods table if it doesn't exist
   */
  async createPaymentMethodsTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS payment_methods (
        id VARCHAR(36) PRIMARY KEY,
        studentId VARCHAR(36) NOT NULL,
        type ENUM('credit_card', 'paypal', 'bank_account') NOT NULL,
        lastFour VARCHAR(4),
        expiryDate VARCHAR(7),
        isDefault BOOLEAN NOT NULL DEFAULT FALSE,
        createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;
    
    await pool.query(query);
  }

  /**
   * Find a payment by ID
   */
  async findById(id: string): Promise<Payment | null> {
    const [rows] = await pool.query<PaymentRow[]>(
      'SELECT * FROM payments WHERE id = ?',
      [id]
    );
    
    return rows.length ? rows[0] : null;
  }

  /**
   * Create a new payment
   */
  async create(paymentData: CreatePaymentDTO): Promise<string> {
    const id = uuidv4();
    
    const query = `
      INSERT INTO payments (
        id, studentId, amount, description, status, paymentMethod, transactionId, dueDate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await pool.query<OkPacket>(query, [
      id,
      paymentData.studentId,
      paymentData.amount,
      paymentData.description,
      paymentData.status || 'pending',
      paymentData.paymentMethod,
      paymentData.transactionId,
      paymentData.dueDate
    ]);
    
    return id;
  }

  /**
   * Update a payment
   */
  async update(id: string, paymentData: UpdatePaymentDTO): Promise<boolean> {
    // Build query dynamically based on provided fields
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.entries(paymentData).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });
    
    if (fields.length === 0) {
      return false;
    }
    
    const query = `
      UPDATE payments
      SET ${fields.join(', ')}
      WHERE id = ?
    `;
    
    values.push(id);
    
    const [result] = await pool.query<OkPacket>(query, values);
    
    return result.affectedRows > 0;
  }

  /**
   * Get payments for a student
   */
  async getByStudentId(studentId: string, filters?: {
    status?: PaymentStatus;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }): Promise<Payment[]> {
    let query = 'SELECT * FROM payments WHERE studentId = ?';
    const queryParams: any[] = [studentId];
    
    if (filters?.status) {
      query += ' AND status = ?';
      queryParams.push(filters.status);
    }
    
    if (filters?.startDate) {
      query += ' AND dueDate >= ?';
      queryParams.push(filters.startDate);
    }
    
    if (filters?.endDate) {
      query += ' AND dueDate <= ?';
      queryParams.push(filters.endDate);
    }
    
    query += ' ORDER BY dueDate DESC';
    
    if (filters?.limit) {
      query += ' LIMIT ?';
      queryParams.push(filters.limit);
    }
    
    const [rows] = await pool.query<PaymentRow[]>(query, queryParams);
    
    return rows;
  }

  /**
   * Get upcoming payments for a student
   */
  async getUpcomingPayments(studentId: string, limit: number = 5): Promise<Payment[]> {
    const query = `
      SELECT * FROM payments 
      WHERE studentId = ? AND status = 'pending' AND dueDate >= CURDATE()
      ORDER BY dueDate ASC
      LIMIT ?
    `;
    
    const [rows] = await pool.query<PaymentRow[]>(query, [studentId, limit]);
    
    return rows;
  }

  /**
   * Get overdue payments for a student
   */
  async getOverduePayments(studentId: string): Promise<Payment[]> {
    const query = `
      SELECT * FROM payments 
      WHERE studentId = ? AND status = 'pending' AND dueDate < CURDATE()
      ORDER BY dueDate ASC
    `;
    
    const [rows] = await pool.query<PaymentRow[]>(query, [studentId]);
    
    return rows;
  }

  /**
   * Get payment summary for a student
   */
  async getPaymentSummary(studentId: string): Promise<{
    totalPaid: number;
    pendingPayments: number;
    nextPaymentDue: Date | null;
    overduePayments: number;
  }> {
    // Get total paid
    const [totalPaidRows] = await pool.query<RowDataPacket[]>(
      'SELECT SUM(amount) as total FROM payments WHERE studentId = ? AND status = ?',
      [studentId, 'completed']
    );
    const totalPaid = totalPaidRows[0]?.total || 0;
    
    // Get pending payments total
    const [pendingRows] = await pool.query<RowDataPacket[]>(
      'SELECT SUM(amount) as total FROM payments WHERE studentId = ? AND status = ?',
      [studentId, 'pending']
    );
    const pendingPayments = pendingRows[0]?.total || 0;
    
    // Get next payment due
    const [nextPaymentRows] = await pool.query<PaymentRow[]>(
      `SELECT * FROM payments 
       WHERE studentId = ? AND status = 'pending' AND dueDate >= CURDATE()
       ORDER BY dueDate ASC LIMIT 1`,
      [studentId]
    );
    const nextPaymentDue = nextPaymentRows.length ? nextPaymentRows[0].dueDate : null;
    
    // Get overdue payments count
    const [overdueRows] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) as count FROM payments 
       WHERE studentId = ? AND status = 'pending' AND dueDate < CURDATE()`,
      [studentId]
    );
    const overduePayments = overdueRows[0]?.count || 0;
    
    return {
      totalPaid,
      pendingPayments,
      nextPaymentDue,
      overduePayments
    };
  }

  /**
   * Create a new invoice
   */
  async createInvoice(invoiceData: CreateInvoiceDTO): Promise<string> {
    const id = uuidv4();
    
    const query = `
      INSERT INTO invoices (
        id, paymentId, invoiceNumber, studentId, amount, description, 
        status, dueDate, issueDate, paidDate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await pool.query<OkPacket>(query, [
      id,
      invoiceData.paymentId,
      invoiceData.invoiceNumber,
      invoiceData.studentId,
      invoiceData.amount,
      invoiceData.description,
      invoiceData.status || 'pending',
      invoiceData.dueDate,
      invoiceData.issueDate,
      invoiceData.paidDate
    ]);
    
    return id;
  }

  /**
   * Get invoices for a student
   */
  async getInvoicesByStudentId(studentId: string, limit?: number): Promise<Invoice[]> {
    let query = 'SELECT * FROM invoices WHERE studentId = ? ORDER BY issueDate DESC';
    const queryParams: any[] = [studentId];
    
    if (limit) {
      query += ' LIMIT ?';
      queryParams.push(limit);
    }
    
    const [rows] = await pool.query<InvoiceRow[]>(query, queryParams);
    
    return rows;
  }

  /**
   * Get an invoice by ID
   */
  async getInvoiceById(id: string): Promise<Invoice | null> {
    const [rows] = await pool.query<InvoiceRow[]>(
      'SELECT * FROM invoices WHERE id = ?',
      [id]
    );
    
    return rows.length ? rows[0] : null;
  }

  /**
   * Create a new payment method
   */
  async createPaymentMethod(methodData: CreatePaymentMethodDTO): Promise<string> {
    const id = uuidv4();
    
    // If this is the default method, unset any existing default
    if (methodData.isDefault) {
      await pool.query(
        'UPDATE payment_methods SET isDefault = FALSE WHERE studentId = ?',
        [methodData.studentId]
      );
    }
    
    const query = `
      INSERT INTO payment_methods (
        id, studentId, type, lastFour, expiryDate, isDefault
      ) VALUES (?, ?, ?, ?, ?, ?)
    `;
    
    await pool.query<OkPacket>(query, [
      id,
      methodData.studentId,
      methodData.type,
      methodData.lastFour,
      methodData.expiryDate,
      methodData.isDefault || false
    ]);
    
    return id;
  }

  /**
   * Get payment methods for a student
   */
  async getPaymentMethodsByStudentId(studentId: string): Promise<PaymentMethod[]> {
    const [rows] = await pool.query<PaymentMethodRow[]>(
      'SELECT * FROM payment_methods WHERE studentId = ? ORDER BY isDefault DESC',
      [studentId]
    );
    
    return rows;
  }

  /**
   * Delete a payment method
   */
  async deletePaymentMethod(id: string): Promise<boolean> {
    const [result] = await pool.query<OkPacket>(
      'DELETE FROM payment_methods WHERE id = ?',
      [id]
    );
    
    return result.affectedRows > 0;
  }

  /**
   * Set a payment method as default
   */
  async setDefaultPaymentMethod(id: string, studentId: string): Promise<boolean> {
    // First, unset any existing default
    await pool.query(
      'UPDATE payment_methods SET isDefault = FALSE WHERE studentId = ?',
      [studentId]
    );
    
    // Then set the new default
    const [result] = await pool.query<OkPacket>(
      'UPDATE payment_methods SET isDefault = TRUE WHERE id = ?',
      [id]
    );
    
    return result.affectedRows > 0;
  }
}

export const paymentModel = new PaymentModel(); 