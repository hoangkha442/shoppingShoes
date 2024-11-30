import { AiOutlineCar, AiOutlineReload, AiOutlineGift } from 'react-icons/ai'; // Import icons
import React from "react";
import Slider from "react-slick";

function SlideSlick() {
  const settings = {
    slidesToShow: 3, // Default for larger screens
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640, 
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="slider-container bg-[#f7f7f7] py-7">
      <Slider {...settings} className="mx-auto w-[90%] lg:w-[80%]">
        <div>
          <div className="flex items-center justify-center space-x-4 w-full">
            <AiOutlineCar size={24} />
            <h3 className="text-[#222] text-sm sm:text-base font-bold text-center">FREE INTERNATIONAL DELIVERY TO YOU</h3>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center space-x-4 w-full">
            <AiOutlineReload size={24} />
            <h3 className="text-[#222] text-sm sm:text-base font-bold text-center">30-DAY FREE RETURN</h3>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center space-x-4 w-full">
            <AiOutlineGift size={24} />
            <h3 className="text-[#222] text-sm sm:text-base font-bold text-center">GET THE LATEST EXCLUSIVES AND OFFERS</h3>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default SlideSlick;
