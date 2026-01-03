import React from 'react';
import Navbar from '../components/Shared/Navbar';
import Sidebar from '../components/Shared/Sidebar';
import Dashboard from '../components/Dashboard/Dashboard';
import './DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-main">
        <Sidebar />
        <main className="dashboard-content">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;