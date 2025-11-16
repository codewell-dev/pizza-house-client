"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true, 
    swipeToSlide: true,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "16px",
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
  };

  const slides = [
    "https://pizzahouse.ua/_next/image?url=https%3A%2F%2Fpizzahouse.ua%2Fmedia%2F6535%2Fconversions%2F%D0%B2%D0%B8%D0%BF%D1%83%D1%81%D0%BA-%D1%81%D0%B0%D0%B9%D1%82--webp.png&w=1920&q=75",
    "https://pizzahouse.ua/_next/image?url=https%3A%2F%2Fpizzahouse.ua%2Fmedia%2F5401%2Fconversions%2F%D1%81%D0%B0%D0%B9%D1%82-%D0%B1%D0%BE%D0%BD%D1%83%D1%81%D0%B8-webp.png&w=1920&q=75",
    "https://pizzahouse.ua/_next/image?url=https%3A%2F%2Fpizzahouse.ua%2Fmedia%2F6529%2Fconversions%2F%D1%81%D0%B0%D0%B9%D1%82--(2)-webp.png&w=1920&q=75",
  ];

  return (
    <div className="w-full mt-6 overflow-hidden">
      <Slider {...settings}>
        {slides.map((src, i) => (
          <div key={i} className="px-2">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <Image
                src={src}
                alt={`slide-${i}`}
                width={800}
                height={400}
                className="w-full h-auto object-cover rounded-2xl"
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
