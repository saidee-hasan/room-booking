import React, { useState, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAuth from '../hooks/useAuth';
import Review from './Review';

function RoomDetails() {
  const { user } = useAuth();
  const data = useLoaderData();
const {id} = useParams();
  const [bookingData, setBookingData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');

  const {
    _id: roomId,
    name,
    description,
    price,
    features,
    images,
    rating,
    availability: initialAvailability,
  } = data;

  const [availability, setAvailability] = useState(initialAvailability);

  const fetchBookingData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/apply?email=${user?.email}`);
      const result = await res.json();
      setBookingData(result);
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
  };



  useEffect(() => {
    fetchBookingData();
  }, [user?.email]);

  

  const [showBtn,setShowBtn] = useState([]);
  useEffect(()=>{
    fetch(`http://localhost:5000/review?roomId=${id}`)
    .then(res=>res.json())
    .then(data=>{
   setReviews(data)
    })

    fetch(`http://localhost:5000/apply?booking_id=${id}`)
    .then(res=>res.json())
    .then(data=>{
   setShowBtn(data)
    })

  },[id])



  

  const openBookingModal = () => {
    if (!availability) {
      alert('This room is currently unavailable for booking.');
      return;
    }
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setSelectedDate(null);
    setIsBookingModalOpen(false);
  };

  const handleBooking = async () => {
    if (!selectedDate) {
      alert('Please select a booking date.');
      return;
    }

    const bookingDetails = {
      roomName: name,
      roomDescription: description,
      roomPrice: price,
      selectedDate: selectedDate.toDateString(),
      roomId,
      email: user?.email,
      booking_id: roomId,
    };

    try {
      const res = await fetch('http://localhost:5000/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      if (res.ok) {
        const result = await res.json();
        console.log(result);
        setAvailability(false);
        closeBookingModal();
        alert(`Room "${name}" booked successfully for ${selectedDate.toDateString()}!`);
      } else {
        const errorData = await res.json();
        alert(`Booking failed: ${errorData.message || 'Please try again later.'}`);
      }
    } catch (error) {
      console.error('Error booking room:', error);
      alert('An error occurred while booking. Please try again.');
    }
  };

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setSelectedRating(0);
    setReviewComment('');
    setIsReviewModalOpen(false);
  };

  const handleReviewSubmit = async () => {
    if (!selectedRating || !reviewComment.trim()) {
      alert('Please provide both a rating and a comment.');
      return;
    }

    const reviewDetails = {
      roomId,
      userName: user?.displayName,
      rating: selectedRating,
      comment: reviewComment,
      email: user?.email,
      timestamp :  new Date()
    };

    try {
      const res = await fetch('http://localhost:5000/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewDetails),
      });

      if (res.ok) {
        setReviews((prev) => [...prev, reviewDetails]);
        closeReviewModal(false);
        alert('Review submitted successfully!');
      } else {
        alert('Failed to submit review. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An error occurred while submitting your review. Please try again.');
    }
  };
  console.log(reviews)

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white text-gray-800 shadow-lg rounded-lg">
      <div className="mb-6">
        <img
          src={images}
          alt={name}
          className="w-full h-64 object-cover rounded-lg shadow-md transition-transform transform hover:scale-105"
        />
      </div>

      <h2 className="text-3xl font-bold mb-4 text-gray-900">{name}</h2>
      <p className="text-lg text-gray-600 mb-4">{description}</p>
      <p className="text-xl font-semibold mb-4">
        Price: <span className="text-blue-500">${price} / night</span>
      </p>

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

      <div className="flex items-center justify-between mb-6">
        <p className="text-lg font-semibold text-gray-900">
          Rating: <span className="text-yellow-500">{rating}★</span>
        </p>
        <p className="text-lg font-semibold text-gray-900">
          Reviews: <span className="text-gray-700">{reviews.length}</span>
        </p>
      </div>

      <button
        className={`w-full font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
          showBtn.length <= 0 
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
        }`}
        onClick={openBookingModal}
        disabled={!availability}
      >
        Book Now
      </button>

      {
        showBtn.length > 0?  <button
        className="w-full mt-4 bg-green-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-600"
        onClick={openReviewModal}
      >
        Give Review
      </button>:''
      }




    

      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
            <p className="text-gray-700 mb-2">Room Name: {name}</p>
            <p className="text-gray-700 mb-2">Price: ${price} / night</p>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="w-full border border-gray-300 rounded-md p-2"
              minDate={new Date()}
            />
            <div className="flex items-center justify-between mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={handleBooking}
              >
                Confirm Booking
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                onClick={closeBookingModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
            <div className="mb-4">
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <input
                    key={star}
                    type="radio"
                    name="rating"
                    value={star}
                    className="mask mask-star-2 bg-orange-400"
                    defaultValue={2}
                    onChange={() => setSelectedRating(star)}
                  />
                ))}
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
                className="bg-green-500 text-white py-2 px-4 rounded-md"
                onClick={handleReviewSubmit}
              >
                Submit Review
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                onClick={closeReviewModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
        <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        {reviews.map((review, index) => (
          <Review key={index} review={review} />
        ))}
      </div>
    </div>
  );
}

export default RoomDetails;
