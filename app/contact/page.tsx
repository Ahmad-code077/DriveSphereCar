'use client';

import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from 'lucide-react';

const contactDetails = [
  {
    title: 'Phone',
    description: 'Call us at:',
    value: '+92-321-555-1234',
    icon: <Phone className='w-8 h-8 text-primary' />,
  },
  {
    title: 'Email',
    description: 'Send us an email at:',
    value: 'DriveSphere@example.com',
    icon: <Mail className='w-8 h-8 text-primary' />,
  },
  {
    title: 'Address',
    description: 'Visit us at:',
    value: '123 Auto Street, Car City, PK',
    icon: <MapPin className='w-8 h-8 text-primary' />,
  },
];

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    icon: <Facebook className='w-8 h-8 text-primary' />,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com',
    icon: <Twitter className='w-8 h-8 text-primary' />,
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    icon: <Instagram className='w-8 h-8 text-primary' />,
  },
];

const Contact: React.FC = () => {
  return (
    <section className='text-white py-24 '>
      <div className='max-w-7xl mx-auto text-center'>
        <h1 className='text-5xl font-extrabold mb-8 text-primary'>
          Contact Us
        </h1>

        <p className='text-lg mb-12 text-muted-foreground'>
          We’d love to hear from you! Whether you have a question, want to learn
          more about our cars, or need assistance, feel free to reach out to us
          using any of the following methods.
        </p>

        {/* Contact Details */}
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12'>
          {contactDetails.map((item, index) => (
            <div
              key={index}
              className='bg-card text-white rounded-lg shadow-lg p-8'
            >
              <div className='flex items-center gap-4 mb-4 justify-center'>
                {item.icon}
                <h3 className='text-2xl font-semibold'>{item.title}</h3>
              </div>
              <p className='text-lg'>{item.description}</p>
              <p className='text-xl font-semibold mt-2'>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div className='mt-12'>
          <h3 className='text-3xl font-semibold mb-6'>Follow Us</h3>
          <div className='flex justify-center gap-8'>
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className='text-2xl text-primary  hover:scale-105 transition-all duration-300'
                target='_blank'
                rel='noopener noreferrer'
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
