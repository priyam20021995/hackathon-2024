import React from "react";

const Legend = (props) => {

  const title = props.uiState === 0 ? "GP Presence" : "Results"
  const description =
    props.uiState === 0 ? "Countries we are operational in" : "Priority distribution";

   const renderPriority = (color, i) => {
     return (
       <div key={i} className="txt-s">
         <span
           className="mr6 round-full w12 h12 inline-block align-middle"
           style={{ backgroundColor: color }}
         />
         <span>{`Priority ${i}`}</span>
       </div>
     );
   };

  return (
    <>
      <div className="bg-white absolute bottom left ml12 mb12 py12 px12 shadow-darken10 round z1 wmax264">
        <div className="mb6">
          <h2 className="txt-bold txt-s block">{title}</h2>
          <p className="txt-s color-gray">{description}</p>
        </div>

        {props.uiState === 0 ? (
          <div className="txt-s">
            <span
              className="mr6 round-full w12 h12 inline-block align-middle"
              style={{ backgroundColor: "#0000FF" }}
            />
            <span>{"Operational"}</span>
          </div>
        ) : (
          <div>{props.colorList.map(renderPriority)}</div>
        )}
      </div>
    </>
  );
};

export default Legend;
