import { useState } from 'react'
import { DashboardLayout } from '../../components/dashboard/layout/dashboard-layout'
import { User } from '../../types/auth'
import { toast, Toaster } from 'react-hot-toast'
import { BellIcon, MoonIcon, SunIcon } from 'lucide-react'

interface SettingsPageProps {
  user: User
}

const SettingsPage = ({ user }: SettingsPageProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true)
  const [language, setLanguage] = useState('english')
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveSettings = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would save these settings to the backend
      toast.success('Settings saved successfully')
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout user={user}>
      <Toaster />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your account settings and preferences.
              </p>
            </div>

            <div className="space-y-8">
              {/* Theme Settings */}
              <div>
                <h3 className="text-lg font-medium text-gray-900">Theme</h3>
                <div className="mt-4 flex items-center space-x-4">
                  <button
                    onClick={() => setIsDarkMode(false)}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      !isDarkMode
                        ? 'bg-primary text-white'
                        : 'border border-gray-300 text-gray-700'
                    }`}
                  >
                    <SunIcon className="h-5 w-5 mr-2" />
                    Light
                  </button>
                  <button
                    onClick={() => setIsDarkMode(true)}
                    className={`flex items-center px-4 py-2 rounded-md ${
                      isDarkMode
                        ? 'bg-primary text-white'
                        : 'border border-gray-300 text-gray-700'
                    }`}
                  >
                    <MoonIcon className="h-5 w-5 mr-2" />
                    Dark
                  </button>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BellIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-700">Enable notifications</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsNotificationsEnabled(!isNotificationsEnabled)}
                      className={`${
                        isNotificationsEnabled ? 'bg-primary' : 'bg-gray-200'
                      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                      role="switch"
                      aria-checked={isNotificationsEnabled}
                    >
                      <span
                        className={`${
                          isNotificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Language Settings */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">Language</h3>
                <div className="mt-4">
                  <select
                    id="language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                  >
                    <option value="english">English</option>
                    <option value="french">French</option>
                    <option value="arabic">Arabic</option>
                    <option value="spanish">Spanish</option>
                  </select>
                </div>
              </div>

              {/* Password Settings */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">Password</h3>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => toast.success('Password reset instructions sent to your email')}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Change Password
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Saving...' : 'Save Settings'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default SettingsPage
