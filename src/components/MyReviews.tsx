import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { localStorageService, currentUser } from '../services/localStorage';
import type { Review } from '../types/Review';
import Rating from './Rating';

const MyReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = () => {
      try {
        const allReviews = localStorageService.getAllReviews();
        const userReviews = allReviews.filter((review: Review) => review.userId === currentUser.id);
        setReviews(userReviews);
      } catch (err) {
        setError('Failed to load reviews');
        console.error('Error loading reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">My Reviews</h2>
          <p className="text-gray-600 mb-4">You haven't written any reviews yet.</p>
          <Link
            to="/search"
            className="inline-block bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700"
          >
            Find Stalls to Review
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Reviews</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => {
          const stall = localStorageService.getStallById(review.stallId);
          return (
            <div key={review.id} className="bg-white rounded-lg shadow p-6">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {stall ? (
                    <Link to={`/stall/${stall.id}`} className="hover:text-orange-600">
                      {stall.name}
                    </Link>
                  ) : (
                    'Stall no longer available'
                  )}
                </h3>
                <div className="mt-1">
                  <Rating value={review.rating} readonly />
                </div>
              </div>
              <p className="text-gray-600 mb-4">{review.comment}</p>
              {review.imageUrl && (
                <div className="mb-4">
                  <img
                    src={review.imageUrl}
                    alt="Review"
                    className="w-full h-48 object-cover rounded-md"
                  />
                </div>
              )}
              <div className="text-sm text-gray-500">
                Posted on {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyReviews; 