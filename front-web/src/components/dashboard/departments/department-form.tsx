import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Department, DepartmentFormData } from '../../../types/department';
import { UserResponse } from '../../../types/auth';

// Form validation schema
const departmentSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(100, 'Name must be less than 100 characters'),
  code: z.string().min(2, 'Code must be at least 2 characters').max(10, 'Code must be less than 10 characters')
    .regex(/^[A-Za-z0-9]+$/, 'Code must contain only alphanumeric characters'),
  headId: z.string().optional(),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  established: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  status: z.enum(['active', 'inactive']),
});

interface DepartmentFormProps {
  department?: Department;
  teachers: UserResponse[];
  onSubmit: (data: DepartmentFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const DepartmentForm = ({
  department,
  teachers,
  onSubmit,
  onCancel,
  isSubmitting
}: DepartmentFormProps) => {
  const isEditMode = !!department;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: '',
      code: '',
      headId: '',
      description: '',
      established: format(new Date(), 'yyyy-MM-dd'),
      status: 'active',
    },
  });

  // Set form values when editing
  useEffect(() => {
    if (department) {
      reset({
        name: department.name,
        code: department.code,
        headId: department.headId,
        description: department.description,
        established: department.established,
        status: department.status,
      });
    }
  }, [department, reset]);

  // Handle form submission
  const handleFormSubmit = (data: DepartmentFormData) => {
    // Convert 'none' to null for headId
    if (data.headId === 'none') {
      data.headId = '';
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Department Name</Label>
          <Input
            id="name"
            placeholder="e.g. Computer Science"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="code">Department Code</Label>
          <Input
            id="code"
            placeholder="e.g. CS"
            {...register('code')}
          />
          {errors.code && (
            <p className="text-sm text-red-500">{errors.code.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="headId">Department Head</Label>
          <Select
            onValueChange={(value) => setValue('headId', value)}
            defaultValue={watch('headId')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a department head" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {teachers.map((teacher) => (
                <SelectItem key={teacher.id} value={teacher.id}>
                  {teacher.firstName} {teacher.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.headId && (
            <p className="text-sm text-red-500">{errors.headId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="established">Established Date</Label>
          <Input
            id="established"
            type="date"
            {...register('established')}
          />
          {errors.established && (
            <p className="text-sm text-red-500">{errors.established.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Department description"
          rows={4}
          {...register('description')}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          onValueChange={(value) => setValue('status', value as 'active' | 'inactive')}
          defaultValue={watch('status')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-red-500">{errors.status.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Department' : 'Create Department'}
        </Button>
      </div>
    </form>
  );
}; 