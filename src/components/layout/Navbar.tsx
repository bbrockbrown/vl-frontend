import { useState } from 'react';

// import GradientButton from '@/components/base/GradientButton';
import GradientBorderButton from '@/components//base/GradientBorderButton';
import LightLogo from '@/components/icons/LightLogo';
// import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  // CircleCheckIcon,
  // CircleHelpIcon,
  // CircleIcon,
  Menu,
  X,
} from 'lucide-react';
import { Outlet } from 'react-router-dom';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Button from '@/components/base/Button';
import LightIconLogo from '../icons/LightIconLogo';

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: 'Alert Dialog',
//     href: '/docs/primitives/alert-dialog',
//     description:
//       'A modal dialog that interrupts the user with important content and expects a response.',
//   },
//   {
//     title: 'Hover Card',
//     href: '/docs/primitives/hover-card',
//     description:
//       'For sighted users to preview content available behind a link.',
//   },
//   {
//     title: 'Progress',
//     href: '/docs/primitives/progress',
//     description:
//       'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
//   },
//   {
//     title: 'Scroll-area',
//     href: '/docs/primitives/scroll-area',
//     description: 'Visually or semantically separates content.',
//   },
//   {
//     title: 'Tabs',
//     href: '/docs/primitives/tabs',
//     description:
//       'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
//   },
//   {
//     title: 'Tooltip',
//     href: '/docs/primitives/tooltip',
//     description:
//       'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
//   },
// ];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    console.log("Toggle from", isMobileMenuOpen)
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className='flex flex-row items-center justify-between w-full max-w-[1400px] py-5 px-4 md:px-6'>
        {/* Logo */}
        <div className='relative'>
          <LightLogo width='150' height='50' />
        </div>

        {/* Desktop Navigation Menu */}
        <NavigationMenu
          viewport={true}
          className='bg-[#14161a] text-white hidden md:block'
        >
          <NavigationMenuList>
          <NavigationMenuItem>
              <NavigationMenuTrigger>Home</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[250px] gap-4'>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to='#'>Track your mood through music</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to='#'>Connect with Spotify</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to='#'>Why Vibelog?</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>About</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid gap-2 md:w-[400px] lg:w-[300px]'>
                    <NavigationMenuLink asChild>
                      <a
                        className='from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md'
                        href='/'
                      >
                        <div className='flex flex-row items-center gap-0.5 mt-4 mb-2 text-lg font-medium w-full'>
                          <span>Vibelog</span>
                          <LightIconLogo width="25" height="25" className="!w-[22.5px] !h-[22.5px]" />
                        </div>
                        <p className='text-muted-foreground text-sm leading-tight'>
                          A way for you to see how your emotions correlate to listening activity, backed 
                          by real data. <br/>
                          Click to read more about how we do this.
                        </p>
                      </a>
                    </NavigationMenuLink>          
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
            {/* <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to='/docs'>Docs</Link>
              </NavigationMenuLink>
            </NavigationMenuItem> */}
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>List</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[300px] gap-4'>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to='#'>
                        <div className='font-medium'>Components</div>
                        <div className='text-muted-foreground'>
                          Browse all components in the library.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to='#'>
                        <div className='font-medium'>Documentation</div>
                        <div className='text-muted-foreground'>
                          Learn how to use the library.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to='#'>
                        <div className='font-medium'>Blog</div>
                        <div className='text-muted-foreground'>
                          Read our latest blog posts.
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
            {/* <NavigationMenuItem>
              <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='grid w-[200px] gap-4'>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link to='#' className='flex-row items-center gap-2'>
                        <CircleHelpIcon />
                        Backlog
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to='#' className='flex-row items-center gap-2'>
                        <CircleIcon />
                        To Do
                      </Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link to='#' className='flex-row items-center gap-2'>
                        <CircleCheckIcon />
                        Done
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Login/Signup */}
        <div className='hidden md:flex justify-end gap-2'>
          <Button color='#CB3CFF' className='border border-white'>
            Login
          </Button>
          <GradientBorderButton fromColor='#ca3dfd' toColor='#10c3ff'>
            Sign Up
          </GradientBorderButton>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className='md:hidden p-2 text-white hover:bg-gray-800 rounded-lg transition-colors'
          aria-label='Toggle mobile menu'
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className='md:hidden fixed inset-0 z-50 opacity-100'
          onClick={closeMobileMenu}
        >
          <div
            className='opacity-100 absolute top-0 right-0 w-65 h-full bg-[var(--background)] shadow-xl backdrop-blur-md transform transition-transform duration-300 ease-in-out'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex flex-col h-full'>
              {/* Mobile Menu Header */}
              <div className='flex items-center h-[90px] justify-between px-6 py-5 border-b border-gray-700'>
                <span className='text-white font-semibold text-lg'>Menu</span>
                <button 
                  onClick={closeMobileMenu}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Navigation Items */}
              <div className='flex-1 overflow-y-auto p-6'>
                <nav className='space-y-4'>
                  {/* Navigation Links */}
                  <div className='space-y-2'>
                    <Link
                      to='/'
                      className='block text-white hover:text-gray-300 py-2 transition-colors'
                      onClick={closeMobileMenu}
                    >
                      Home
                    </Link>
                    <Link
                      to='/'
                      className='block text-white hover:text-gray-300 py-2 transition-colors'
                      onClick={closeMobileMenu}
                    >
                      About
                    </Link>
                  </div>
                </nav>
              </div>

              {/* Mobile Login/Signup Buttons */}
              <div className='p-6 border-t border-gray-700 space-y-3'>
              <GradientBorderButton fromColor='#ca3dfd' toColor='#10c3ff' className='w-full font-medium transition' onClick={closeMobileMenu}>
                  Sign Up
                </GradientBorderButton>
                <Button color='#CB3CFF' className='border border-white w-full' onClick={closeMobileMenu}>
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
}

// function ListItem({
//   title,
//   children,
//   href,
//   ...props
// }: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
//   return (
//     <li {...props}>
//       <NavigationMenuLink asChild>
//         <Link to={href}>
//           <div className='text-sm leading-none font-medium'>{title}</div>
//           <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
//             {children}
//           </p>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// }
