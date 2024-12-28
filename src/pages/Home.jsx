import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import Map from "../components/Map";
import FeaturedRooms from "../components/Rooms";
import SpecialOffersModal from "../components/SpecialOffersModal";
import TestimonialCarousel from "../components/TestimonialCarousel";
import Questions from "../components/Questions";



function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Show the modal when the component mounts
    setIsModalOpen(true);
  }, []);

  return (
    <div className="container mx-auto p-4 mt-16">

      {isModalOpen && (
        <SpecialOffersModal  onClose={() => setIsModalOpen(false)} />
      )}

      <Banner />
      <Map />
      <FeaturedRooms />
<TestimonialCarousel/>
      <Questions/>


    </div>
  );
}

export default Home;

