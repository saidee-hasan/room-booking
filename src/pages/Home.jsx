import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Map from "../components/Map";
import FeaturedRooms from "../components/Rooms";
import SpecialOffersModal from "../components/SpecialOffersModal";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Show the modal when the component mounts
    setIsModalOpen(true);
  }, []);

  return (
    <div className="container mx-auto">
      {/* Special Offers Modal */}
      {isModalOpen && (
        <SpecialOffersModal onClose={() => setIsModalOpen(false)} />
      )}

      <Banner />
      <Map />
      <FeaturedRooms />
    </div>
  );
}

export default Home;

