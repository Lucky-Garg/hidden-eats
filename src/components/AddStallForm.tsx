import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Camera, UtensilsCrossed } from 'lucide-react';
import { localStorageService } from '../services/localStorage';
import type { FoodStall } from '../types/FoodStall';

const AddStallForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [mustTryDish, setMustTryDish] = useState('');
  const [approximatePrice, setApproximatePrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!name.trim()) throw new Error('Please enter a stall name');
      if (!location.trim()) throw new Error('Please enter a location');
      if (!description.trim()) throw new Error('Please enter a description');
      if (!mustTryDish.trim()) throw new Error('Please enter a must-try dish');
      if (!approximatePrice) throw new Error('Please enter an approximate price');
      if (!image) throw new Error('Please upload an image');

      const price = parseFloat(approximatePrice);
      if (isNaN(price) || price <= 0) {
        throw new Error('Please enter a valid price');
      }

      // Check for duplicate stall names
      const existingStalls = localStorageService.getAllStalls();
      if (existingStalls.some(stall => stall.name.toLowerCase() === name.toLowerCase())) {
        throw new Error('A stall with this name already exists');
      }

      // Upload image
      const imageUrl = await localStorageService.uploadImage(image);

      // Add new stall
      const newStall: Omit<FoodStall, 'id'> = {
        name: name.trim(),
        location: location.trim(),
        description: description.trim(),
        mustTryDish: mustTryDish.trim(),
        approximatePrice: price,
        imageUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const stall = localStorageService.addStall(newStall);
      navigate(`/stall/${stall.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-6">
          Add New Food Stall
        </h1>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Stall Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location *
            </label>
            <div className="mt-1 relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="block w-full pl-10 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label htmlFor="mustTryDish" className="block text-sm font-medium text-gray-700">
              Must-Try Dish *
            </label>
            <div className="mt-1 relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UtensilsCrossed className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="mustTryDish"
                value={mustTryDish}
                onChange={(e) => setMustTryDish(e.target.value)}
                className="block w-full pl-10 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Approximate Price *
            </label>
            <div className="mt-1 relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="price"
                value={approximatePrice}
                onChange={(e) => setApproximatePrice(e.target.value)}
                min="0"
                step="0.01"
                className="block w-full pl-10 rounded-lg border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stall Image *
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-primary-500 transition-colors duration-200">
              <div className="space-y-1 text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="image"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files && setImage(e.target.files[0])}
                      className="sr-only"
                      required
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
                {image && (
                  <p className="text-sm text-primary-600">
                    Selected: {image.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex justify-center items-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Adding Stall...
                </>
              ) : (
                'Add Stall'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddStallForm; 