import React from "react";

function SpecialOffersModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 sm:w-96 rounded-lg shadow-lg overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-lime-700 text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">Special Offers & Promotions</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 focus:outline-none text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <img
            src="https://via.placeholder.com/400x200" // Replace with your offer image
            alt="Special Offer"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-700">
            Enjoy up to <strong>50% off</strong> on selected rooms! Book now and
            experience the ultimate luxury.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-lime-700 text-white py-2 px-4 rounded-md hover:bg-lime-900 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default SpecialOffersModal;
