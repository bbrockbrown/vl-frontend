import { Link } from 'react-router-dom';
import LightIconLogo from '@/components/icons/LightIconLogo';

export default function Footer() {
  return (
    <footer className='w-full text-white py-8 md:py-12'>
      <div className='mx-auto px-4 md:px-6'>
        {/* Main Footer Content */}
        <div className='flex flex-col md:flex-row justify-between md:items-center items-center mb-8'>
          {/* Left Section - Navigation */}
          <div className='mb-6 md:mb-0 text-center md:text-start'>
            <nav className='space-y-2'>
              <Link 
                to='/about' 
                className='block text-white hover:text-gray-300 transition-colors'
              >
                About Us
              </Link>
              <Link 
                to='/contact' 
                className='block text-white hover:text-gray-300 transition-colors'
              >
                Reach out
              </Link>
              <Link 
                to='/credits' 
                className='block text-white hover:text-gray-300 transition-colors'
              >
                API & Data Credits
              </Link>
            </nav>
          </div>

          {/* Right Section - Logo */}
          <div className='flex flex-col items-center md:items-end'>
            <LightIconLogo width="75" height="75" />
          </div>
        </div>

        {/* Bottom Section - Copyright & Terms */}
        <div className='flex flex-col md:flex-row justify-between w-full items-center pt-6 border-t border-gray-700'>
          <div className='mb-4 md:mb-0'>
            <Link 
              to='/terms' 
              className='text-sm text-gray-400 hover:text-white transition-colors'
            >
              Terms of Use & Privacy Policy
            </Link>
          </div>
          <div className='text-sm text-gray-400'>
            ©2025 VibeLog Team. All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}