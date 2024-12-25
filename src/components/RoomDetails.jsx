import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import ReactStars from "react-rating-stars-component";
import 'react-datepicker/dist/react-datepicker.css';
import useAuth from '../hooks/useAuth';

function RoomDetails() {
  const data = useLoaderData();
  
  
  
  useEffect(() => {
    fetch('http://localhost:5000/rooms')
      .then(res => res.json())
      .then(data => setRooms(data))
      .catch(error => console.error('Error fetching rooms:', error));
  }, []);
  
 

  fetch('http://localhost:5000/apply')
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    // Process the fetched data here
    console.log(data);
    // You can add your logic to handle the data
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    alert('An error occurred while fetching data. Please try again later.');
  });

console.log(data._id)





  const {
    name,
    description,
    price,
    features,
    images,
    rating,
    reviewsCount,
    availability: initialAvailability,
  
  } = data;

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availability, setAvailability] = useState(initialAvailability);
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
// Replace with actual logged-in username

  // Fetch reviews on component load
  useEffect(() => {
    const fetchReviews = async () => {
      fetch('http://localhost:5000/review')
      .then(res=>res.json())
      .then(data=>{
        setReviews(data)
      })
    };

    fetchReviews();
  }, [data.id]);



  

  const openBookingModal = () => {
    if (!availability) {
      alert('This room is currently unavailable for booking.');
      return;
    }
    setIsBookingModalOpen(true);
  };


  const { user } = useAuth();

  const closeBookingModal = () => {
    setSelectedDate(null);
    setIsBookingModalOpen(false);
  };

  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setSelectedRating(value);

  };
  const username = user?.displayName; 
  const handleBooking = async () => {
    if (!selectedDate) {
      alert('Please select a booking date.');
      return;
    }
  
    const bookingData = {
      roomName: name,
      roomDescription: description,
      roomPrice: price,
      selectedDate: selectedDate.toDateString(),
      roomId: data.id,
      email: user?.email,
      booking_id: data._id,
    };
  
    try {
      const response = await fetch('http://localhost:5000/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
  
        // Update room availability here after successful booking
        setAvailability(false);
        
        // Update availability in the database (call the backend API to update the room status)
        await fetch(`http://localhost:5000/rooms/${data.roomId}`, {
          method: 'PATCH', // Assuming a PATCH request to update room
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ availability: false }),
        });
  
        closeBookingModal();
        alert(`Room "${name}" booked successfully for ${selectedDate.toDateString()}!`);
      } else {
        const errorData = await response.json();
        alert(`Booking failed: ${errorData.message || 'Please try again later.'}`);
      }
    } catch (error) {
      console.error('Error booking room:', error);
      alert('An error occurred while processing your booking. Please try again.');
    }
  };
  

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setReviewRating(0);
    setReviewComment('');
    setIsReviewModalOpen(false);
  };

  const handleReviewSubmit = async () => {

    if (selectedRating === 0 || reviewComment.trim() === '') {
      alert('Please provide a rating and comment.');
      return;
    }
    const reviewData = {
      roomId: data._id,
      userName : user.displayName,
      rating: selectedRating,
      comment: reviewComment,
      email : user.email

    };

    console.log(reviewData)
   await fetch('http://localhost:5000/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
  
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white text-gray-800 shadow-lg rounded-lg">
      {/* Room Image */}
      <div className="mb-6">
        <img
          src={images}
          alt={name}
          className="w-full h-64 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
        />
      </div>

      {/* Room Info */}
      <h2 className="text-3xl font-bold mb-4 text-gray-900">{name}</h2>
      <p className="text-lg text-gray-600 mb-4">{description}</p>
      <p className="text-xl font-semibold mb-4">
        Price: <span className="text-blue-500">${price} / night</span>
      </p>

      {/* Features */}
      <div className="mb-4">
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">Features:</h3>
        <ul className="list-disc pl-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="text-lg text-gray-700">
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg font-semibold text-gray-900">
          Rating: <span className="text-yellow-500">{rating}★</span>
        </p>
        <p className="text-lg font-semibold text-gray-900">
          Reviews: <span className="text-gray-700">{reviews.length}</span>
        </p>
      </div>

      {/* Review Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        {reviews.map((review, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
            <p className="font-bold">{user?.displayName}</p>
            <p className="text-yellow-500">{review.rating}★</p>
            
            <p>{review.comment}</p>
            <small className="text-gray-500">
   
              {new Date(review.timestamp).toLocaleString()}
            </small>
          </div>
        ))}
      </div>

      {/* Book Now Button */}
      <button
        className={`w-full font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
          availability
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
        }`}
        onClick={openBookingModal}
        disabled={!availability}
      >
        Book Now
      </button>

      {/* Leave a Review Button */}
      <button
        className="w-full mt-4 bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600"
        onClick={openReviewModal}
      >
        Give Review
      </button>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white w-96 rounded-lg shadow-lg p-6 transform transition-all duration-500 ease-in-out scale-110">
            <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
            <p className="text-gray-700 mb-2">Room Name: {name}</p>
            <p className="text-gray-700 mb-2">Price: ${price} / night</p>
            <p className="text-gray-600 mb-4">Description: {description}</p>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Select Booking Date:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full border border-gray-300 rounded-md p-2"
                minDate={new Date()}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                onClick={handleBooking}
              >
                Confirm Booking
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
                onClick={closeBookingModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white w-96 rounded-lg shadow-lg p-6 transform transition-all duration-500 ease-in-out scale-110">
            <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
            <p className="text-gray-700 mb-2">Username: {username}</p>
            <div className="mb-4">
            <div className="rating">
      <input
        type="radio"
        name="rating-2"
        value="1"
        className="mask mask-star-2 bg-orange-400"
        onChange={handleRatingChange}
      />
      <input
        type="radio"
        name="rating-2"
        value="2"
        className="mask mask-star-2 bg-orange-400"
        onChange={handleRatingChange}
        defaultChecked
      />
      <input
        type="radio"
        name="rating-2"
        value="3"
        className="mask mask-star-2 bg-orange-400"
        onChange={handleRatingChange}
      />
      <input
        type="radio"
        name="rating-2"
        value="4"
        className="mask mask-star-2 bg-orange-400"
        onChange={handleRatingChange}
      />
      <input
        type="radio"
        name="rating-2"
        value="5"
        className="mask mask-star-2 bg-orange-400"
        onChange={handleRatingChange}
      />
    </div>
     </div>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              rows="4"
              placeholder="Write your review here..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            ></textarea>
            <div className="flex items-center justify-between">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                onClick={handleReviewSubmit}
              >
                Submit Review
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
                onClick={closeReviewModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomDetails;
