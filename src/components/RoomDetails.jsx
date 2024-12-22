import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function RoomDetails() {
  const data = useLoaderData(); // Fetch room data from the loader
 

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availability, setAvailability] = useState(initialAvailability);

  const openModal = () => {
    if (!availability) {
      alert('This room is currently unavailable for booking.');
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDate(null);
    setIsModalOpen(false);
  };

  // Function to handle booking
  const handleBooking = async () => {
    if (!selectedDate) {
      alert('Please select a booking date.');
      return;
    }

    // Prepare the booking data
    const bookingData = {
      roomName: name,
      roomDescription: description,
      roomPrice: price,
      selectedDate: selectedDate.toDateString(),
      roomId: data.id, // Assuming each room has a unique id
    };

    try {
      // Send booking data to the backend (adjust the API endpoint as needed)
      const response = await fetch('http://localhost:5000/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Mark room as unavailable after booking
        setAvailability(false);
        closeModal();
        alert(`Room "${name}" booked successfully for ${selectedDate.toDateString()}!`);
      } else {
        alert('Booking failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error booking room:', error);
      alert('An error occurred while processing your booking. Please try again.');
    }
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
          Reviews: <span className="text-gray-700">{reviewsCount}</span>
        </p>
      </div>

      {/* Availability */}
      <div className="mb-6">
        {availability ? (
          <p className="text-green-500 font-semibold text-lg">
            Available for booking
          </p>
        ) : (
          <p className="text-red-500 font-semibold text-lg">
            Currently unavailable
          </p>
        )}
      </div>

      {/* Book Now Button */}
      <button
        className={`w-full font-bold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
          availability
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-400 text-gray-700 cursor-not-allowed'
        }`}
        onClick={openModal}
        disabled={!availability}
      >
        Book Now
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white w-96 rounded-lg shadow-lg p-6 transform transition-all duration-500 ease-in-out scale-110">
            <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
            <p className="text-gray-700 mb-2"><span className='font-semibold'>Room Name:</span> {name}</p>
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
                onClick={closeModal}
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
