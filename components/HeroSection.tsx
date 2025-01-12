import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className='relative py-12  '>
      {/* Content Section */}
      <div className='relative z-10 max-w-7xl mx-auto flex items-center justify-between flex-col md:flex-row gap-4 lg:gap-12'>
        {/* Text Section */}
        <div className='w-full md:w-1/2'>
          <h1 className='text-3xl sm:text-5xl font-extrabold mb-8'>
            Drive the Future with{' '}
            <span className='text-primary'> DriveSphere</span>
          </h1>
          <p className='text-lg sm:text-xl mb-12'>
            Unleash the power of innovation and performance with our curated
            collection of the finest cars. Whether you&apos;re after
            cutting-edge technology or unmatched luxury, WheelDeal is your
            gateway to the car of your dreams.
          </p>
        </div>

        {/* Image Section */}
        <div className='w-full md:w-1/2'>
          <Image
            src='https://cdn.pixabay.com/photo/2024/01/17/12/06/car-8514314_640.png'
            alt='Car'
            width={800} // You can adjust the width based on your design
            height={600} // Adjust the height accordingly to maintain aspect ratio
            className='w-full h-auto object-cover rounded-lg shadow-lg'
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
