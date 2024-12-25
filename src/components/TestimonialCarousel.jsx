import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TestimonialCarousel() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/review")
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="bg-slate-50 py-12">
    <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
      What Our Customers Say
    </h2>
  
    {reviews.length > 0 ? (
      <div className="max-w-4xl mx-auto">
        <Slider {...settings}>
          {reviews.map((review) => (
            <div
              key={review._id}
              className="p-6 h-80 bg-white text-center shadow-md rounded-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
            >
              {/* User Image */}
              <img
                src={review.images || "https://via.placeholder.com/150"}
                alt={`${review.userName}'s review`}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
  
              {/* Review Comment */}
              <p className="text-gray-700 text-lg italic mb-4">
                "{review.comment}"
              </p>
  
              {/* User Name and Rating */}
              <div>
                <span className="text-gray-800 font-bold text-lg block">
                  {review.userName}
                </span>
                <div className="text-yellow-500">
                  {"★".repeat(review.rating)}{" "}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
  
              {/* Timestamp */}
              <p className="text-sm text-gray-500 mt-2">
                {new Date(review.timestamp).toLocaleDateString()}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    ) : (
      <p className="text-center text-gray-500">No reviews available yet.</p>
    )}
  </div>
  
  );
}

export default TestimonialCarousel;
