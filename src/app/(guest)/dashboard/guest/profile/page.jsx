"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { IconUser, IconMail, IconPhone, IconMapPin, IconCalendar, IconShield, IconCreditCard, IconBell, IconCheck, IconX } from "@tabler/icons-react"

export default function ProfilePage() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('personal')

  const userData = session?.user || {
    name: "Naimur Rahman Durjoy",
    email: "nainurrahman70@gmail.com",
    username: "Durjoy",
    isVerified: false,
    _id: "68d3f25c771aa989f0595d72",
    role: "user"
  }

  // Generate avatar from name initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                {getInitials(userData.name)}
              </div>
              <button className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-600">
                <IconUser className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{userData.name}</h1>
                {/* {userData.isVerified ? (
                  <span className="flex items-center space-x-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                    <IconCheck className="w-3 h-3" />
                    <span>Verified</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-1 rounded-full text-xs font-medium">
                    <IconX className="w-3 h-3" />
                    <span>Not Verified</span>
                  </span>
                )} */}
              </div>
              <p className="mt-2">@{userData.username}</p>
              <div className="flex items-center space-x-4 mt-3 text-sm ">
                <div className="flex items-center space-x-1">
                  <IconMail className="w-4 h-4" />
                  <span>{userData.email}</span>
                </div>
                
              </div>
              <div className="flex items-center space-x-1">
                  <IconUser className="w-4 h-4" />
                  <span className="capitalize">{userData.role}</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'personal', label: 'Personal Info', icon: IconUser },
              { id: 'security', label: 'Login & Security', icon: IconShield },
              { id: 'payments', label: 'Payments & Payouts', icon: IconCreditCard },
              { id: 'notifications', label: 'Notifications', icon: IconBell },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'personal' && <PersonalInfoTab userData={userData} />}
            {activeTab === 'security' && <SecurityTab userData={userData} />}
            {activeTab === 'payments' && <PaymentsTab />}
            {activeTab === 'notifications' && <NotificationsTab />}
          </div>

          {/* Right Column - Help Section */}
          <div className="space-y-6">
            {/* Account Status */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Account Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Email Verification</span>
                  {userData.isVerified ? (
                    <span className="flex items-center space-x-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                      <IconCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  ) : (
                    <button className="text-rose-600 hover:text-rose-700 font-medium text-sm">
                      Verify Now
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Account Type</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium capitalize">
                    {userData.role}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Member Since</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-3">Need help?</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                Our support team is here to help you with any questions about your account.
              </p>
              <button className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 px-4 rounded-lg font-medium transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Tab Components
function PersonalInfoTab({ userData }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h2>
      
      <div className="space-y-6">
        {/* Name */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Legal name</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{userData.name}</p>
          </div>
          <button className="text-rose-600 hover:text-rose-700 font-medium text-sm">Edit</button>
        </div>

        {/* Username */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Username</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">@{userData.username}</p>
          </div>
          <button className="text-rose-600 hover:text-rose-700 font-medium text-sm">Edit</button>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <IconMail className="w-5 h-5 text-gray-400" />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Email address</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{userData.email}</p>
              {!userData.isVerified && (
                <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-1">
                  Email not verified. Please check your inbox.
                </p>
              )}
            </div>
          </div>
          <button className="text-rose-600 hover:text-rose-700 font-medium text-sm">Edit</button>
        </div>

        {/* User ID */}
        <div className="flex items-center justify-between py-4">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">User ID</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-mono">{userData._id}</p>
          </div>
          <button 
            onClick={() => navigator.clipboard.writeText(userData._id)}
            className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 font-medium text-sm"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  )
}

function SecurityTab({ userData }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Login & Security</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Email Verification</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              {userData.isVerified ? 'Your email is verified' : 'Verify your email address for account security'}
            </p>
          </div>
          {userData.isVerified ? (
            <span className="flex items-center space-x-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
              <IconCheck className="w-4 h-4" />
              <span>Verified</span>
            </span>
          ) : (
            <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Verify Email
            </button>
          )}
        </div>
        
        <button className="w-full text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <h3 className="font-medium text-gray-900 dark:text-white">Change password</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Update your password regularly to keep your account secure</p>
        </button>
        
        <button className="w-full text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <h3 className="font-medium text-gray-900 dark:text-white">Two-factor authentication</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Add an extra layer of security to your account</p>
        </button>
      </div>
    </div>
  )
}

function PaymentsTab() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Payments & Payouts</h2>
      <div className="space-y-4">
        <button className="w-full text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <h3 className="font-medium text-gray-900 dark:text-white">Payment methods</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Add or remove payment methods</p>
        </button>
        
        <button className="w-full text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <h3 className="font-medium text-gray-900 dark:text-white">Payout preferences</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">Set up how you receive payments</p>
        </button>
      </div>
    </div>
  )
}

function NotificationsTab() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notifications</h2>
      <div className="space-y-4">
        {[
          { label: 'Booking confirmations', description: 'Get notified when your booking is confirmed' },
          { label: 'Messages from hosts', description: 'Receive messages from your hosts' },
          { label: 'Special offers', description: 'Get updates on promotions and discounts' },
          { label: 'Security alerts', description: 'Important notifications about your account security' },
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{item.label}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{item.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-rose-500"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}