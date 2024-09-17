// import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import images from "../carousel/Carousel.json"
import sn from "@/assets/sliderone.png"
import sm from '@/assets/slidertwo.png';


const images = [
   sn,
   sm
];

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <div className="w-full mx-auto ">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={image}
              alt={`Slide ${index}`}
              className="rounded-lg shadow-lg animate-in w-full object-fill"
              style={{ maxHeight: "500px" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
