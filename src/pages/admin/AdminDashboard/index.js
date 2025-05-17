import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Drawer } from 'antd';
import { MenuOutlined, LogoutOutlined, FileTextOutlined, BarChartOutlined, UserOutlined } from '@ant-design/icons';

function AdminDashboard({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const menuItems = [
    { label: 'Exams', path: '/admin/exams', icon: <FileTextOutlined /> },
    { label: 'Reports', path: '/admin/reports', icon: <BarChartOutlined /> },
    { label: 'Profile', path: '/profile', icon: <UserOutlined /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-light">
      
      {/* Main Content */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
}

export default AdminDashboard; 