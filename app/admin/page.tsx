'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CarList from './CarList';
import AddCar from './AddCar';
import { Button } from '@/components/ui/button';

const AdminPage = () => {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/');
      return;
    }

    const user = JSON.parse(loggedInUser);
    if (user.email !== 'admin@gmail.com') {
      router.push('/'); // If not admin, redirect to home
    } else {
      fetchCars();
    }
  }, [router]);

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:5000/cars');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  return (
    <div className='min-h-screen'>
      {/* Header Section */}
      <div className='flex items-center justify-between p-6 border-b-2 border-gray-200'>
        <h2 className='text-2xl font-bold text-foreground '>All Cars</h2>
        <Button
          onClick={() => setShowAddPopup(true)}
          size='lg'
          className='  hover:bg-secondary/90  transition-all duration-300 hover:scale-105 size-16 rounded-full text-white text-5xl'
        >
          +
        </Button>
      </div>

      {/* Property List Section */}
      <div className='p-6'>
        <CarList cars={cars} refreshCars={fetchCars} />
      </div>

      {/* Add Property Popup */}

      {showAddPopup && (
        <AddCar
          onClose={() => setShowAddPopup(false)}
          refreshCars={fetchCars}
        />
      )}
    </div>
  );
};

export default AdminPage;
