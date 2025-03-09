#!/bin/bash

# Update student pages
find src/pages/dashboard/student -name "*.tsx" -type f -exec sed -i 's/import { StudentLayout } from ".*\/student-layout"/import { DashboardLayout } from "..\/..\/..\/components\/dashboard\/layout\/dashboard-layout"/' {} \;
find src/pages/dashboard/student -name "*.tsx" -type f -exec sed -i 's/<StudentLayout/<DashboardLayout/' {} \;
find src/pages/dashboard/student -name "*.tsx" -type f -exec sed -i 's/<\/StudentLayout>/<\/DashboardLayout>/' {} \;

# Update teacher pages
find src/pages/dashboard/teacher -name "*.tsx" -type f -exec sed -i 's/import { TeacherLayout } from ".*\/teacher-layout"/import { DashboardLayout } from "..\/..\/..\/components\/dashboard\/layout\/dashboard-layout"/' {} \;
find src/pages/dashboard/teacher -name "*.tsx" -type f -exec sed -i 's/<TeacherLayout/<DashboardLayout/' {} \;
find src/pages/dashboard/teacher -name "*.tsx" -type f -exec sed -i 's/<\/TeacherLayout>/<\/DashboardLayout>/' {} \;

# Update parent pages
find src/pages/dashboard/parent -name "*.tsx" -type f -exec sed -i 's/import { ParentLayout } from ".*\/parent-layout"/import { DashboardLayout } from "..\/..\/..\/components\/dashboard\/layout\/dashboard-layout"/' {} \;
find src/pages/dashboard/parent -name "*.tsx" -type f -exec sed -i 's/<ParentLayout/<DashboardLayout/' {} \;
find src/pages/dashboard/parent -name "*.tsx" -type f -exec sed -i 's/<\/ParentLayout>/<\/DashboardLayout>/' {} \;

# Update admin pages
find src/pages/dashboard/admin -name "*.tsx" -type f -exec sed -i 's/import { AdminLayout } from ".*\/admin-layout"/import { DashboardLayout } from "..\/..\/..\/components\/dashboard\/layout\/dashboard-layout"/' {} \;
find src/pages/dashboard/admin -name "*.tsx" -type f -exec sed -i 's/<AdminLayout/<DashboardLayout/' {} \;
find src/pages/dashboard/admin -name "*.tsx" -type f -exec sed -i 's/<\/AdminLayout>/<\/DashboardLayout>/' {} \;

# Remove old layout files
rm -f src/components/dashboard/layout/student-layout.tsx
rm -f src/components/dashboard/layout/teacher-layout.tsx
rm -f src/components/dashboard/layout/parent-layout.tsx
rm -f src/components/dashboard/layout/admin-layout.tsx
rm -f src/components/dashboard/layout/dashboard-layout-wrapper.tsx
