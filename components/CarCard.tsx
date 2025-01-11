import React from 'react';
import Link from 'next/link';
import { Car } from '@/app/admin/CarList';
import Image from 'next/image';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <Link href={`/cars/${car.id}`} passHref>
      <div className='bg-card text-black rounded-3xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 cursor-pointer border-gray-400 border'>
        <Image
          src={car.image || '/default-car-image.jpg'} // Fallback image if car.image is not available
          alt={car.name}
          className='w-[95%] mx-auto h-64 object-cover mt-4 rounded-3xl'
          width={500}
          height={300}
          unoptimized={true}
          loading='lazy'
        />
        <div className='p-4 text-center'>
          <h3 className='text-xl font-semibold'>{car.name}</h3>
          <p className='text-sm text-gray-600'>
            Brand: <span className='text-neutral-500'>{car.brand}</span>
          </p>
          <p className='text-sm text-gray-600'>
            Model: <span className='text-neutral-500'>{car.model}</span>
          </p>
          <p className='text-sm text-gray-600'>
            Seats: <span className='text-neutral-500'>{car.seats}</span>
          </p>
          <p className='text-sm text-gray-600'>
            Rate:{' '}
            <span className='text-neutral-500'>PKR {car.dailyRate}/day</span>
          </p>
          <p
            className={`text-sm font-semibold ${
              car.availability ? 'text-primary ' : 'text-gray-500'
            }`}
          >
            {car.availability ? 'In Stock' : 'Out of Stock'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
