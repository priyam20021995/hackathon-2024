import React, { useState } from "react";

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

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        marginTop: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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

      <div style={{ overflow: "hidden", width: "100%", height: "200px" }}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              transform: `translateX(-${currentIndex * 200}px)`,
              display: "inline-block",
            }}
          >
            <div
              style={{
                width: "200px",
                height: "200px",
                backgroundColor: "#000000",
              }}
            />
          </div>
        ))}
      </div>
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
