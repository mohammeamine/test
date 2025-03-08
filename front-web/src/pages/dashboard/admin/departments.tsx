import { User } from '../../../types/auth';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Separator } from '../../../components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { Label } from '../../../components/ui/label';
import {
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  BookOpen,
  GraduationCap,
  Building,
  ChevronDown,
  Filter,
  ArrowUpDown,
} from 'lucide-react';
import { Textarea } from '../../../components/ui/textarea';

interface DepartmentsPageProps {
  user: User;
}

interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  facultyCount: number;
  studentCount: number;
  courses: number;
  established: string;
  status: 'active' | 'inactive';
}

interface Faculty {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  department: string;
  courses: number;
  status: 'active' | 'on-leave';
}

export const DepartmentsPage = ({ user }: DepartmentsPageProps) => {
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 'dept-001',
      name: 'Computer Science',
      code: 'CS',
      head: 'Dr. Alan Turing',
      facultyCount: 16,
      studentCount: 356,
      courses: 28,
      established: '1998',
      status: 'active'
    },
    {
      id: 'dept-002',
      name: 'Engineering',
      code: 'ENG',
      head: 'Dr. Marie Curie',
      facultyCount: 24,
      studentCount: 412,
      courses: 42,
      established: '1976',
      status: 'active'
    },
    {
      id: 'dept-003',
      name: 'Business Administration',
      code: 'BUS',
      head: 'Prof. Adam Smith',
      facultyCount: 18,
      studentCount: 389,
      courses: 32,
      established: '1982',
      status: 'active'
    },
    {
      id: 'dept-004',
      name: 'Medicine',
      code: 'MED',
      head: 'Dr. Elizabeth Blackwell',
      facultyCount: 32,
      studentCount: 276,
      courses: 36,
      established: '1990',
      status: 'active'
    },
    {
      id: 'dept-005',
      name: 'Arts & Humanities',
      code: 'ART',
      head: 'Dr. Leonardo Vinci',
      facultyCount: 21,
      studentCount: 318,
      courses: 24,
      established: '1986',
      status: 'active'
    },
    {
      id: 'dept-006',
      name: 'Social Sciences',
      code: 'SOC',
      head: 'Prof. Max Weber',
      facultyCount: 14,
      studentCount: 245,
      courses: 19,
      established: '1992',
      status: 'inactive'
    }
  ]);

  const [faculty, setFaculty] = useState<Faculty[]>([
    { id: 'fac-001', name: 'Dr. Alan Turing', position: 'Department Head', email: 'alan.turing@academy.edu', phone: '555-1001', department: 'Computer Science', courses: 2, status: 'active' },
    { id: 'fac-002', name: 'Dr. Ada Lovelace', position: 'Professor', email: 'ada.lovelace@academy.edu', phone: '555-1002', department: 'Computer Science', courses: 3, status: 'active' },
    { id: 'fac-003', name: 'Dr. Grace Hopper', position: 'Associate Professor', email: 'grace.hopper@academy.edu', phone: '555-1003', department: 'Computer Science', courses: 4, status: 'active' },
    { id: 'fac-004', name: 'Dr. Tim Berners-Lee', position: 'Assistant Professor', email: 'tim.bernerslee@academy.edu', phone: '555-1004', department: 'Computer Science', courses: 3, status: 'active' },
    { id: 'fac-005', name: 'Dr. Linus Torvalds', position: 'Lecturer', email: 'linus.torvalds@academy.edu', phone: '555-1005', department: 'Computer Science', courses: 2, status: 'on-leave' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showAddDepartmentDialog, setShowAddDepartmentDialog] = useState(false);
  const [showEditDepartmentDialog, setShowEditDepartmentDialog] = useState(false);
  const [showDeleteDepartmentDialog, setShowDeleteDepartmentDialog] = useState(false);
  const [showAddFacultyDialog, setShowAddFacultyDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('departments');

  // Form state for adding/editing departments
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    head: '',
    established: '',
    description: ''
  });

  const handleAddDepartment = () => {
    // In a real app, this would make an API call
    const newDepartment: Department = {
      id: `dept-${Math.floor(Math.random() * 1000)}`,
      name: formData.name,
      code: formData.code,
      head: formData.head,
      facultyCount: 0,
      studentCount: 0,
      courses: 0,
      established: formData.established,
      status: 'active'
    };
    
    setDepartments([...departments, newDepartment]);
    setShowAddDepartmentDialog(false);
    resetForm();
  };

  const handleEditDepartment = () => {
    if (!selectedDepartment) return;
    
    // In a real app, this would make an API call
    const updatedDepartments = departments.map(dept => 
      dept.id === selectedDepartment.id 
        ? { 
            ...dept, 
            name: formData.name, 
            code: formData.code, 
            head: formData.head, 
            established: formData.established 
          } 
        : dept
    );
    
    setDepartments(updatedDepartments);
    setShowEditDepartmentDialog(false);
    resetForm();
  };

  const handleDeleteDepartment = () => {
    if (!selectedDepartment) return;
    
    // In a real app, this would make an API call
    const updatedDepartments = departments.filter(dept => dept.id !== selectedDepartment.id);
    setDepartments(updatedDepartments);
    setShowDeleteDepartmentDialog(false);
    setSelectedDepartment(null);
  };

  const openEditDialog = (department: Department) => {
    setSelectedDepartment(department);
    setFormData({
      name: department.name,
      code: department.code,
      head: department.head,
      established: department.established,
      description: ''
    });
    setShowEditDepartmentDialog(true);
  };

  const openDeleteDialog = (department: Department) => {
    setSelectedDepartment(department);
    setShowDeleteDepartmentDialog(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      head: '',
      established: '',
      description: ''
    });
  };

  const filteredDepartments = departments.filter(dept => 
    dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dept.head.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFaculty = faculty.filter(fac => 
    selectedDepartment ? fac.department === selectedDepartment.name : true
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Department Management</h1>
        <div className="text-sm text-gray-600">
          Logged in as: {user.firstName} {user.lastName}
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="faculty">Faculty</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="departments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Departments</CardTitle>
                <CardDescription>
                  Manage academic departments and their configurations
                </CardDescription>
              </div>
              <Button onClick={() => setShowAddDepartmentDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Department
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 w-full max-w-sm">
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search departments..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">
                        <div className="flex items-center space-x-1">
                          <span>Department</span>
                          <ArrowUpDown className="h-3 w-3" />
                        </div>
                      </TableHead>
                      <TableHead className="w-[100px]">Code</TableHead>
                      <TableHead>Head</TableHead>
                      <TableHead className="text-center">Faculty</TableHead>
                      <TableHead className="text-center">Students</TableHead>
                      <TableHead className="text-center">Courses</TableHead>
                      <TableHead className="text-center">Established</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDepartments.length > 0 ? (
                      filteredDepartments.map((department) => (
                        <TableRow key={department.id}>
                          <TableCell className="font-medium">{department.name}</TableCell>
                          <TableCell>{department.code}</TableCell>
                          <TableCell>{department.head}</TableCell>
                          <TableCell className="text-center">{department.facultyCount}</TableCell>
                          <TableCell className="text-center">{department.studentCount}</TableCell>
                          <TableCell className="text-center">{department.courses}</TableCell>
                          <TableCell className="text-center">{department.established}</TableCell>
                          <TableCell className="text-center">
                            <Badge className={department.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {department.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => openEditDialog(department)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(department)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-4 text-muted-foreground">
                          No departments found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faculty">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Faculty Members</CardTitle>
                <CardDescription>
                  Manage faculty members across departments
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={() => setShowAddFacultyDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Faculty
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Name</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead className="text-center">Courses</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFaculty.map(member => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.position}</TableCell>
                        <TableCell>{member.department}</TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>{member.phone}</TableCell>
                        <TableCell className="text-center">{member.courses}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {member.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Department Courses</CardTitle>
              <CardDescription>
                Courses offered by each department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {departments.filter(d => d.status === 'active').map(dept => (
                  <Card key={dept.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{dept.name}</CardTitle>
                        <Badge className="bg-blue-100 text-blue-800">{dept.courses} Courses</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground mb-3">
                        Managed by {dept.head}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{dept.facultyCount} Faculty</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <GraduationCap className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{dept.studentCount} Students</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{dept.courses} Courses</span>
                        </div>
                      </div>
                      <Separator className="my-3" />
                      <Button variant="outline" className="w-full mt-2">
                        View Courses
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="statistics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Departments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-3">
                      <Building className="h-6 w-6 text-blue-700" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold">
                        {departments.length}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Academic Departments
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {departments.filter(d => d.status === 'active').length} Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-purple-100 p-3 rounded-full mr-3">
                      <Users className="h-6 w-6 text-purple-700" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold">
                        {departments.reduce((acc, dept) => acc + dept.facultyCount, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Faculty Members
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {faculty.filter(f => f.status === 'active').length} Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-amber-100 p-3 rounded-full mr-3">
                      <GraduationCap className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold">
                        {departments.reduce((acc, dept) => acc + dept.studentCount, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Enrolled Students
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    +8.5% YoY
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Department Statistics</CardTitle>
              <CardDescription>
                Comparative statistics across departments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead className="text-center">Faculty Members</TableHead>
                    <TableHead className="text-center">Students</TableHead>
                    <TableHead className="text-center">Student/Faculty Ratio</TableHead>
                    <TableHead className="text-center">Courses</TableHead>
                    <TableHead className="text-center">Growth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.filter(d => d.status === 'active').map(dept => (
                    <TableRow key={dept.id}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell className="text-center">{dept.facultyCount}</TableCell>
                      <TableCell className="text-center">{dept.studentCount}</TableCell>
                      <TableCell className="text-center">
                        {(dept.studentCount / dept.facultyCount).toFixed(1)}:1
                      </TableCell>
                      <TableCell className="text-center">{dept.courses}</TableCell>
                      <TableCell className="text-center">
                        <Badge className="bg-green-100 text-green-800">
                          +{Math.floor(Math.random() * 10) + 2}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Department Dialog */}
      <Dialog open={showAddDepartmentDialog} onOpenChange={setShowAddDepartmentDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add Department</DialogTitle>
            <DialogDescription>
              Create a new academic department. This will be visible to all users.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Department Name
              </Label>
              <Input
                id="name"
                placeholder="e.g., Computer Science"
                className="col-span-3"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Department Code
              </Label>
              <Input
                id="code"
                placeholder="e.g., CS"
                className="col-span-3"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="head" className="text-right">
                Department Head
              </Label>
              <Input
                id="head"
                placeholder="e.g., Dr. Jane Smith"
                className="col-span-3"
                value={formData.head}
                onChange={(e) => setFormData({...formData, head: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="established" className="text-right">
                Established Year
              </Label>
              <Input
                id="established"
                placeholder="e.g., 1985"
                className="col-span-3"
                value={formData.established}
                onChange={(e) => setFormData({...formData, established: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter department description..."
                className="col-span-3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowAddDepartmentDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddDepartment}>
              Add Department
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Department Dialog */}
      <Dialog open={showEditDepartmentDialog} onOpenChange={setShowEditDepartmentDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>
              Make changes to the department information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Department Name
              </Label>
              <Input
                id="edit-name"
                placeholder="e.g., Computer Science"
                className="col-span-3"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-code" className="text-right">
                Department Code
              </Label>
              <Input
                id="edit-code"
                placeholder="e.g., CS"
                className="col-span-3"
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-head" className="text-right">
                Department Head
              </Label>
              <Input
                id="edit-head"
                placeholder="e.g., Dr. Jane Smith"
                className="col-span-3"
                value={formData.head}
                onChange={(e) => setFormData({...formData, head: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-established" className="text-right">
                Established Year
              </Label>
              <Input
                id="edit-established"
                placeholder="e.g., 1985"
                className="col-span-3"
                value={formData.established}
                onChange={(e) => setFormData({...formData, established: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="edit-description"
                placeholder="Enter department description..."
                className="col-span-3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowEditDepartmentDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleEditDepartment}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Department Dialog */}
      <Dialog open={showDeleteDepartmentDialog} onOpenChange={setShowDeleteDepartmentDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the "{selectedDepartment?.name}" department? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-red-600">
              Warning: Deleting a department will affect all associated faculty, courses, and student records.
            </p>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowDeleteDepartmentDialog(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteDepartment}>
              Delete Department
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Faculty Dialog */}
      <Dialog open={showAddFacultyDialog} onOpenChange={setShowAddFacultyDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add Faculty Member</DialogTitle>
            <DialogDescription>
              Add a new faculty member to a department.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="faculty-name" className="text-right">
                Full Name
              </Label>
              <Input
                id="faculty-name"
                placeholder="e.g., Dr. Jane Smith"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="faculty-position" className="text-right">
                Position
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="department-head">Department Head</SelectItem>
                  <SelectItem value="professor">Professor</SelectItem>
                  <SelectItem value="associate">Associate Professor</SelectItem>
                  <SelectItem value="assistant">Assistant Professor</SelectItem>
                  <SelectItem value="lecturer">Lecturer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="faculty-email" className="text-right">
                Email
              </Label>
              <Input
                id="faculty-email"
                type="email"
                placeholder="e.g., jane.smith@academy.edu"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="faculty-phone" className="text-right">
                Phone
              </Label>
              <Input
                id="faculty-phone"
                placeholder="e.g., 555-123-4567"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="faculty-department" className="text-right">
                Department
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.filter(d => d.status === 'active').map(dept => (
                    <SelectItem key={dept.id} value={dept.name}>{dept.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowAddFacultyDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={() => setShowAddFacultyDialog(false)}>
              Add Faculty Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};