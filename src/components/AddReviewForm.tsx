import React, { useState, useRef } from 'react';
import { localStorageService, currentUser } from '../services/localStorage';
import Rating from './Rating';
import type { Review } from '../types/Review';

interface AddReviewFormProps {
  stallId: string;
  onReviewAdded: () => void;
}

const AddReviewForm: React.FC<AddReviewFormProps> = ({ stallId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (rating === 0) {
        throw new Error('Please select a rating');
      }

      if (!comment.trim()) {
        throw new Error('Please enter a comment');
      }

      let imageUrl: string | undefined;

      if (image) {
        imageUrl = await localStorageService.uploadImage(image);
      }

      const newReview: Omit<Review, 'id'> = {
        stallId,
        userId: currentUser.id,
        userName: currentUser.name,
        rating,
        comment: comment.trim(),
        imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      localStorageService.addReview(newReview);

      // Reset form
      setRating(0);
      setComment('');
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      onReviewAdded();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Add a Review</h3>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating *
          </label>
          <Rating value={rating} onChange={setRating} />
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Comment *
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image (optional)
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
          >
            {loading ? 'Adding Review...' : 'Add Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewForm; 