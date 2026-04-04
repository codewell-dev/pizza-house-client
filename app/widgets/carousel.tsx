"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { Container } from "@mui/material";

// Slide images should ideally live in your own storage, not on a third-party domain.
// Move these to /public or your CDN before production.
const SLIDES = [
  {
    src: "https://pizzahouse.ua/_next/image?url=https%3A%2F%2Fpizzahouse.ua%2Fmedia%2F6535%2Fconversions%2F%D0%B2%D0%B8%D0%BF%D1%83%D1%81%D0%BA-%D1%81%D0%B0%D0%B9%D1%82--webp.png&w=1920&q=75",
    alt: "Акція 1",
  },
  {
    src: "https://pizzahouse.ua/_next/image?url=https%3A%2F%2Fpizzahouse.ua%2Fmedia%2F5401%2Fconversions%2F%D1%81%D0%B0%D0%B9%D1%82-%D0%B1%D0%BE%D0%BD%D1%83%D1%81%D0%B8-webp.png&w=1920&q=75",
    alt: "Акція 2",
  },
  {
    src: "https://pizzahouse.ua/_next/image?url=https%3A%2F%2Fpizzahouse.ua%2Fmedia%2F6529%2Fconversions%2F%D1%81%D0%B0%D0%B9%D1%82--(2)-webp.png&w=1920&q=75",
    alt: "Акція 3",
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  arrows: true,
  swipeToSlide: true,
  slidesToShow: 1,
  centerMode: true,
  centerPadding: "16px",
  autoplay: true,
  autoplaySpeed: 4000,
  cssEase: "ease-in-out",
  responsive: [
    {
      breakpoint: 768,
      settings: { centerMode: false, centerPadding: "0px" },
    },
  ],
};

export default function Carousel() {
  return (
    <Container maxWidth="xl">
      <Slider {...sliderSettings}>
        {SLIDES.map((slide, i) => (
          <div key={slide.alt} className="px-2">
            <div className="relative w-full h-[180px] sm:h-[250px] md:h-[320px] lg:h-[400px] rounded-2xl overflow-hidden shadow-md">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </Slider>
    </Container>
  );
}
