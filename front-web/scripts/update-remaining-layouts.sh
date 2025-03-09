#!/bin/bash

# Update all remaining files that use old layouts
find src/pages/dashboard -type f -name "*.tsx" -exec sed -i 's/import { StudentLayout } from.*student-layout["\x27];/import { DashboardLayout } from "@\/components\/dashboard\/layout\/dashboard-layout";/g' {} \;
find src/pages/dashboard -type f -name "*.tsx" -exec sed -i 's/import { TeacherLayout } from.*teacher-layout["\x27];/import { DashboardLayout } from "@\/components\/dashboard\/layout\/dashboard-layout";/g' {} \;
find src/pages/dashboard -type f -name "*.tsx" -exec sed -i 's/import { ParentLayout } from.*parent-layout["\x27];/import { DashboardLayout } from "@\/components\/dashboard\/layout\/dashboard-layout";/g' {} \;
find src/pages/dashboard -type f -name "*.tsx" -exec sed -i 's/import { AdminLayout } from.*admin-layout["\x27];/import { DashboardLayout } from "@\/components\/dashboard\/layout\/dashboard-layout";/g' {} \;

# Replace layout component usage
find src/pages/dashboard -type f -name "*.tsx" -exec sed -i 's/<StudentLayout/<DashboardLayout/g' {} \;
find src/pages/dashboard -type f -name "*.tsx" -exec sed -i 's/<\/StudentLayout>/<\/DashboardLayout>/g' {} \;
find src/pages/dashboard -type f -name "*.tsx" -exec sed -i 's/<TeacherLayout/<DashboardLayout/g' {} \;
find src/pages/dashboard -type f -name "*.tsx" -exec sed -i 's/<\/TeacherLayout>/<\/DashboardLayout>/g' {} \;
find src/pages/dashboard -type f -name "*.tsx" -exec sed -i 's/<ParentLayout/<DashboardLayout/g' {} \;
find src/pages/dashboard -type f -name "*.tsx" -exec sed -i 's/<\/ParentLayout>/<\/DashboardLayout>/g' {} \;
find src/pages/dashboard -type f -name "*.tsx" -exec sed -i 's/<AdminLayout/<DashboardLayout/g' {} \;
find src/pages/dashboard -type f -name "*.tsx" -exec sed -i 's/<\/AdminLayout>/<\/DashboardLayout>/g' {} \;

# Remove old layout files if they exist
rm -f src/components/dashboard/layout/student-layout.tsx
rm -f src/components/dashboard/layout/teacher-layout.tsx
rm -f src/components/dashboard/layout/parent-layout.tsx
rm -f src/components/dashboard/layout/admin-layout.tsx
rm -f src/components/dashboard/layout/dashboard-layout-wrapper.tsx

echo "Layout updates complete!"
