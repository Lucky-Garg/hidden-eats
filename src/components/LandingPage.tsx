import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Star, TrendingUp } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-peach-500/10 backdrop-blur-sm" />
        </div>
        
        <motion.div 
          className="relative max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-gray-900 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover Hidden Food Gems
            <span className="block text-primary-500">In Your Neighborhood</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Find and share the best local food stalls, hidden spots, and street food treasures.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/search" className="btn-primary flex items-center justify-center gap-2">
              <Search size={20} />
              Find Food Stalls
            </Link>
            <Link to="/add-stall" className="btn-secondary flex items-center justify-center gap-2">
              <MapPin size={20} />
              Add Your Favorite Spot
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-12">
            Why Choose HiddenEats?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary-100">
                  <MapPin className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-display font-semibold text-gray-900">
                  Local Discoveries
                </h3>
              </div>
              <p className="text-gray-600">
                Find authentic local food spots that you won't find in tourist guides.
              </p>
            </motion.div>

            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary-100">
                  <Star className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-display font-semibold text-gray-900">
                  Trusted Reviews
                </h3>
              </div>
              <p className="text-gray-600">
                Real reviews from food enthusiasts who share your passion for local cuisine.
              </p>
            </motion.div>

            <motion.div 
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary-100">
                  <TrendingUp className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-display font-semibold text-gray-900">
                  Trending Spots
                </h3>
              </div>
              <p className="text-gray-600">
                Stay updated with the latest and most popular food stalls in your area.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
            Ready to Start Your Food Adventure?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of food lovers and start discovering amazing local food spots today.
          </p>
          <Link to="/search" className="btn-primary inline-flex items-center gap-2">
            <Search size={20} />
            Start Exploring
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage; 