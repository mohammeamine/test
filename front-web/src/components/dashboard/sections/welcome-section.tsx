import { format } from 'date-fns'
import type { User } from '../../../types/auth'

interface WelcomeSectionProps {
  user: User
}

export const WelcomeSection = ({ user }: WelcomeSectionProps) => {
  const currentTime = new Date()
  const hour = currentTime.getHours()

  const getGreeting = () => {
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-gray-900">
        {getGreeting()}, {user.firstName}!
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        {format(currentTime, 'EEEE, MMMM do yyyy | h:mm a')}
      </p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6">
          <dt>
            <p className="truncate text-sm font-medium text-gray-500">Your last login</p>
          </dt>
          <dd className="mt-1">
            <p className="text-xl font-semibold text-gray-900">{format(new Date(), 'MMM d, yyyy h:mm a')}</p>
          </dd>
        </div>
        <div className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6">
          <dt>
            <p className="truncate text-sm font-medium text-gray-500">System Status</p>
          </dt>
          <dd className="mt-1 flex items-baseline">
            <div className="flex items-center text-xl font-semibold text-green-600">
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              All systems operational
            </div>
          </dd>
        </div>
      </div>
    </div>
  )
}
