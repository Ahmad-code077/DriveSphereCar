'use client';

import React from 'react';

interface AvailabilityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({
  value,
  onChange,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='px-6 py-3 text-lg border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all ease-in-out'
    >
      <option value='all'>All Cars</option>
      <option value='available'>Available Cars</option>
      <option value='unavailable'>Unavailable Cars</option>
    </select>
  );
};

export default AvailabilityFilter;
