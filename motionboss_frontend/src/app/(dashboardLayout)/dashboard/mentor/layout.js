'use client';

import React from 'react';
import MentorSidebar from '@/components/Mentor/MentorSidebar';
import ProtectedRoute from '@/app/providers/protectedRoutes';
import { ThemeProvider, useTheme } from '@/providers/ThemeProvider';

// Import dashboard-specific CSS (separate from frontend)
import '@/app/dashboard.css';

const MentorLayoutContent = ({ children }) => {
    const { isDark } = useTheme();

    return (
        <div className={`dashboard-container min-h-screen dashboard-fonts ${isDark
            ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800'
            : 'bg-slate-50'
            }`}>
            {/* Sidebar */}
            <MentorSidebar />

            {/* Main Content */}
            <main className="min-h-screen transition-all duration-300 lg:ml-72">
                <div className="p-6 lg:p-8">
                    <div className={`rounded-2xl shadow-sm border min-h-[calc(100vh-4rem)] ${isDark
                        ? 'bg-slate-800 border-slate-700'
                        : 'bg-white border-slate-200'
                        }`}>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

const MentorLayout = ({ children }) => {
    return (
        <ProtectedRoute allowedRoles={["mentor", "admin"]}>
            <ThemeProvider>
                <MentorLayoutContent>{children}</MentorLayoutContent>
            </ThemeProvider>
        </ProtectedRoute>
    );
};

export default MentorLayout;

