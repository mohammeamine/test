import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import { DepartmentForm } from './department-form';
import { Department, DepartmentFormData } from '../../../types/department';
import { UserResponse } from '../../../types/auth';
import { createDepartment, updateDepartment } from '../../../services/department.service';
import { displayErrorToast, displaySuccessToast } from '../../../utils/error-handler';

interface DepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  department?: Department;
  teachers: UserResponse[];
  onSuccess: () => void;
}

export const DepartmentModal = ({
  isOpen,
  onClose,
  department,
  teachers,
  onSuccess,
}: DepartmentModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!department;

  // Handle form submission
  const handleSubmit = async (data: DepartmentFormData) => {
    setIsSubmitting(true);
    try {
      if (isEditMode && department) {
        await updateDepartment(department.id, data);
        displaySuccessToast('Department updated successfully');
      } else {
        await createDepartment(data);
        displaySuccessToast('Department created successfully');
      }
      onSuccess();
      onClose();
    } catch (error) {
      displayErrorToast(
        error,
        isEditMode
          ? 'Failed to update department'
          : 'Failed to create department'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Edit Department' : 'Create Department'}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? 'Make changes to the department information.'
              : 'Fill out the form to create a new department.'}
          </DialogDescription>
        </DialogHeader>
        <DepartmentForm
          department={department}
          teachers={teachers}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}; 