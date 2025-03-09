#!/bin/bash

# Function to process files
process_files() {
    local dir=$1
    local old_layout=$2
    local old_import_pattern=$3

    # Find all .tsx files in the directory
    find "$dir" -name "*.tsx" -type f | while read -r file; do
        # Check if file contains the old layout import
        if grep -q "$old_import_pattern" "$file"; then
            echo "Processing $file..."
            
            # Replace the import statement
            sed -i "s|import { $old_layout } from \".*layout/$old_layout\"|import { DashboardLayout } from \"@/components/dashboard/layout/dashboard-layout\"|" "$file"
            sed -i "s|import { $old_layout } from '.*layout/$old_layout'|import { DashboardLayout } from '@/components/dashboard/layout/dashboard-layout'|" "$file"
            
            # Replace the layout component usage
            sed -i "s|<$old_layout|<DashboardLayout|g" "$file"
            sed -i "s|</$old_layout>|</DashboardLayout>|g" "$file"
        fi
    done
}

# Process each layout type
process_files "src/pages/dashboard/student" "StudentLayout" "StudentLayout"
process_files "src/pages/dashboard/teacher" "TeacherLayout" "TeacherLayout"
process_files "src/pages/dashboard/parent" "ParentLayout" "ParentLayout"
process_files "src/pages/dashboard/admin" "AdminLayout" "AdminLayout"

# Handle DashboardLayoutWrapper separately since it's used across different directories
find "src/pages/dashboard" -name "*.tsx" -type f | while read -r file; do
    if grep -q "DashboardLayoutWrapper" "$file"; then
        echo "Processing $file for DashboardLayoutWrapper..."
        sed -i "s|import { DashboardLayoutWrapper } from \".*layout/dashboard-layout-wrapper\"|import { DashboardLayout } from \"@/components/dashboard/layout/dashboard-layout\"|" "$file"
        sed -i "s|import { DashboardLayoutWrapper } from '.*layout/dashboard-layout-wrapper'|import { DashboardLayout } from '@/components/dashboard/layout/dashboard-layout'|" "$file"
        sed -i "s|<DashboardLayoutWrapper|<DashboardLayout|g" "$file"
        sed -i "s|</DashboardLayoutWrapper>|</DashboardLayout>|g" "$file"
    fi
done

# Remove old layout files
rm -f src/components/dashboard/layout/student-layout.tsx
rm -f src/components/dashboard/layout/teacher-layout.tsx
rm -f src/components/dashboard/layout/parent-layout.tsx
rm -f src/components/dashboard/layout/admin-layout.tsx
rm -f src/components/dashboard/layout/dashboard-layout-wrapper.tsx

echo "Layout update complete!"
