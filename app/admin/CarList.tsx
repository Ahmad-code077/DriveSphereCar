import { useState } from 'react';
import Image from 'next/image';
import UpdateCarPopup from './UpdateCarPopup';
import DeleteCar from './DeleteCar';

export interface Car {
  id: string;
  name: string;
  model: string;
  dailyRate: number;
  seats: number;
  numberPlate: string;
  image: string;
  brand: string;
  availability: boolean;
}

interface CarListProps {
  cars: Car[];
  refreshCars: () => void;
}

const CarList = ({ cars, refreshCars }: CarListProps) => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  return (
    <div className='py-6'>
      {cars.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {cars.map((car) => (
            <div
              key={car.id}
              className='bg-card text-foreground rounded-lg shadow-lg p-4 border-primary border'
            >
              <div className='flex justify-center mb-4 h-44 w-[80%] mx-auto'>
                <Image
                  src={car.image}
                  alt={car.name}
                  width={200}
                  height={200}
                  className='rounded-lg object-cover w-full h-full'
                  unoptimized
                />
              </div>
              <h3 className='text-2xl font-semibold text-center mb-2'>
                {car.name}
              </h3>
              <p className='text-lg text-center text-muted-foreground'>
                {car.model}
              </p>
              <div className='flex justify-between mt-4'>
                <span className='font-semibold'>{car.seats} Seats</span>
                <span className='font-semibold'>${car.dailyRate}/Day</span>
              </div>
              <div className='flex justify-between mt-2'>
                <span className='font-semibold'>{car.numberPlate}</span>
                <span
                  className={`font-semibold ${
                    car.availability ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {car.availability ? 'Available' : 'Not Available'}
                </span>
              </div>
              <div className='mt-4 flex justify-between'>
                <button
                  onClick={() => setSelectedCar(car)}
                  className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary-dark transition-all'
                >
                  Update
                </button>
                <DeleteCar carId={car.id} refreshCars={refreshCars} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-300 text-center'>No cars available.</p>
      )}

      {selectedCar && (
        <UpdateCarPopup
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          refreshCars={refreshCars}
        />
      )}
    </div>
  );
};

export default CarList;
