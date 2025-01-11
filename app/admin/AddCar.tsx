'use client';

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useShowToast } from '@/components/Toast';

// Define validation schema for the car form using Zod
const carSchema = z.object({
  name: z.string().min(1, 'Car Name is required'),
  model: z.string().min(1, 'Model is required'),
  dailyRate: z.number().min(1, 'Daily Rate must be greater than 0'),
  seats: z.number().min(1, 'Seats must be greater than 0'),
  numberPlate: z.string().min(1, 'Number Plate is required'),
  image: z.string().url('Invalid image URL').min(1, 'Image URL is required'),
  brand: z.string().min(1, 'Brand is required'),
  availability: z.boolean(),
});

type CarFormValues = z.infer<typeof carSchema>;

interface AddCarPopupProps {
  onClose: () => void;
  refreshCars: () => void;
}

const AddCarPopup: React.FC<AddCarPopupProps> = ({ onClose, refreshCars }) => {
  const showToast = useShowToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
  });

  const handleAddCar = async (data: CarFormValues) => {
    try {
      const response = await fetch('http://localhost:5000/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: new Date().getTime().toString(), // Generate unique id for the new car
          ...data,
        }),
      });

      if (response.ok) {
        showToast({
          title: 'Car Added Successfully!',
          description: 'The car has been added.',
        });
        refreshCars();
        onClose();
        reset(); // Reset form after successful submission
      } else {
        showToast({
          title: 'Error Adding Car',
          description: 'There was an issue adding the car.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: `An error occurred while adding the car. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-md sm:w-[400px] p-6'>
        <h2 className='text-2xl font-semibold text-gray-600 mb-4'>
          Add New Car
        </h2>
        <form onSubmit={handleSubmit(handleAddCar)} className='space-y-4'>
          <div>
            <Input
              placeholder='Enter car name'
              {...register('name')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter car model'
              {...register('model')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.model && (
              <p className='text-red-500 text-sm'>{errors.model.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter daily rate'
              {...register('dailyRate', { valueAsNumber: true })}
              className='bg-gray-100 text-gray-700'
              type='number'
              min={1}
            />
            {errors.dailyRate && (
              <p className='text-red-500 text-sm'>{errors.dailyRate.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter number of seats'
              {...register('seats', { valueAsNumber: true })}
              className='bg-gray-100 text-gray-700'
              type='number'
              min={1}
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
                {errors.numberPlate.message}
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
              <p className='text-red-500 text-sm'>{errors.image.message}</p>
            )}
          </div>
          <div>
            <Input
              placeholder='Enter car brand'
              {...register('brand')}
              className='bg-gray-100 text-gray-700'
            />
            {errors.brand && (
              <p className='text-red-500 text-sm'>{errors.brand.message}</p>
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
              Add Car
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarPopup;
