import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, User, LogOut, Settings } from 'lucide-react';
import { currentUser } from '../services/localStorage';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center space-x-2 group"
            >
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent group-hover:to-primary-500 transition-all duration-300">
                HiddenEats
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`nav-link ${isActive('/search') ? 'nav-link-active' : ''}`}
            >
              Find Stalls
            </Link>
            <Link
              to="/add-stall"
              className={`nav-link ${isActive('/add-stall') ? 'nav-link-active' : ''}`}
            >
              Add Stall
            </Link>
            <Link
              to="/my-reviews"
              className={`nav-link ${isActive('/my-reviews') ? 'nav-link-active' : ''}`}
            >
              My Reviews
            </Link>

            {/* User Profile Dropdown */}
            <DropdownMenu.Root onOpenChange={setIsDropdownOpen}>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-medium shadow-lg">
                    {currentUser.name.charAt(0)}
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  sideOffset={5}
                  asChild
                >
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="z-50 min-w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-900">{currentUser.name}</p>
                      <p className="text-sm text-gray-500">{currentUser.email}</p>
                    </div>

                    <DropdownMenu.Item className="outline-none">
                      <button className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200">
                        <User size={16} />
                        <span>Profile</span>
                      </button>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item className="outline-none">
                      <button className="w-full flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200">
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

                    <DropdownMenu.Item className="outline-none">
                      <button className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200">
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </DropdownMenu.Item>
                  </motion.div>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-500 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <SlidersHorizontal className="block h-6 w-6" />
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden"
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-xl">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActive('/') 
                ? 'text-primary-500 bg-primary-50' 
                : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/search"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActive('/search')
                ? 'text-primary-500 bg-primary-50'
                : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Find Stalls
          </Link>
          <Link
            to="/add-stall"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActive('/add-stall')
                ? 'text-primary-500 bg-primary-50'
                : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Add Stall
          </Link>
          <Link
            to="/my-reviews"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
              isActive('/my-reviews')
                ? 'text-primary-500 bg-primary-50'
                : 'text-gray-700 hover:text-primary-500 hover:bg-primary-50'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            My Reviews
          </Link>

          {/* Mobile Profile */}
          <div className="px-3 py-3 mt-2 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-medium shadow-lg">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{currentUser.name}</p>
                <p className="text-sm text-gray-500">{currentUser.email}</p>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-gray-700 rounded-md hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200">
                <User size={16} />
                <span>Profile</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-gray-700 rounded-md hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200">
                <Settings size={16} />
                <span>Settings</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 rounded-md hover:bg-red-50 transition-colors duration-200">
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar; 