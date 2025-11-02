import { Button } from '@/components/ui/button';
import { ArrowUpLeft } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center">
      <h1 className="text-2xl font-semibold">404 - Page Not Found</h1>
      <Link to={'/home'}>
      <Button>
        <ArrowUpLeft />
        Back to Home
      </Button>
      </Link>
    </div>
  );
}

export default NotFound