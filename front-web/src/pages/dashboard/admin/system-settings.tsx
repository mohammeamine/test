import { User } from '../../../types/auth';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { Separator } from '../../../components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '../../../components/ui/alert';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '../../../components/ui/dialog';
import { Badge } from '../../../components/ui/badge';
import { 
  AlertTriangle, 
  Check, 
  Database, 
  Globe, 
  HardDrive, 
  Lock, 
  Mail, 
  RotateCcw, 
  Save, 
  Server, 
  Settings, 
  Shield, 
  Users, 
  BellRing, 
  Zap,
  Info
} from 'lucide-react';

interface SystemSettingsPageProps {
  user: User;
}

export const SystemSettingsPage = ({ user }: SystemSettingsPageProps) => {
  const [activeTab, setActiveTab] = useState('general');
  const [maintenance, setMaintenance] = useState(false);
  const [enableRegistration, setEnableRegistration] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [dataBackup, setDataBackup] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [languagePreference, setLanguagePreference] = useState('english');
  const [timezone, setTimezone] = useState('UTC');
  const [theme, setTheme] = useState('light');
  const [showBackupDialog, setShowBackupDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // System metrics
  const systemMetrics = {
    cpuUsage: '32%',
    memoryUsage: '48%',
    diskUsage: '62%',
    activeUsers: 327,
    uptime: '23 days, 7 hours',
    lastBackup: '2023-11-28 03:45 AM',
    databaseSize: '1.8 GB',
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <div className="text-sm text-gray-600">
          Logged in as: {user.firstName} {user.lastName}
        </div>
      </div>

      <div className="grid gap-6">
        {maintenance && (
          <Alert className="bg-amber-50 border-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-600">Maintenance Mode Enabled</AlertTitle>
            <AlertDescription className="text-amber-700">
              The system is currently in maintenance mode. Only administrators can access the platform.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current system metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">CPU Usage</span>
                    <span className="text-sm font-medium">{systemMetrics.cpuUsage}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: systemMetrics.cpuUsage }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Memory Usage</span>
                    <span className="text-sm font-medium">{systemMetrics.memoryUsage}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: systemMetrics.memoryUsage }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Disk Usage</span>
                    <span className="text-sm font-medium">{systemMetrics.diskUsage}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: systemMetrics.diskUsage }}></div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Users</span>
                    <Badge variant="outline">{systemMetrics.activeUsers}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Uptime</span>
                    <Badge variant="outline">{systemMetrics.uptime}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Backup</span>
                    <Badge variant="outline">{systemMetrics.lastBackup}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database Size</span>
                    <Badge variant="outline">{systemMetrics.databaseSize}</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline" onClick={() => setShowBackupDialog(true)}>
                  <HardDrive className="h-4 w-4 mr-2" />
                  Backup System
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Configuration Settings</CardTitle>
                <CardDescription>Manage system-wide configurations and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4 grid grid-cols-5 gap-2">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="integrations">Integrations</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="general" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="schoolName">School Name</Label>
                          <div className="text-sm text-muted-foreground">
                            The name of your educational institution
                          </div>
                        </div>
                        <Input id="schoolName" className="w-[250px]" defaultValue="Academy of Excellence" />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="admin-email">Administrator Email</Label>
                          <div className="text-sm text-muted-foreground">
                            Primary contact for system notifications
                          </div>
                        </div>
                        <Input id="admin-email" className="w-[250px]" defaultValue="admin@academy.edu" />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="timezone-select">Time Zone</Label>
                          <div className="text-sm text-muted-foreground">
                            System-wide time zone setting
                          </div>
                        </div>
                        <Select value={timezone} onValueChange={setTimezone}>
                          <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                            <SelectItem value="EST">EST (Eastern Standard Time)</SelectItem>
                            <SelectItem value="CST">CST (Central Standard Time)</SelectItem>
                            <SelectItem value="MST">MST (Mountain Standard Time)</SelectItem>
                            <SelectItem value="PST">PST (Pacific Standard Time)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="language-select">Default Language</Label>
                          <div className="text-sm text-muted-foreground">
                            Default system language
                          </div>
                        </div>
                        <Select value={languagePreference} onValueChange={setLanguagePreference}>
                          <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="arabic">Arabic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="theme-select">System Theme</Label>
                          <div className="text-sm text-muted-foreground">
                            Default appearance theme
                          </div>
                        </div>
                        <Select value={theme} onValueChange={setTheme}>
                          <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System Default</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="security" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Maintenance Mode</Label>
                          <div className="text-sm text-muted-foreground">
                            Enable for system maintenance (restricts access to admins only)
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={maintenance}
                            onCheckedChange={setMaintenance}
                          />
                          <Label>{maintenance ? "Enabled" : "Disabled"}</Label>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>User Registration</Label>
                          <div className="text-sm text-muted-foreground">
                            Allow new user registrations
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={enableRegistration}
                            onCheckedChange={setEnableRegistration}
                          />
                          <Label>{enableRegistration ? "Enabled" : "Disabled"}</Label>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Two-Factor Authentication</Label>
                          <div className="text-sm text-muted-foreground">
                            Require two-factor authentication for all users
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={twoFactorAuth}
                            onCheckedChange={setTwoFactorAuth}
                          />
                          <Label>{twoFactorAuth ? "Required" : "Optional"}</Label>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="password-policy">Password Policy</Label>
                          <div className="text-sm text-muted-foreground">
                            Minimum security requirements for passwords
                          </div>
                        </div>
                        <Select defaultValue="strong">
                          <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select policy" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                            <SelectItem value="medium">Medium (8+ chars, mixed case)</SelectItem>
                            <SelectItem value="strong">Strong (8+ chars, mixed case, numbers)</SelectItem>
                            <SelectItem value="very-strong">Very Strong (12+ chars, mixed case, numbers, symbols)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="session-timeout">Session Timeout</Label>
                          <div className="text-sm text-muted-foreground">
                            Automatically log users out after inactivity
                          </div>
                        </div>
                        <Select defaultValue="60">
                          <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select timeout" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                            <SelectItem value="240">4 hours</SelectItem>
                            <SelectItem value="0">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notifications" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Email Notifications</Label>
                          <div className="text-sm text-muted-foreground">
                            Send system notifications via email
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                          />
                          <Label>{emailNotifications ? "Enabled" : "Disabled"}</Label>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>SMS Notifications</Label>
                          <div className="text-sm text-muted-foreground">
                            Send system notifications via SMS
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={smsNotifications}
                            onCheckedChange={setSmsNotifications}
                          />
                          <Label>{smsNotifications ? "Enabled" : "Disabled"}</Label>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="smtp-server">SMTP Server</Label>
                          <div className="text-sm text-muted-foreground">
                            Email server configuration
                          </div>
                        </div>
                        <Input id="smtp-server" className="w-[250px]" defaultValue="smtp.academy.edu" />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="smtp-port">SMTP Port</Label>
                          <div className="text-sm text-muted-foreground">
                            Email server port
                          </div>
                        </div>
                        <Input id="smtp-port" className="w-[250px]" defaultValue="587" type="number" />
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notif-frequency">Notification Frequency</Label>
                          <div className="text-sm text-muted-foreground">
                            How often to send digests and summaries
                          </div>
                        </div>
                        <Select defaultValue="daily">
                          <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">Real-time</SelectItem>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="integrations" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Google Workspace</Label>
                          <div className="text-sm text-muted-foreground">
                            Integration with Google services
                          </div>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Microsoft 365</Label>
                          <div className="text-sm text-muted-foreground">
                            Integration with Microsoft services
                          </div>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Payment Gateway</Label>
                          <div className="text-sm text-muted-foreground">
                            Online payment processing integration
                          </div>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Learning Management System</Label>
                          <div className="text-sm text-muted-foreground">
                            Integration with external LMS
                          </div>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>API Access</Label>
                          <div className="text-sm text-muted-foreground">
                            Enable external API access
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch defaultChecked />
                          <Label>Enabled</Label>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="advanced" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Automated Backups</Label>
                          <div className="text-sm text-muted-foreground">
                            Schedule regular system backups
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={dataBackup}
                            onCheckedChange={setDataBackup}
                          />
                          <Label>{dataBackup ? "Enabled" : "Disabled"}</Label>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="backup-frequency">Backup Frequency</Label>
                          <div className="text-sm text-muted-foreground">
                            How often to create system backups
                          </div>
                        </div>
                        <Select defaultValue="daily">
                          <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Every 6 hours</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="log-level">Logging Level</Label>
                          <div className="text-sm text-muted-foreground">
                            Detail level for system logs
                          </div>
                        </div>
                        <Select defaultValue="info">
                          <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="error">Error Only</SelectItem>
                            <SelectItem value="warn">Warning & Error</SelectItem>
                            <SelectItem value="info">Information</SelectItem>
                            <SelectItem value="debug">Debug</SelectItem>
                            <SelectItem value="verbose">Verbose</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="cache-clear">Clear System Cache</Label>
                          <div className="text-sm text-muted-foreground">
                            Clear temporary data and cached content
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Clear Cache
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-red-600">Reset System Settings</Label>
                          <div className="text-sm text-red-500">
                            Reset all settings to default values
                          </div>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => setShowResetDialog(true)}>
                          Reset to Default
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Changes
                </Button>
                <Button onClick={handleSaveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Backup System Dialog */}
      <Dialog open={showBackupDialog} onOpenChange={setShowBackupDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Backup System</DialogTitle>
            <DialogDescription>
              Create a backup of the entire system including database, files, and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="backup-name">Backup Name</Label>
              <Input id="backup-name" placeholder="e.g., Full_Backup_2023_12_01" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backup-description">Description (Optional)</Label>
              <Textarea id="backup-description" placeholder="Describe the purpose of this backup..." className="resize-none" />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="backup-include-files" className="rounded border-gray-300" />
              <Label htmlFor="backup-include-files">Include uploaded files</Label>
            </div>
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-600">Information</AlertTitle>
              <AlertDescription className="text-blue-700">
                Backups are stored for 30 days. The backup process may take several minutes to complete.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBackupDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowBackupDialog(false)}>
              <HardDrive className="h-4 w-4 mr-2" />
              Start Backup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Reset Settings Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Reset System Settings</DialogTitle>
            <DialogDescription>
              This will reset all system settings to their default values. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Alert className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-600">Warning</AlertTitle>
              <AlertDescription className="text-red-700">
                Resetting will remove all customizations, integrations, and preferences. Users and data will not be affected.
              </AlertDescription>
            </Alert>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="confirm-reset" className="rounded border-gray-300" />
              <Label htmlFor="confirm-reset">I understand that this action cannot be undone</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setShowResetDialog(false)}>
              Reset All Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};