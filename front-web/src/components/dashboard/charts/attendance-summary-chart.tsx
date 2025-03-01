import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Mon', present: 95, absent: 5 },
  { day: 'Tue', present: 92, absent: 8 },
  { day: 'Wed', present: 88, absent: 12 },
  { day: 'Thu', present: 94, absent: 6 },
  { day: 'Fri', present: 90, absent: 10 },
]

export const AttendanceSummaryChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="present" stackId="a" fill="#6366F1" />
          <Bar dataKey="absent" stackId="a" fill="#EF4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
