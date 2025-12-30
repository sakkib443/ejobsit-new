import React from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar';
import DashboardHeader from '@/components/Admin/DashboardHeader';
import ProtectedRoute from '@/app/providers/protectedRoutes';

const AdminLayout = ({ children }) => {
  return (
    <ProtectedRoute role="admin">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="lg:ml-72 transition-all duration-300">
          {/* Header */}
          <DashboardHeader />

          {/* Page Content */}
          <main className="p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminLayout;
