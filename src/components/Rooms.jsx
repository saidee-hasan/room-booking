import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Fetch rooms based on filters
  const fetchRooms = () => {
    const query = new URLSearchParams({
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
    });

    fetch(
      `https://room-booking-server-ten.vercel.app/rooms?${query.toString()}`
    )
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((error) => console.error("Error fetching rooms:", error));
  };

  useEffect(() => {
    fetchRooms();
  }, []); // Fetch all rooms on component mount

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchRooms();
  };

  return (
    <div className="bg-slate-50 py-12 mt-10">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Featured Rooms
      </h2>

      {/* Filter Form */}
      <div className="max-w-6xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-md">
        <form
          onSubmit={handleFilterSubmit}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full sm:w-1/3"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full sm:w-1/3"
          />
          <button
            type="submit"
            className="bg-lime-700 text-white py-2 px-4 rounded-md hover:bg-lime-900 transition duration-300 w-full sm:w-auto"
          >
            Apply Filter
          </button>
        </form>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={room.images}
              alt={room.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {room.name}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{room.description}</p>
              <p className="text-gray-800 font-bold mt-4">${room.price}</p>
              <Link to={`/rooms/${room._id}`}>
                <button className="mt-4 bg-lime-700 text-white py-2 px-4 rounded-md hover:bg-lime-900 transition duration-300 w-full">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
