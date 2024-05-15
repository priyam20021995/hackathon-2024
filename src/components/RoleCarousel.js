import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const Cards = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 6000,
    };

    return (
      <Slider
        {...settings}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="carouselCard">
            <span
              style={{
                fontSize: "13px",
                color: "#00000095",
                fontWeight: 600,
              }}
            >
              {`# Around ${item.NumberOfEmployees} ${item.Title}`}
            </span>
            <p
              style={{
                fontSize: "13px",
                color: "#00000095",
                fontWeight: 600,
              }}
            >
              {`# ${item.SkillsetInsights}`}
            </p>
            <span
              style={{
                fontSize: "13px",
                color: "#00000095",
                fontWeight: 600,
              }}
            >
              {`# Minimum Salary: ${item.SalaryRange.Minimum}`}
            </span>
            <p
              style={{
                fontSize: "13px",
                color: "#00000095",
                fontWeight: 600,
              }}
            >
              {`# Maximum Salary: ${item.SalaryRange.Maximum}`}
            </p>
            <span
              style={{
                fontSize: "13px",
                color: "#00000095",
                fontWeight: 600,
              }}
            >
              {`# Average Salary: ${item.SalaryRange.Average}`}
            </span>
          </div>
        ))}
      </Slider>
    );
  };

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        marginTop: "12px",
        display: "flex",
        alignItems: "center",
        marginBottom: "32px",
      }}
    >
      {currentIndex !== 0 && (
        <div
          onClick={prevSlide}
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "12px",
            backgroundColor: "#00000050",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <p>{"<"}</p>
        </div>
      )}
      {Cards()}
      {currentIndex !== items.length - 1 && (
        <div
          onClick={nextSlide}
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "12px",
            backgroundColor: "#00000050",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <p>{">"}</p>
        </div>
      )}
    </div>
  );
};

export default Carousel;
