import React from 'react';
import { Rocket, Globe, Heart } from 'lucide-react'; // Import Lucide icons

// Array to map over for cards
const aboutContent = [
  {
    title: 'Innovating for the Future',
    description:
      'Our mission is to provide innovative solutions that create long-term value for our clients. We strive to deliver exceptional results and push the boundaries of technology.',
    icon: <Rocket size={40} className='text-primary mb-4' />, // Icon for mission
  },
  {
    title: 'Leading Technological Transformation',
    description:
      'We envision a future where businesses and people thrive through technology. Our goal is to lead this transformation and shape the digital landscape.',
    icon: <Globe size={40} className='text-primary mb-4' />, // Icon for vision
  },
  {
    title: 'Guided by Core Values',
    description:
      'We prioritize integrity, collaboration, and innovation. These values guide our work and ensure that we consistently exceed our clients’ expectations.',
    icon: <Heart size={40} className='text-primary mb-4' />, // Icon for values
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className='text-gray-900'>
      {/* Hero Section with background image */}
      <section
        className='relative bg-cover bg-center text-gray-900 py-24 px-6 sm:px-16'
        style={{
          backgroundImage: 'url(https://static.toiimg.com/photo/80387978.cms)',
        }}
      >
        <div className='absolute inset-0 bg-black opacity-50'></div>
        <div className='relative z-10 max-w-7xl mx-auto text-center'>
          <h1 className='text-4xl font-semibold text-primary mb-6'>About Us</h1>
          <p className='text-lg text-white sm:text-xl'>
            We are a forward-thinking company driven by innovation and a passion
            for excellence. Our team specializes in delivering world-class
            solutions that empower our clients and elevate their businesses.
          </p>
        </div>
      </section>

      {/* New Cards Section */}
      <div className='max-w-7xl mx-auto py-16  sm:px-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12'>
          {aboutContent.map((item, index) => (
            <div
              key={index}
              className=' shadow-lg rounded-lg p-8 flex flex-col items-center text-center border border-primary'
            >
              {item.icon}
              <h3 className='text-2xl font-semibold text-gray-900 mb-4'>
                {item.title}
              </h3>
              <p className='text-gray-600'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Content Section */}
      <div className='max-w-7xl mx-auto pb-16  sm:px-16 bg-gray-50 rounded-lg '>
        <h3 className='text-3xl font-semibold text-primary mb-6 text-center'>
          More About Us
        </h3>
        <p className='text-lg text-gray-700 mb-6'>
          At DriveSphere, we are passionate about providing the best car rental
          and sales experience. With years of expertise in the automotive
          industry, we have built a reputation for offering a wide selection of
          high-quality vehicles, from luxury cars to reliable family sedans.
          Whether you&apos;re looking to rent a car for a weekend getaway or
          purchase your dream vehicle, we are committed to meeting your needs
          with exceptional service and unbeatable prices.
        </p>

        {/* Our Story and Approach Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className=' shadow-lg rounded-lg p-8 border border-foreground'>
            <h4 className='text-xl font-semibold text-gray-900 mb-4'>
              Our Vision for the Future
            </h4>
            <p className='text-gray-600'>
              At DriveSphere, our vision is to revolutionize the way people
              experience mobility. We strive to offer the most innovative and
              flexible car rental and purchase solutions, ensuring that our
              customers have access to the highest quality vehicles and services
              that fit their unique lifestyles.
            </p>
          </div>

          <div className=' shadow-lg rounded-lg p-8 border border-foreground'>
            <h4 className='text-xl font-semibold text-gray-900 mb-4'>
              Our Commitment to Excellence
            </h4>
            <p className='text-gray-600'>
              We are committed to excellence in every aspect of our business.
              From providing a seamless booking experience to offering
              exceptional customer service, we ensure that every interaction
              with DriveSphere exceeds your expectations. Our dedicated team is
              focused on delivering outstanding results for each and every
              customer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
