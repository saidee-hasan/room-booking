import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix the default icon issue for Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function Map() {
  const position = [23.8103, 90.4125]; // Example coordinates for Dhaka, Bangladesh

  return (
    <div className="">        <h1 className='text-center text-xl font-bold'>Googles Map</h1>
    <div className="md:flex bg-slate-50 p-4 gap-6">

      {/* Informational Section */}
      <div className="p-6 bg-gray-100 rounded-lg shadow-md flex-1">
        <h3 className="font-sans text-2xl font-semibold text-gray-800 mb-4">
          We are pleased to inform you that you have successfully passed the first round of the selection process! 🎉
          <br />
          Your application and skills have impressed us, and we are excited to move forward with you in the next stages.
        </h3>
        <button className="btn bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
          Room
        </button>
      </div>

      {/* Map Section */}
      <div className="w-full h-96 md:h-auto  z-0 flex-1 rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full md:h-96"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              The hotel's location. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div></div>
  );
}

export default Map;
