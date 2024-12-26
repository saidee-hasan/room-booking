import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
    {
        id: 1,
        image: 'https://img.freepik.com/free-photo/yellow-living-room-interior-with-free-space_43614-934.jpg',
        title: 'Unlock a World of Languages',
        description: 'Join our community and start your language journey today!',
        cta: 'Explore Rooms',
        link: '/rooms' // Updated link to redirect to Rooms page
    },
    {
        id: 2,
        image: 'https://img.freepik.com/free-photo/sofa-living-room-with-copy-space_43614-869.jpg',
        title: 'Learn Anywhere, Anytime',
        description: 'Practice your skills on the go with our mobile app.',
        cta: 'Explore Rooms',
        link: '/rooms' // Updated link to redirect to Rooms page
    },
];

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative w-full h-64 md:h-96 overflow-hidden">
            <AnimatePresence>
                {slides.map((slide, index) => (
                    index === currentSlide && (
                        <motion.div
                            key={slide.id}
                            className="absolute inset-0 rounded-md bg-slate-300"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="absolute md:p-12 p-2 inset-0 flex flex-col justify-center items-start p-8">
                                <h2 className="text-2xl md:text-4xl text-black font-bold">{slide.title}</h2>
                                <p className="mt-4 text-black">{slide.description}</p>
                                <a href={slide.link} className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                    {slide.cta}
                                </a>
                            </div>
                            <div className="justify-end items-end text-center">
                                <div className="flex justify-end">
                                    <img src={slide.image} className='' alt="Description" />
                                </div>                   
                            </div>
                        </motion.div>
                    )
                ))}
            </AnimatePresence>

            <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-lg hover:bg-gray-200">
                &#10094;
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 shadow-lg hover:bg-gray-200">
                &#10095;
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 w-2 rounded-full ${currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Banner;