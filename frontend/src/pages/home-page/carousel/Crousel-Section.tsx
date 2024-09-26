import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sn from "@/assets/sliderone.png";
import sm from '@/assets/slidertwo.png';

const images = [sn, sm];

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    fade: true,  // Added fade for smooth transitions
    arrows: false,
    pauseOnHover: false,
    customPaging: i => (
      <div className="w-3 h-3  rounded-full cursor-pointer"></div>
    ),
    dotsClass: "slick-dots custom-dots",  // Custom dots styling
  };

  return (
    <div className="relative w-full mx-auto  rounded-lg overflow-hidden shadow-2xl">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200 opacity-60 blur-lg z-0"></div>

      {/* Image Slider */}
      <div className="relative z-10">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={image}
                alt={`Slide ${index}`}
                className="rounded-lg shadow-2xl border-4 border-white transition-all duration-500 
                object-cover w-full"
                style={{ maxHeight: "500px" }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Floating Text Overlay (Optional - for more visual appeal) */}
      <div className="absolute bottom-8 left-8 bg-white bg-opacity-50 p-6 rounded-xl shadow-lg backdrop-blur-lg">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 animate-fadeIn">
          Divine Offerings
        </h1>
        <p className="text-lg text-gray-800 font-medium mt-2">
          Experience a journey beyond the ordinary.
        </p>
      </div>
    </div>
  );
};

export default ImageSlider;
