import React from 'react';

function About() {
  return (
    <div className="container mx-auto py-10 mt-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to <strong>RoomBooking Inc.</strong>! We are committed to providing a seamless and efficient room booking experience. 
        Whether you need a space for meetings, events, or travel, we aim to make your booking process as easy as possible.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Our platform offers a wide range of rooms across different locations, catering to your unique needs and preferences. 
        With user-friendly features and secure transactions, we strive to ensure customer satisfaction at every step.
      </p>
      <p className="text-lg text-gray-700">
        Thank you for choosing RoomBooking Inc. We look forward to serving you and making your room booking experience exceptional!
      </p>
    </div>
  );
}

export default About;
