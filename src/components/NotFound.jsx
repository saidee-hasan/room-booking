import React from 'react';
import Image from "../assets/404.gif";

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full text-center">
        <img src={Image} alt="404 Not Found" className="w-full h-auto mb-4" />
        <h1 className="text-4xl font-bold text-red-500">404 - Not Found!</h1>
        <p className="mt-4 text-gray-600">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
          Go Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;