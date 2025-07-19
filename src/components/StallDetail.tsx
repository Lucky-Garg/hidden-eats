import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, UtensilsCrossed, ChevronLeft, Star } from 'lucide-react';
import { localStorageService } from '../services/localStorage';
import AddReviewForm from './AddReviewForm';
import Rating from './Rating';
import type { FoodStall } from '../types/FoodStall';
import type { Review } from '../types/Review';

const StallDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [stall, setStall] = useState<FoodStall | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStallAndReviews = () => {
      try {
        if (!id) throw new Error('Stall ID not found');

        const stallData = localStorageService.getStallById(id);
        if (!stallData) throw new Error('Stall not found');
        setStall(stallData);

        const stallReviews = localStorageService.getReviewsByStallId(id);
        setReviews(stallReviews);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadStallAndReviews();
  }, [id]);

  const handleReviewAdded = () => {
    if (id) {
      const updatedStall = localStorageService.getStallById(id);
      const updatedReviews = localStorageService.getReviewsByStallId(id);
      if (updatedStall) setStall(updatedStall);
      setReviews(updatedReviews);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !stall) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error || 'Stall not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/search"
          className="inline-flex items-center text-gray-600 hover:text-primary-500 mb-6 transition-colors duration-200"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Search
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          {/* Hero Section */}
          <div className="relative h-64 sm:h-80 md:h-96">
            <img
              src={stall.imageUrl}
              alt={stall.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl sm:text-4xl font-display font-bold mb-2">
                {stall.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  {stall.location}
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-1 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{stall.rating?.toFixed(1) || 'New'}</span>
                  <span className="ml-1 text-gray-200">({reviews.length} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  About this Stall
                </h2>
                <p className="text-gray-600 mb-6">{stall.description}</p>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <UtensilsCrossed className="w-5 h-5 text-primary-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Must-Try Dish</p>
                      <p className="text-gray-900 font-medium">{stall.mustTryDish}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-primary-500 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">Approximate Price</p>
                      <p className="text-gray-900 font-medium">${stall.approximatePrice.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-display font-semibold text-gray-900 mb-4">
                  Add Your Review
                </h2>
                <AddReviewForm stallId={stall.id} onReviewAdded={handleReviewAdded} />
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6">
                Reviews ({reviews.length})
              </h2>

              {reviews.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No reviews yet. Be the first to review!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-medium text-gray-900">{review.userName}</p>
                          <div className="mt-1">
                            <Rating value={review.rating} readonly />
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <p className="text-gray-600 mb-4">{review.comment}</p>

                      {review.imageUrl && (
                        <div className="mt-4">
                          <img
                            src={review.imageUrl}
                            alt="Review"
                            className="rounded-lg max-h-48 object-cover"
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StallDetail; 