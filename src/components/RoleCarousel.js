import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ items }) => {
  
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
      {Cards()}
    </div>
  );
};

export default Carousel;
