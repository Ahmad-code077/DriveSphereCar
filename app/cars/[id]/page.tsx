'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Car } from '@/app/admin/CarList'; // Adjust this import if needed
import Image from 'next/image';

const SingleCar: React.FC = () => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchCar = async () => {
      try {
        // Replace this URL with the appropriate endpoint for fetching cars
        const response = await fetch('http://localhost:5000/cars');
        if (!response.ok) {
          throw new Error('Failed to fetch car');
        }
        const data: Car[] = await response.json();
        const foundCar = data.find((car: Car) => car.id === id);

        if (foundCar) {
          setCar(foundCar);
        } else {
          setError('Car not found');
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading)
    return (
      <p className='text-center text-gray-500 text-lg font-medium shadow-lg p-6 rounded-lg'>
        Loading...
      </p>
    );
  if (error)
    return (
      <p className='text-center text-red-600 text-lg font-medium shadow-lg p-6 rounded-lg'>
        Error: {error}
      </p>
    );

  return (
    <section className='p-2 mt-12 shadow-lg rounded-xl bg-white'>
      {car ? (
        <div className='flex flex-col md:flex-row gap-8'>
          {/* Image Section */}
          <div className='flex-shrink-0 w-full md:w-1/2 flex justify-center items-center'>
            <Image
              className='w-full h-[400px] object-cover rounded-xl shadow-lg hover:-rotate-3 transition-rotate duration-300'
              src={car.image}
              alt={car.name}
              priority
              width={960}
              height={540}
              unoptimized={true}
            />
          </div>

          {/* Content Section */}
          <div className='flex flex-col md:w-1/2 text-center'>
            <h1 className='text-4xl font-extrabold text-gray-800 mb-4'>
              {car.name}
            </h1>
            <div className='space-y-6'>
              <h3 className='text-2xl font-semibold text-gray-700 mt-4'>
                Car Details
              </h3>
              <ul className='space-y-4 mt-2'>
                <li className='text-lg text-gray-600'>
                  <strong>Brand:</strong> {car.brand}
                </li>
                <li className='text-lg text-gray-600'>
                  <strong>Modal:</strong> {car.model}
                </li>
                <li className='text-lg text-gray-600'>
                  <strong>Seats:</strong> {car.seats}
                </li>
                <li className='text-lg text-gray-600'>
                  <strong>Plate Number:</strong> {car.numberPlate}
                </li>
                <li className='text-lg text-gray-600'>
                  <strong>Daily Rate:</strong> PKR {car.dailyRate}/day
                </li>
                <li
                  className={`text-lg font-semibold ${
                    car.availability ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {car.availability ? 'In Stock' : 'Out of Stock'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p className='text-center text-gray-500 text-lg font-medium'>
          Car not found.
        </p>
      )}
    </section>
  );
};

export default SingleCar;
