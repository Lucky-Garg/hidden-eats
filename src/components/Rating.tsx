import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
}

const Rating: React.FC<RatingProps> = ({ value, onChange, readonly = false }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onChange?.(star)}
          className={`transition-transform duration-200 ${
            !readonly && 'hover:scale-110 focus:outline-none focus:scale-110'
          }`}
          disabled={readonly}
        >
          <Star
            className={`w-6 h-6 ${
              star <= value
                ? 'fill-primary-500 text-primary-500'
                : 'fill-gray-100 text-gray-300'
            } transition-colors duration-200`}
          />
        </button>
      ))}
    </div>
  );
};

export default Rating; 