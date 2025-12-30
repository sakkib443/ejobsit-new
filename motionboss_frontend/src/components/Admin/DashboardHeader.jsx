'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FiSearch,
  FiBell,
  FiSettings,
  FiUser,
  FiLogOut,
  FiMoon,
  FiSun,
  FiChevronDown,
  FiMail,
  FiCheck,
} from 'react-icons/fi';

const DashboardHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Mock notifications
  const notifications = [
    { id: 1, title: 'New Order Received', message: 'Full Stack Course purchased', time: '2 min ago', read: false },
    { id: 2, title: 'New Student Joined', message: 'করিম হাসান registered', time: '15 min ago', read: false },
    { id: 3, title: 'Payment Completed', message: '৳5,000 received', time: '1 hour ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Search */}
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-md w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, students, orders..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-100/80 border-0 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center gap-1 px-2 py-0.5 bg-slate-200/80 rounded text-[10px] text-slate-500 font-medium">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              className="relative p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <FiBell size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 border-b border-slate-100">
                  <h3 className="font-semibold text-slate-800">Notifications</h3>
                  <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer ${
                        !notif.read ? 'bg-indigo-50/50' : ''
                      }`}
                    >
                      <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${
                        notif.read ? 'bg-slate-300' : 'bg-indigo-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800">{notif.title}</p>
                        <p className="text-xs text-slate-500 truncate">{notif.message}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-slate-100 bg-slate-50">
                  <Link
                    href="/dashboard/admin/notifications"
                    className="block text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    View All Notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <Link
            href="/dashboard/admin/settings"
            className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <FiSettings size={18} />
          </Link>

          {/* Profile */}
          <div className="relative ml-2">
            <button
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 hover:from-indigo-500/20 hover:to-purple-500/20 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/25">
                A
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-slate-800">Admin</p>
                <p className="text-[10px] text-slate-500">Super Admin</p>
              </div>
              <FiChevronDown className={`text-slate-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/25">
                      A
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Admin User</p>
                      <p className="text-xs text-slate-500">admin@motionboss.com</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <Link
                    href="/dashboard/admin/profile"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                  >
                    <FiUser size={16} />
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard/admin/settings"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                  >
                    <FiSettings size={16} />
                    Settings
                  </Link>
                  <Link
                    href="/dashboard/admin/messages"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                  >
                    <FiMail size={16} />
                    Messages
                  </Link>
                </div>
                <div className="p-2 border-t border-slate-100">
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <FiLogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
