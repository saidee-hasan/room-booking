import React from 'react';
import useAuth from '../hooks/useAuth';

function Review({ review }) {
  const { user } = useAuth();

  return (
    <div className="mb-6">
      <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          {/* User image with fallback */}
          <img
            className="rounded-full w-12 h-12 object-cover"
            src={review.images || 'https://via.placeholder.com/150'}
            alt={`${review.userName}'s avatar`}
          />
          <div>
            <p className="font-bold text-gray-700">{review.userName}</p>
            <p className="text-sm text-gray-500">{new Date(review.timestamp).toLocaleString()}</p>
          </div>
        </div>

        {/* Star Rating System */}
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`text-xl ${index < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
          <span className="ml-2 text-sm text-gray-500 font-semibold">{review.rating}★</span>
        </div>

        {/* Review Comment */}
        <p className="mt-3 text-gray-800">{review.comment}</p>
      </div>
    </div>
  );
}

export default Review;
