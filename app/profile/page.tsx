"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { User, Mail, Calendar, Shield, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function ProfilePage() {
  const { user } = useUser()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 dark:text-white">Please sign in to view your profile</h2>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'N/A'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            {/* Profile Picture */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
              <div className="flex items-end gap-4">
                <img
                  src={user.imageUrl}
                  alt={user.fullName || "User"}
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                />
                <div className="mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.fullName}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400">Travel Enthusiast</p>
                </div>
              </div>
              <Link href="/create-new-trip">
                <Button className="mt-4 md:mt-0">Plan New Trip</Button>
              </Link>
            </div>

            {/* Account Details */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </div>

              {/* User ID */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <User className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {user.id}
                  </p>
                </div>
              </div>

              {/* Join Date */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {joinDate}
                  </p>
                </div>
              </div>

              {/* Account Status */}
              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Account Status</p>
                  <p className="font-medium text-green-600 dark:text-green-400">
                    Active
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">0</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Trips Planned</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">0</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Destinations</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">Free</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Plan</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 pt-6 border-t dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/create-new-trip">
                  <button className="w-full flex items-center gap-3 p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">Plan a Trip</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Start planning your next adventure</p>
                    </div>
                  </button>
                </Link>
                <Link href="/my-trips">
                  <button className="w-full flex items-center gap-3 p-4 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">My Trips</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">View your saved trips</p>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
