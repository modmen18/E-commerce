import React from "react";
import Slider from "react-slick";
import slide1 from "../../assets/slider-image-1.jpeg";
import slide2 from "../../assets/slider-image-2.jpeg";
import slide3 from "../../assets/slider-image-3.jpeg";
import slide4 from "../../assets/grocery-banner.png";
import slide5 from "../../assets/grocery-banner-2.jpeg";

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 770,
      settings: {
        dots: false,
      },
    },
  ],
};

export default function MainSlider() {
  return (
    <div className="grid grid-cols-[2fr_1fr] mt-12 px-4 max-w-7xl mx-auto">
      <Slider {...settings} className="overflow-hidden">
        <div className="relative w-full h-[400px]">
          <img src={slide1} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-3xl md:text-4xl font-bold bg-yellow-300 mr-72 px-3 py-2 rounded-md shadow">
              عروض لا تُفوّت
            </h2>
          </div>
        </div>

        <div className="relative w-full h-[400px]">
          <img src={slide2} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-3xl md:text-4xl font-bold bg-green-700 mr-64 px-3 py-2 rounded-md shadow">
              طعام طازج دائماً
            </h2>
          </div>
        </div>

        <div className="relative w-full h-[400px]">
          <img src={slide3} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-xl md:text-2xl font-bold bg-pink-800 mr-64 px-3 py-2 rounded-md shadow">
              هدية لذيذة تُعَبِّرُ عَنِ الحُبِّ
            </h2>
          </div>
        </div>
      </Slider>

      <div className="flex flex-col gap-0.5">
        <div className="relative w-full h-[200px]">
          <img src={slide5} className="w-full h-full object-cover" alt="" />
          <div className="absolute bottom-20 left-10 bg-gradient-to-r from-amber-300 via-amber-300 to-yellow-500 text-white text-xs px-2 py-1 rounded shadow-md">
            طازجة من مخابزنا مباشرةً إلى طاولتكم
          </div>
        </div>

        <div className="relative w-full h-[200px]">
          <img src={slide4} className="w-full h-full object-cover" alt="" />
          <div className="absolute bottom-32 left-2 bg-gradient-to-r from-green-400 via-lime-400 to-green-600 text-white text-xs px-2 py-1 rounded shadow-md">
            جسمك بيطلب اهتمامك 🎯
          </div>
        </div>
      </div>
    </div>
  );
}
