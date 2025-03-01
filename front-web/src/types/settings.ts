export interface SystemSettings {
  schoolName: string
  academicYear: string
  timezone: string
  emailNotifications: boolean
  defaultLanguage: string
  maintenanceMode: boolean
  maxStudentsPerClass: number
  gradingSystem: 'letter' | 'percentage' | 'points'
}

export interface SystemMonitoring {
  cpu: {
    usage: number
    cores: number
    temperature: number
  }
  memory: {
    total: number
    used: number
    free: number
  }
  storage: {
    total: number
    used: number
    free: number
  }
  uptime: number
  lastBackup: string
  activeUsers: number
}

export interface FeatureFlags {
  onlineExams: boolean
  virtualClassrooms: boolean
  parentPortal: boolean
  mobileApp: boolean
  apiAccess: boolean
  analytics: boolean
  autoGrading: boolean
  librarySystem: boolean
  attendanceTracking: boolean
  homeworkSubmission: boolean
}

export interface ResourceLimits {
  maxFileUploadSize: number
  maxStoragePerUser: number
  maxConcurrentUsers: number
  maxVideoLength: number
  maxBandwidthPerUser: number
  maxClassesPerTeacher: number
}

export interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  notifyOnNewStudent: boolean
  notifyOnAbsence: boolean
  notifyOnGrades: boolean
  notifyOnEvents: boolean
  dailyDigest: boolean
}

export interface SecuritySettings {
  requireTwoFactor: boolean
  passwordExpiryDays: number
  sessionTimeout: number
  allowedIpRanges: string[]
  maxLoginAttempts: number
}
