import React from 'react';

function FeaturedRooms() {
  const rooms = [
    {
      id: 1,
      name: 'Deluxe Suite',
      image: 'https://via.placeholder.com/300x200', // Replace with actual image URL
      description: 'Experience luxury in our spacious deluxe suite with premium amenities.',
      price: '$200/night',
    },
    {
      id: 2,
      name: 'Family Room',
      image: 'https://via.placeholder.com/300x200',
      description: 'Perfect for families, this room features ample space and comfort.',
      price: '$150/night',
    },
    {
      id: 3,
      name: 'Ocean View Room',
      image: 'https://via.placeholder.com/300x200',
      description: 'Wake up to breathtaking ocean views in this cozy room.',
      price: '$180/night',
    },
    {
      id: 4,
      name: 'Standard Room',
      image: 'https://via.placeholder.com/300x200',
      description: 'Affordable comfort with all the essential amenities you need.',
      price: '$100/night',
    },
    {
      id: 5,
      name: 'Executive Suite',
      image: 'https://via.placeholder.com/300x200',
      description: 'Enjoy top-notch luxury and service in our executive suite.',
      price: '$250/night',
    },
    {
      id: 6,
      name: 'Honeymoon Suite',
      image: 'https://via.placeholder.com/300x200',
      description: 'A romantic escape with exclusive amenities for couples.',
      price: '$300/night',
    },
  ];

  return (
    <div className="bg-slate-50 py-12">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Featured Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{room.name}</h3>
              <p className="text-gray-600 text-sm mt-2">{room.description}</p>
              <p className="text-gray-800 font-bold mt-4">{room.price}</p>
              <button
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 w-full"
                onClick={() => window.location.href = `/room/${room.id}`} // Redirect to room detail page
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedRooms;
