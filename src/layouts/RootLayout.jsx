import Navbar from '@/components/navbar/Navbar';
import React from 'react'
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main className="app-body">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout