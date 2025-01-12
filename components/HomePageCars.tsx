'use client';

import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';
import AvailabilityFilter from './AvailabilityFilter'; // Import the filter component
import { Car } from '@/app/admin/CarList';

const HomePageCars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all'); // State for the filter

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:5000/cars');
        if (!response.ok) {
          throw new Error('Failed to fetch car data.');
        }
        const data: Car[] = await response.json();
        setCars(data);
        setFilteredCars(data); // Initialize filtered cars
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Filter cars based on availability
  useEffect(() => {
    if (availabilityFilter === 'all') {
      setFilteredCars(cars); // Show all cars
    } else {
      const isAvailable = availabilityFilter === 'available';
      setFilteredCars(cars.filter((car) => car.availability === isAvailable));
    }
  }, [availabilityFilter, cars]);

  if (loading)
    return <p className='text-center text-xl text-black'>Loading cars...</p>;
  if (error) return <p className='text-center text-xl text-red-600'>{error}</p>;

  return (
    <section className='text-black py-12'>
      <div>
        <h2 className='text-4xl font-bold text-center mb-12'>
          Drive Your Passion with{' '}
          <span className='text-primary'>DriveSphere</span>
        </h2>

        {/* Filter Section */}
        <div className='flex justify-between mb-8 flex-wrap gap-4'>
          <h1 className='text-4xl font-semibold'>DriveSphere</h1>
          <AvailabilityFilter
            value={availabilityFilter}
            onChange={setAvailabilityFilter}
          />
        </div>

        {/* Car List Section */}
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => <CarCard key={car.id} car={car} />)
          ) : (
            <p className='text-center text-gray-500 col-span-full'>
              No cars match the selected criteria.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomePageCars;
