'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React from 'react';

import { Car } from './CarList'; // Assuming CarList contains the car data
import { useShowToast } from '@/components/Toast';

// Validation schema with preprocessing for numeric fields
const carSchema = z.object({
  name: z.string().min(1, 'Car Name is required'),
  model: z.string().min(1, 'Model is required'),
  dailyRate: z.coerce.number().min(1, 'Price per day is required'), // Coerce strings to numbers
  seats: z.coerce.number().min(1, 'Seats are required'),
  numberPlate: z.string().min(1, 'Number Plate is required'),
  image: z.string().url('Invalid image URL').min(1, 'Image URL is required'),
  brand: z.string().min(1, 'Brand is required'),
  availability: z.boolean(),
});

type CarFormValues = z.infer<typeof carSchema>;

interface UpdateCarPopupProps {
  car: Car;
  onClose: () => void;
  refreshCars: () => void;
}

const UpdateCarPopup: React.FC<UpdateCarPopupProps> = ({
  car,
  onClose,
  refreshCars,
}) => {
  const showToast = useShowToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: {
      name: car.name,
      model: car.model,
      dailyRate: car.dailyRate,
      seats: car.seats,
      numberPlate: car.numberPlate,
      image: car.image,
      brand: car.brand,
      availability: car.availability,
    },
  });

  // Handle form submission
  const handleUpdateCar = async (data: CarFormValues) => {
    try {
      const response = await fetch(`http://localhost:5000/cars/${car.id}`, {
        method: 'PATCH', // Use PATCH to update only specific fields
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showToast({
          title: 'Car Updated Successfully!',
          description: 'The car details have been updated.',
        });
        refreshCars();
        onClose();
      } else {
        showToast({
          title: 'Error Updating Car',
          description: 'There was an issue updating the car.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: `An error occurred while updating the car. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-md sm:w-[400px] p-6'>
        <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
          Update Car
        </h2>
        <form onSubmit={handleSubmit(handleUpdateCar)} className='space-y-4'>
          <div>
            <Input
              placeholder='Enter car name'
              {...register('name')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.name && (
              <p className='text-red-500 text-sm'>
                {String(errors.name.message)}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter car model'
              {...register('model')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.model && (
              <p className='text-red-500 text-sm'>
                {String(errors.model.message)}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter daily rate'
              {...register('dailyRate')}
              className='bg-gray-100 text-gray-700'
              type='text'
              onChange={(e) =>
                setValue('dailyRate', parseFloat(e.target.value) || 0)
              }
            />
            {errors.dailyRate && (
              <p className='text-red-500 text-sm'>{errors.dailyRate.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter number of seats'
              {...register('seats')}
              className='bg-gray-100 text-gray-700'
              type='text'
              onChange={(e) =>
                setValue('seats', parseInt(e.target.value, 10) || 0)
              }
            />
            {errors.seats && (
              <p className='text-red-500 text-sm'>{errors.seats.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter number plate'
              {...register('numberPlate')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.numberPlate && (
              <p className='text-red-500 text-sm'>
                {String(errors.numberPlate.message)}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter image URL'
              {...register('image')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.image && (
              <p className='text-red-500 text-sm'>
                {String(errors.image.message)}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter car brand'
              {...register('brand')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.brand && (
              <p className='text-red-500 text-sm'>
                {String(errors.brand.message)}
              </p>
            )}
          </div>
          <div>
            <label className='block text-gray-600'>Availability</label>
            <input
              type='checkbox'
              {...register('availability')}
              className='mt-2'
            />
          </div>
          <div className='flex justify-end space-x-4'>
            <Button
              type='button'
              className='bg-gray-300 text-gray-700 hover:bg-gray-400'
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='bg-secondary text-white hover:bg-secondary/90'
            >
              Update Car
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCarPopup;
