import React from 'react';

function Questions() {
  const faqs = [
    {
      question: "What is the cancellation policy?",
      answer: "You can cancel your booking up to 24 hours before your check-in date for a full refund."
    },
    {
      question: "How do I change my booking?",
      answer: "To change your booking, please contact our customer service or use the 'Manage Booking' section on our website."
    },
    {
      question: "What amenities are included in the room?",
      answer: "All rooms come with free Wi-Fi, air conditioning, a flat-screen TV, and complimentary toiletries."
    },
    {
      question: "Is breakfast included in my stay?",
      answer: "Breakfast is included in all room rates unless specified otherwise."
    },
    {
      question: "What time is check-in and check-out?",
      answer: "Check-in is at 3 PM and check-out is at 11 AM."
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Questions;