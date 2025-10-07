'use client';

import { useTheme } from 'next-themes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AnimatedList } from '@/components/ui/animated-list';
import { cn } from '@/lib/utils';
import ReviewCard from '@/components/reviewCard';
import StatsCard from '@/components/Statcard/starCard';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import axios from 'axios';

  const Page = ({
userGrowthData = [
    { month: 'Jan', users: 200 },
    { month: 'Feb', users: 300 },
    { month: 'Mar', users: 400 },
    { month: 'Apr', users: 350 },
    { month: 'May', users: 450 },
  ],

  reviewData = [
    { stars: '5 Stars', count: 300, percentage: 60 },
    { stars: '4 Stars', count: 125, percentage: 25 },
    { stars: '3 Stars', count: 50, percentage: 10 },
    { stars: '2 Stars', count: 15, percentage: 3 },
    { stars: '1 Star', count: 10, percentage: 2 },
  ],
  locationData = [
    { location: 'New York, USA', users: 250 },
    { location: 'London, UK', users: 180 },
    { location: 'Tokyo, Japan', users: 150 },
    { location: 'Sydney, Australia', users: 120 },
    { location: 'Paris, France', users: 100 },
  ],
  bookingsData = [
    { id: '#001', guest: 'John Doe', property: 'Cozy Apartment', date: '2025-10-01', amount: 150 },
    { id: '#002', guest: 'Jane Smith', property: 'Luxury Villa', date: '2025-09-28', amount: 300 },
    { id: '#003', guest: 'Mike Johnson', property: 'Beach House', date: '2025-09-25', amount: 200 },
  ],
}) => {

  const {data:session}=useSession()
  const { theme } = useTheme();

   const {data:earningsData,isLoading:earningsDataLoading}=useQuery({
    
  queryKey:['analytic',session?.user._id],
  queryFn:async () => {
    const response=await axios.get("/api/bookings",{
      params:{
        analytics:true
      }
    })
    return response.data
    
  },
  enabled: !!session?.user?._id,
    
  
  })
    const {data:allAnalytics,isLoading:allAnalyticsLoading}=useQuery({
    
  queryKey:['allAnalytic',session?.user._id],
  queryFn:async () => {
    const response=await axios.get("/api/allanalytics")
    return response.data
    
  },
  enabled: !!session?.user?._id,
    
  
  })
  



  // Custom tooltip for consistent styling
  const CustomTooltip = ({ active, payload, label, type }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className={`p-3 rounded-lg shadow-lg ${
          theme === 'dark' ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
        }`}>
          {type === 'userGrowth' && (
            <>
              <p className="font-semibold">Month: {label}</p>
              <p>Users: {dataPoint.users}</p>
            </>
          )}
          {type === 'earnings' && (
            <>
              <p className="font-semibold">Month: {label}</p>
              <p>Earnings: ${dataPoint.earnings}</p>
            </>
          )}
          {type === 'reviews' && (
            <>
              <p className="font-semibold">{dataPoint.stars}</p>
              <p>{dataPoint.count} reviews</p>
              <p>{dataPoint.percentage}%</p>
            </>
          )}
          {type === 'locations' && (
            <>
              <p className="font-semibold">{dataPoint.location}</p>
              <p>{dataPoint.users} users</p>
              <p>{((dataPoint.users / locationData.reduce((sum, d) => sum + d.users, 0)) * 100).toFixed(1)}%</p>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  // Colors for location pie chart
  const locationColors = [
    '#3498db',
    '#2ecc71',
    '#e74c3c',
    '#f1c40f',
    '#9b59b6',
  ];
console.log(allAnalytics?.totalUser[0].totalUser)
  return (
    <div className="container mx-auto p-4 font-inter">
      {/* Header */}
      <header className="text-center mb-8 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Host Dashboard - Analytics</h1>
      </header>

      {/* Stat Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 mb-8">
         <StatsCard title='Total Earnings' value={`$ ${  allAnalytics?.totalEarnings[0].totalEarnings || 0}`} timePeriod="" />
        <StatsCard title='Total User' value={allAnalytics?.totalUser[0].totalUser || 0} timePeriod="" />
       <StatsCard title='Total Property' value={allAnalytics?.totalProperty[0].totalProperty || 0} timePeriod="" />
       <StatsCard title='Total Bookings' value={allAnalytics?.totalBookings[0].totalBookings || 0} timePeriod="" />
      
      
         {/* <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500 dark:text-blue-400">$45,600</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500 dark:text-blue-400">850</div>
          </CardContent>
        </Card>
        <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Latest Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500 dark:text-blue-400">45</div>
          </CardContent>
        </Card> */}
      </div>
       <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl mb-8">
        <CardHeader>
          <CardTitle className="text-lg md:text-2xl text-center font-semibold text-gray-900 dark:text-gray-100">Notification</CardTitle>
        </CardHeader>
       
         
            < AnimatedListDemo/> 
          
       
      </Card>

      
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {/* User Growth Bar Chart */}
        <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">User Growth Graph</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="month" tick={{ fill: theme === 'dark' ? '#e0e0e0' : '#2c3e50' }} fontSize={12} />
                  <YAxis tick={{ fill: theme === 'dark' ? '#e0e0e0' : '#2c3e50' }} fontSize={12} />
                  <Tooltip content={<CustomTooltip type="userGrowth" />} />
                  <Bar dataKey="users" fill="#3498db" background={{ fill: theme === 'dark' ? '#1f2937' : '#f3f4f6' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Earnings Line Chart */}
        <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Earnings Graph</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData?.monthlyRevenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="month" tick={{ fill: theme === 'dark' ? '#e0e0e0' : '#2c3e50' }} fontSize={12} />
                  <YAxis tick={{ fill: theme === 'dark' ? '#e0e0e0' : '#2c3e50' }} fontSize={12} />
                  <Tooltip content={<CustomTooltip type="earnings" />} />
                  <Line type="monotone" dataKey="totalRevenue" stroke="#2ecc71" strokeWidth={2} dot={{ r: 5 }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Latest Bookings Table */}
     <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
     

       <Card className="shadow-lg transition-shadow duration-300 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">User Location Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] max-w-[400px] mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allAnalytics?.locationData}
                  dataKey="users"
                  nameKey="location"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                  labelLine={false}
                >
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={locationColors[index % locationColors.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip type="locations" />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      <ReviewCard/>
     </div>
      {/* Guest Reviews Bar Chart */}
      

      {/* User Locations Pie Chart */}
     
    </div>
  );
};

export default Page;


let notifications = [
  {
    name: "Payment received",
    description: "",
    time: "15m ago",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "User signed up",
    description: "",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "Property Create",
    description: "",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "Booking Confirmed",
    description: "Magic UI",
    time: "2m ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
]
notifications = Array.from({ length: 2 }, () => notifications).flat()
const Notification = ({ name, description, icon, color, time }) => {
  return (
    <figure
      className={cn(
        "relative mx-10 min-h-fit w-full max-w-[600px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  )
}
export function AnimatedListDemo({
  className,
}) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
        className
      )}
    >
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
    </div>
  )
}