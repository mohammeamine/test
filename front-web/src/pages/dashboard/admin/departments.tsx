import { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../components/dashboard/layout/dashboard-layout';
import { UserResponse } from '../../../types/auth';
import { Department } from '../../../types/department';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import {
  Search,
  Plus,
  Pencil,
  Trash,
  Filter,
  Users,
  BookOpen,
  Calendar,
  Building,
} from 'lucide-react';
import { DepartmentModal } from '../../../components/dashboard/departments/department-modal';
import { getAllDepartments, deleteDepartment } from '../../../services/department.service';
import { displayErrorToast, displaySuccessToast } from '../../../utils/error-handler';

interface DepartmentsPageProps {
  user: UserResponse;
}

export const DepartmentsPage = ({ user }: DepartmentsPageProps) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [teachers, setTeachers] = useState<UserResponse[]>([]);

  // Fetch departments and teachers on component mount
  useEffect(() => {
    fetchDepartments();
    // In a real app, you would fetch teachers from the API
    // For now, we'll use mock data
    setTeachers([
      {
        id: '1',
        email: 'john.smith@example.com',
        firstName: 'John',
        lastName: 'Smith',
        role: 'teacher',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        email: 'sarah.johnson@example.com',
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: 'teacher',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  }, []);

  // Filter departments when search query or status filter changes
  useEffect(() => {
    let filtered = [...departments];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(dept => dept.status === statusFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(dept => 
        dept.name.toLowerCase().includes(query) || 
        dept.code.toLowerCase().includes(query) ||
        dept.head.toLowerCase().includes(query)
      );
    }
    
    setFilteredDepartments(filtered);
  }, [departments, searchQuery, statusFilter]);

  // Fetch departments from API
  const fetchDepartments = async () => {
    setIsLoading(true);
    try {
      const data = await getAllDepartments();
      setDepartments(data);
      setFilteredDepartments(data);
    } catch (error) {
      displayErrorToast(error, 'Failed to fetch departments');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle department deletion
  const handleDeleteDepartment = async () => {
    if (!selectedDepartment) return;
    
    try {
      await deleteDepartment(selectedDepartment.id);
      displaySuccessToast('Department deleted successfully');
      fetchDepartments();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      displayErrorToast(error, 'Failed to delete department');
    }
  };

  // Open edit modal with selected department
  const openEditDialog = (department: Department) => {
    setSelectedDepartment(department);
    setIsEditModalOpen(true);
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (department: Department) => {
    setSelectedDepartment(department);
    setIsDeleteDialogOpen(true);
  };

  // Reset form and selected department
  const resetForm = () => {
    setSelectedDepartment(null);
  };

  return (
    <DashboardLayout user={user}>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Department Management</h1>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Department
          </Button>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search departments..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('all')}
          >
            All
          </Button>
          <Button
            variant={statusFilter === 'active' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('active')}
          >
            Active
          </Button>
          <Button
            variant={statusFilter === 'inactive' ? 'default' : 'outline'}
            onClick={() => setStatusFilter('inactive')}
          >
            Inactive
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Departments</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p>Loading departments...</p>
              </div>
            ) : filteredDepartments.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <Building className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium">No departments found</p>
                <p className="text-sm text-gray-500">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'Create your first department to get started'}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Head</TableHead>
                    <TableHead>Faculty</TableHead>
                    <TableHead>Students</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDepartments.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell className="font-medium">{department.name}</TableCell>
                      <TableCell>{department.code}</TableCell>
                      <TableCell>{department.head}</TableCell>
                      <TableCell>{department.facultyCount}</TableCell>
                      <TableCell>{department.studentCount}</TableCell>
                      <TableCell>{department.courses}</TableCell>
                      <TableCell>
                        <Badge variant={department.status === 'active' ? 'default' : 'secondary'}>
                          {department.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(department)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openDeleteDialog(department)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Add Department Modal */}
        <DepartmentModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            resetForm();
          }}
          teachers={teachers}
          onSuccess={fetchDepartments}
        />

        {/* Edit Department Modal */}
        {selectedDepartment && (
          <DepartmentModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              resetForm();
            }}
            department={selectedDepartment}
            teachers={teachers}
            onSuccess={fetchDepartments}
          />
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the department "{selectedDepartment?.name}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteDepartment}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};