'use client';

import Image from 'next/image';
import { useShowToast } from '@/components/Toast';
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const showToast = useShowToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, message } = formData;

    if (!name || !email || !message) {
      showToast({
        title: 'All Fields are required',
        description: `Please fill out the form completely.`,
        variant: 'destructive',
      });
      return;
    }

    showToast({
      title: 'Message Sent Successfully',
      description: `We received your message and will get back to you soon.`,
    });

    // Reset form fields
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className='text-foreground py-12'>
      <h1 className='text-4xl text-center font-semibold'>
        Contact DriveSphere
      </h1>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12'>
        {/* SVG Image */}
        <div className='w-full md:w-1/2 flex justify-center'>
          <Image
            src='/contact.svg'
            alt='Contact Us'
            width={500}
            height={500}
            className='rounded-lg shadow-lg'
            priority
          />
        </div>

        {/* Contact Form */}
        <div className='w-full md:w-1/2 bg-card text-foreground rounded-lg shadow-lg p-8'>
          <h2 className='text-4xl font-bold mb-6 text-primary'>Get in Touch</h2>
          <p className='text-lg mb-8 text-muted-foreground'>
            Have any questions or feedback? We’d love to hear from you. Fill out
            the form below, and we’ll get back to you shortly.
          </p>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='name' className='block text-lg font-medium mb-2'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='Your Name'
              />
            </div>
            <div>
              <label htmlFor='email' className='block text-lg font-medium mb-2'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='Your Email'
              />
            </div>
            <div>
              <label
                htmlFor='message'
                className='block text-lg font-medium mb-2'
              >
                Message
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary'
                placeholder='Your Message'
                rows={5}
              />
            </div>
            <button
              type='submit'
              className='bg-primary text-foreground py-3 px-6 rounded-lg text-lg hover:bg-primary/90 transition-all duration-300'
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
