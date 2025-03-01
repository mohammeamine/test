import { useState } from 'react'
import { DashboardLayout } from '../../../components/dashboard/layout/dashboard-layout'
import { User } from '../../../types/auth'
import { SystemSettings, NotificationSettings, SecuritySettings, SystemMonitoring, FeatureFlags, ResourceLimits } from '../../../types/settings'

interface SettingsPageProps {
  user: User
}

export const SettingsPage = ({ user }: SettingsPageProps) => {
  // Mock data - Replace with actual API call
  const [activeTab, setActiveTab] = useState('general')
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    schoolName: 'International Academy',
    academicYear: '2024-2025',
    timezone: 'UTC+1',
    emailNotifications: true,
    defaultLanguage: 'English',
    maintenanceMode: false,
    maxStudentsPerClass: 30,
    gradingSystem: 'percentage'
  })

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    notifyOnNewStudent: true,
    notifyOnAbsence: true,
    notifyOnGrades: true,
    notifyOnEvents: true,
    dailyDigest: false
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    requireTwoFactor: false,
    passwordExpiryDays: 90,
    sessionTimeout: 30,
    allowedIpRanges: ['*'],
    maxLoginAttempts: 5
  })

  const handleSystemSettingChange = (key: keyof SystemSettings, value: any) => {
    setSystemSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleNotificationSettingChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSecuritySettingChange = (key: keyof SecuritySettings, value: any) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }))
  }

  const [systemMonitoring, setSystemMonitoring] = useState<SystemMonitoring>({
    cpu: { usage: 45, cores: 8, temperature: 65 },
    memory: { total: 32000, used: 16000, free: 16000 },
    storage: { total: 1000000, used: 400000, free: 600000 },
    uptime: 1209600, // 14 days in seconds
    lastBackup: '2025-02-14T12:00:00Z',
    activeUsers: 245
  })

  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>({
    onlineExams: true,
    virtualClassrooms: true,
    parentPortal: true,
    mobileApp: false,
    apiAccess: true,
    analytics: true,
    autoGrading: false,
    librarySystem: true,
    attendanceTracking: true,
    homeworkSubmission: true
  })

  const [resourceLimits, setResourceLimits] = useState<ResourceLimits>({
    maxFileUploadSize: 50, // MB
    maxStoragePerUser: 1000, // MB
    maxConcurrentUsers: 500,
    maxVideoLength: 60, // minutes
    maxBandwidthPerUser: 5, // Mbps
    maxClassesPerTeacher: 6
  })

  const handleFeatureFlagChange = (key: keyof FeatureFlags) => {
    setFeatureFlags(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleResourceLimitChange = (key: keyof ResourceLimits, value: number) => {
    setResourceLimits(prev => ({ ...prev, [key]: value }))
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${days}d ${hours}h ${minutes}m`
  }

  const tabs = [
    { id: 'general', name: 'General' },
    { id: 'notifications', name: 'Notifications' },
    { id: 'security', name: 'Security & Privacy' },
    { id: 'system', name: 'System' }
  ]

  return (
    <DashboardLayout user={user}>
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your system settings, notifications, and security preferences.
            </p>
          </div>
        </div>

        <div className="mt-8">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="mt-8 max-w-3xl">
              <div className="space-y-6">
                <div>
                  <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700">
                    School Name
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    id="schoolName"
                    value={systemSettings.schoolName}
                    onChange={(e) => handleSystemSettingChange('schoolName', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    name="academicYear"
                    id="academicYear"
                    value={systemSettings.academicYear}
                    onChange={(e) => handleSystemSettingChange('academicYear', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={systemSettings.timezone}
                    onChange={(e) => handleSystemSettingChange('timezone', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  >
                    <option value="UTC+1">UTC+1</option>
                    <option value="UTC+2">UTC+2</option>
                    <option value="UTC+3">UTC+3</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="maxStudents" className="block text-sm font-medium text-gray-700">
                    Maximum Students per Class
                  </label>
                  <input
                    type="number"
                    name="maxStudents"
                    id="maxStudents"
                    value={systemSettings.maxStudentsPerClass}
                    onChange={(e) => handleSystemSettingChange('maxStudentsPerClass', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="gradingSystem" className="block text-sm font-medium text-gray-700">
                    Grading System
                  </label>
                  <select
                    id="gradingSystem"
                    name="gradingSystem"
                    value={systemSettings.gradingSystem}
                    onChange={(e) => handleSystemSettingChange('gradingSystem', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="letter">Letter Grade</option>
                    <option value="points">Points</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleSystemSettingChange('maintenanceMode', !systemSettings.maintenanceMode)}
                    className={`${
                      systemSettings.maintenanceMode ? 'bg-primary' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        systemSettings.maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                  <span className="ml-3 text-sm font-medium text-gray-700">Maintenance Mode</span>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="mt-8 max-w-3xl">
              <div className="space-y-6">
                {Object.entries(notificationSettings).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleNotificationSettingChange(key as keyof NotificationSettings, !value)}
                      className={`${
                        value ? 'bg-primary' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                    >
                      <span
                        className={`${
                          value ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      />
                    </button>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="mt-8 max-w-3xl">
              <div className="space-y-6">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleSecuritySettingChange('requireTwoFactor', !securitySettings.requireTwoFactor)}
                    className={`${
                      securitySettings.requireTwoFactor ? 'bg-primary' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        securitySettings.requireTwoFactor ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                  <span className="ml-3 text-sm font-medium text-gray-700">Require Two-Factor Authentication</span>
                </div>

                <div>
                  <label htmlFor="passwordExpiry" className="block text-sm font-medium text-gray-700">
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    name="passwordExpiry"
                    id="passwordExpiry"
                    value={securitySettings.passwordExpiryDays}
                    onChange={(e) => handleSecuritySettingChange('passwordExpiryDays', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    name="sessionTimeout"
                    id="sessionTimeout"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => handleSecuritySettingChange('sessionTimeout', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="maxLoginAttempts" className="block text-sm font-medium text-gray-700">
                    Maximum Login Attempts
                  </label>
                  <input
                    type="number"
                    name="maxLoginAttempts"
                    id="maxLoginAttempts"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => handleSecuritySettingChange('maxLoginAttempts', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* System Monitoring and Features */}
          {activeTab === 'system' && (
            <div className="mt-8 max-w-6xl">
              {/* System Monitoring */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">System Monitoring</h3>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {/* CPU Stats */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">CPU Usage</dt>
                            <dd className="flex items-baseline">
                              <div className="flex items-center text-2xl font-semibold text-gray-900">
                                {systemMonitoring.cpu.usage}%
                              </div>
                            </dd>
                          </dl>
                          <div className="text-sm text-gray-500 mt-2">
                            {systemMonitoring.cpu.cores} Cores • {systemMonitoring.cpu.temperature}°C
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Memory Stats */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Memory Usage</dt>
                            <dd className="flex items-baseline">
                              <div className="flex items-center text-2xl font-semibold text-gray-900">
                                {formatBytes(systemMonitoring.memory.used)} / {formatBytes(systemMonitoring.memory.total)}
                              </div>
                            </dd>
                          </dl>
                          <div className="text-sm text-gray-500 mt-2">
                            {formatBytes(systemMonitoring.memory.free)} Available
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Storage Stats */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Storage</dt>
                            <dd className="flex items-baseline">
                              <div className="flex items-center text-2xl font-semibold text-gray-900">
                                {formatBytes(systemMonitoring.storage.used)} / {formatBytes(systemMonitoring.storage.total)}
                              </div>
                            </dd>
                          </dl>
                          <div className="text-sm text-gray-500 mt-2">
                            {formatBytes(systemMonitoring.storage.free)} Available
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* System Info */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">System Uptime</dt>
                            <dd className="flex items-baseline">
                              <div className="flex items-center text-2xl font-semibold text-gray-900">
                                {formatUptime(systemMonitoring.uptime)}
                              </div>
                            </dd>
                          </dl>
                          <div className="text-sm text-gray-500 mt-2">
                            Last Backup: {new Date(systemMonitoring.lastBackup).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Users */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                            <dd className="flex items-baseline">
                              <div className="flex items-center text-2xl font-semibold text-gray-900">
                                {systemMonitoring.activeUsers}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Flags */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Feature Toggles</h3>
                <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
                  {Object.entries(featureFlags).map(([key, value]) => (
                    <div key={key} className="p-4 flex items-center justify-between">
                      <div>
                        <h4 className="text-base font-medium text-gray-900">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleFeatureFlagChange(key as keyof FeatureFlags)}
                        className={`${value ? 'bg-primary' : 'bg-gray-200'} 
                          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 
                          border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
                          focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                      >
                        <span
                          className={`${value ? 'translate-x-5' : 'translate-x-0'}
                            pointer-events-none inline-block h-5 w-5 transform rounded-full 
                            bg-white shadow ring-0 transition duration-200 ease-in-out`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resource Limits */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Resource Limits</h3>
                <div className="bg-white shadow rounded-lg p-6 space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Max File Upload Size (MB)</label>
                      <input
                        type="number"
                        value={resourceLimits.maxFileUploadSize}
                        onChange={(e) => handleResourceLimitChange('maxFileUploadSize', parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Storage per User (MB)</label>
                      <input
                        type="number"
                        value={resourceLimits.maxStoragePerUser}
                        onChange={(e) => handleResourceLimitChange('maxStoragePerUser', parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Max Concurrent Users</label>
                      <input
                        type="number"
                        value={resourceLimits.maxConcurrentUsers}
                        onChange={(e) => handleResourceLimitChange('maxConcurrentUsers', parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Max Video Length (minutes)</label>
                      <input
                        type="number"
                        value={resourceLimits.maxVideoLength}
                        onChange={(e) => handleResourceLimitChange('maxVideoLength', parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Bandwidth per User (Mbps)</label>
                      <input
                        type="number"
                        value={resourceLimits.maxBandwidthPerUser}
                        onChange={(e) => handleResourceLimitChange('maxBandwidthPerUser', parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Classes per Teacher</label>
                      <input
                        type="number"
                        value={resourceLimits.maxClassesPerTeacher}
                        onChange={(e) => handleResourceLimitChange('maxClassesPerTeacher', parseInt(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
