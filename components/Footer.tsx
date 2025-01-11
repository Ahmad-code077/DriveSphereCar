'use client';

// Import necessary components from lucide-react
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

import Link from 'next/link';

// Social Media Links Data using lucide-react icons
const socialLinks = [
  { id: 1, icon: <Facebook size={24} />, href: 'https://facebook.com' },
  { id: 2, icon: <Instagram size={24} />, href: 'https://instagram.com' },
  { id: 4, icon: <Twitter size={24} />, href: 'https://twitter.com' },
  { id: 5, icon: <Youtube size={24} />, href: 'https://youtube.com' },
];

// Assuming you have a 'linksData' array from your sidebar (or a similar structure)
const linksData = [
  { id: 1, link: 'Home', to: '/' },
  { id: 2, link: 'About Us', to: '/about' },
  { id: 3, link: 'Contact Us', to: '/contact' },
  // Add any additional links as needed
];

const Footer: React.FC = () => {
  return (
    <footer className=' text-black py-6 border-t-gray-500 border'>
      <section className='max-w-6xl mx-auto px-4'>
        <div className='flex flex-col md:flex-row md:justify-between gap-12'>
          {/* Quick Links Section */}
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold mb-4'>Quick Links</h3>
            <ul className='flex flex-wrap space-x-6'>
              {linksData.map(({ id, link, to }) => (
                <li key={id}>
                  <Link
                    href={to}
                    className='hover:text-primary transition-all duration-300'
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className='mt-4 md:mt-0'>
            <h3 className='text-xl font-semibold mb-4 text-left md:text-right'>
              Follow Us
            </h3>
            <div className='flex md:justify-center items-center space-x-6 mt-6 md:mt-4'>
              {socialLinks.map(({ id, icon, href }) => (
                <a
                  key={id}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-600 text-2xl duration-300 hover:scale-110 transition-all hover:text-primary'
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className='border-t-gray-500 border h-1 mt-4'></div>
        {/* Copyright */}
        <div className='mt-6 text-left md:text-center text-gray-600 text-sm'>
          &copy; {new Date().getFullYear()} DriveSphere. All Rights Reserved.
        </div>
      </section>
    </footer>
  );
};

export default Footer;
