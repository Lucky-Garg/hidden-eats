import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, ChevronDown, SlidersHorizontal, RefreshCw, Search } from 'lucide-react';
import { localStorageService } from '../services/localStorage';
import Rating from './Rating';
import type { FoodStall } from '../types/FoodStall';

const StallList: React.FC = () => {
  const [stalls, setStalls] = useState<FoodStall[]>([]);
  const [sortBy, setSortBy] = useState<'rating' | 'name'>('rating');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [locations, setLocations] = useState<Set<string>>(new Set());
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    const loadStalls = () => {
      const allStalls = localStorageService.getAllStalls();
      setStalls(allStalls);
      
      // Extract unique locations
      const locationSet = new Set(allStalls.map(stall => stall.location));
      setLocations(locationSet);
    };

    loadStalls();
  }, []);

  const filteredStalls = stalls
    .filter(stall => selectedLocation === 'all' || stall.location === selectedLocation)
    .sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      return a.name.localeCompare(b.name);
    });

  const resetFilters = () => {
    setSortBy('rating');
    setSelectedLocation('all');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4 md:mb-0">
            Food Stalls
          </h1>

          {/* Mobile Filters Toggle */}
          <button
            className="md:hidden flex items-center justify-center space-x-2 w-full px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <SlidersHorizontal size={20} />
            <span>Filters</span>
            <ChevronDown
              size={20}
              className={`transform transition-transform duration-200 ${
                isFiltersOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Filters Section */}
          <div
            className={`${
              isFiltersOpen ? 'flex' : 'hidden'
            } md:flex flex-col md:flex-row items-stretch md:items-center space-y-4 md:space-y-0 md:space-x-4 mt-4 md:mt-0`}
          >
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'name')}
                className="appearance-none w-full bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-gray-700 hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                <option value="rating">Sort by Rating</option>
                <option value="name">Sort by Name</option>
              </select>
              <ChevronDown size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="appearance-none w-full bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-gray-700 hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">All Locations</option>
                {Array.from(locations).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <MapPin size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <button
              onClick={resetFilters}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
            >
              <RefreshCw size={18} />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredStalls.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-xl shadow-sm"
            >
              <div className="w-24 h-24 mb-6 bg-primary-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-primary-500" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                No Food Stalls Found
              </h3>
              <p className="text-gray-600 text-center mb-6 max-w-md">
                We couldn't find any food stalls matching your criteria. Try adjusting your filters or exploring a different location!
              </p>
              <button
                onClick={resetFilters}
                className="btn-primary flex items-center space-x-2"
              >
                <RefreshCw size={18} />
                <span>Reset Filters</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredStalls.map((stall) => (
                <motion.div
                  key={stall.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <Link to={`/stall/${stall.id}`} className="block">
                    {stall.imageUrl && (
                      <div className="relative h-48 rounded-t-xl overflow-hidden">
                        <img
                          src={stall.imageUrl}
                          alt={stall.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h2 className="text-xl font-display font-semibold text-gray-900 line-clamp-1">
                          {stall.name}
                        </h2>
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-primary-500 fill-primary-500" />
                          <span className="ml-1 font-medium text-gray-900">
                            {stall.rating?.toFixed(1) || 'New'}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">{stall.description}</p>
                      <div className="flex items-center text-gray-500">
                        <MapPin size={18} className="mr-1" />
                        <span className="text-sm">{stall.location}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StallList; 