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
        <div className='overflow-x-auto'>
          <table className='min-w-full table-auto'>
            <thead>
              <tr className='bg-secondary'>
                <th className='px-4 py-2 text-left text-foreground'>Car</th>
                <th className='px-4 py-2 text-left text-foreground'>Model</th>
                <th className='px-4 py-2 text-left text-foreground'>Seats</th>
                <th className='px-4 py-2 text-left text-foreground'>
                  Price / Day
                </th>
                <th className='px-4 py-2 text-left text-foreground'>
                  Number Plate
                </th>
                <th className='px-4 py-2 text-left text-foreground'>Brand</th>
                <th className='px-4 py-2 text-left text-foreground'>
                  Availability
                </th>
                <th className='px-4 py-2 text-left text-foreground'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id} className='border-b border-border'>
                  <td className='px-4 py-2 flex items-center'>
                    <Image
                      src={car.image}
                      alt={car.name}
                      width={50}
                      height={50}
                      className='rounded-full mr-2'
                      unoptimized
                    />
                    {car.name}
                  </td>
                  <td className='px-4 py-2'>{car.model}</td>
                  <td className='px-4 py-2'>{car.seats}</td>
                  <td className='px-4 py-2'>${car.dailyRate}</td>
                  <td className='px-4 py-2'>{car.numberPlate}</td>
                  <td className='px-4 py-2'>{car.brand}</td>
                  <td className='px-4 py-2'>
                    {car.availability ? 'Available' : 'Not Available'}
                  </td>
                  <td className='px-4 py-2'>
                    <button
                      onClick={() => setSelectedCar(car)}
                      className='px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary-dark focus:ring-offset-2 transition-all'
                    >
                      Update
                    </button>

                    <DeleteCar carId={car.id} refreshCars={refreshCars} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
