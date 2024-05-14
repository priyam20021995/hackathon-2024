import React from "react";

const Legend = (props) => {
  return (
    <>
      <div className="bg-white absolute bottom left ml12 mb12 py12 px12 shadow-darken10 round z1 wmax264">
        <div className="mb6">
          <h2 className="txt-bold txt-s block">{props.active.name}</h2>
          <p className="txt-s color-gray">{props.active.description}</p>
        </div>
        <div className="txt-s">
          <span
            className="mr6 round-full w12 h12 inline-block align-middle"
            style={{ backgroundColor: "#0000FF" }}
          />
          <span>{"Operational"}</span>
        </div>
        <div className="txt-s">
          <span
            className="mr6 round-full w12 h12 inline-block align-middle"
            style={{ backgroundColor: "#98FB98" }}
          />
          <span>{"Non Operational"}</span>
        </div>
      </div>
    </>
  );
};

export default Legend;
