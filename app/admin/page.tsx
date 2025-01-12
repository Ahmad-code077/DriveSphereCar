'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CarList, { Car } from './CarList';
import AddCar from './AddCar';
import { Button } from '@/components/ui/button';
import AvailabilityFilter from '../../components/AvailabilityFilter';
const AdminPage = () => {
  const router = useRouter();

  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');
  const [showAddPopup, setShowAddPopup] = useState<boolean>(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      router.push('/');
      return;
    }

    const user = JSON.parse(loggedInUser);
    if (user.email !== 'admin@gmail.com') {
      router.push('/');
    } else {
      fetchCars();
    }
  }, [router]);

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:5000/cars');
      const data: Car[] = await response.json();
      setCars(data);
      setFilteredCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  useEffect(() => {
    if (availabilityFilter === 'all') {
      setFilteredCars(cars);
    } else {
      const isAvailable = availabilityFilter === 'available';
      setFilteredCars(cars.filter((car) => car.availability === isAvailable));
    }
  }, [availabilityFilter, cars]);

  return (
    <div className='min-h-screen'>
      {/* Header Section */}
      <div className='flex items-center justify-between p-6 border-b-2 border-gray-200'>
        <h2 className='text-2xl font-bold text-foreground'>Manage Cars</h2>
        <Button
          onClick={() => setShowAddPopup(true)}
          size='lg'
          className='hover:bg-primary/90 transition-all duration-300 hover:scale-105 text-2xl rounded-md text-white'
        >
          + Add Car
        </Button>
      </div>

      {/* Filter Section */}
      <div className='p-6'>
        <AvailabilityFilter
          value={availabilityFilter}
          onChange={setAvailabilityFilter}
        />
      </div>

      {/* Car List Section */}
      <div className='p-6'>
        <CarList cars={filteredCars} refreshCars={fetchCars} />
      </div>

      {/* Add Car Popup */}
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
