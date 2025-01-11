'use client';

import { useShowToast } from '@/components/Toast';
import { useState } from 'react';

interface DeleteCarButtonProps {
  carId: string;
  refreshCars: () => void;
}

const DeleteCarButton: React.FC<DeleteCarButtonProps> = ({
  carId,
  refreshCars,
}) => {
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);

  const handleOpenDeletePopup = () => {
    setIsDeletePopupVisible(true);
  };

  const handleCloseDeletePopup = () => {
    setIsDeletePopupVisible(false);
  };

  return (
    <>
      <button
        onClick={handleOpenDeletePopup}
        className='px-4 py-2 bg-[#E11D48] text-white rounded-lg hover:bg-[#BE123C] focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition duration-200'
      >
        Delete
      </button>

      {isDeletePopupVisible && (
        <DeleteCarPopup
          carId={carId}
          onClose={handleCloseDeletePopup}
          refreshCars={refreshCars}
        />
      )}
    </>
  );
};

export default DeleteCarButton;

// Define types for the props of DeleteCarPopup
interface DeleteCarPopupProps {
  carId: string;
  onClose: () => void;
  refreshCars: () => void;
}

const DeleteCarPopup: React.FC<DeleteCarPopupProps> = ({
  carId,
  onClose,
  refreshCars,
}) => {
  const showToast = useShowToast();

  const handleDeleteCar = async () => {
    console.log(carId);
    try {
      const response = await fetch(
        `http://localhost:5000/cars/${String(carId)}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        showToast({
          title: 'Car Deleted Successfully!',
          description: 'The car has been removed.',
        });
        refreshCars();
        onClose(); // Close the popup after deleting
      } else {
        showToast({
          title: 'Error Deleting Car',
          description: 'There was an issue deleting the car.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.log(error);
      showToast({
        title: 'Error',
        description: `An error occurred while deleting the car. ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-md sm:w-[400px] p-6'>
        <h2 className='text-xl font-bold text-secondary mb-4'>Are you sure?</h2>
        <p className='text-gray-600 mb-6'>
          Do you really want to delete this car? This action cannot be undone.
        </p>
        <div className='flex justify-end space-x-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-black transition duration-200'
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteCar}
            className='px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition duration-200'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
