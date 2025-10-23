import Navbar from '@/components/navbar/Navbar';
import React from 'react'
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-body">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout