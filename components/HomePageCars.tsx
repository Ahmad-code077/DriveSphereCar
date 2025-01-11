'use client';

import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';
import { Car } from '@/app/admin/CarList';

const HomePageCars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:5000/cars');
        if (!response.ok) {
          throw new Error('Failed to fetch car data.');
        }
        const data: Car[] = await response.json();
        setCars(data);
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

  if (loading)
    return <p className='text-center text-xl text-black'>Loading cars...</p>;
  if (error) return <p className='text-center text-xl text-red-600'>{error}</p>;

  return (
    <section className=' text-black py-12 '>
      <div>
        <h2 className='text-4xl font-bold text-center mb-12'>
          Drive Your Passion with{' '}
          <span className='text-primary'>WheelDeal</span>
        </h2>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePageCars;
