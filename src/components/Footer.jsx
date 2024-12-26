import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} RoomBooking Inc. All rights reserved.</p>
        <p>
          <a
            href="/terms"
            className="text-blue-400 hover:underline mx-2"
          >
            Terms of Service
          </a>
          |
          <a
            href="/privacy"
            className="text-blue-400 hover:underline mx-2"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
