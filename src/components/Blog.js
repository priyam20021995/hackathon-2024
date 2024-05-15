import React from "react";
import close from "../assets/cancel.png";

const Blog = (props) => {
  return (
    <div
      className="bg-white absolute top right py12 px24 shadow-darken10 round"
      style={{ width: "430px", marginTop: "120px", marginRight: "12px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="txt-bold txt-m block">{"Results"}</h2>
        <img
          src={close}
          alt="close"
          onClick={props.onClose}
          style={{ width: "18px", height: "18px", cursor: "pointer" }}
        />
      </div>
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#f2f2f2",
          marginTop: "12px",
        }}
      />

      <div style={{ width: "382px", maxHeight: "600px", overflowY: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "12px",
          }}
        >
          <p
            style={{
              display: "inline-block",
              fontSize: "12px",
              color: "#00000060",
            }}
          >
            {"Profile Role"}
          </p>
          <p
            style={{
              display: "inline-block",
              fontSize: "13px",
              color: "#00000090",
            }}
          >
            {props.role}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              display: "inline-block",
              fontSize: "12px",
              color: "#00000060",
            }}
          >
            {"Technology"}
          </p>
          <p
            style={{
              display: "inline-block",
              fontSize: "13px",
              color: "#00000090",
            }}
          >
            {props.tech}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              display: "inline-block",
              fontSize: "12px",
              color: "#00000060",
            }}
          >
            {"Years of Experience"}
          </p>
          <p
            style={{
              display: "inline-block",
              fontSize: "13px",
              color: "#00000090",
            }}
          >
            {props.years}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              display: "inline-block",
              fontSize: "12px",
              color: "#00000060",
            }}
          >
            {"Budget($)"}
          </p>
          <p
            style={{
              display: "inline-block",
              fontSize: "13px",
              color: "#00000090",
            }}
          >
            {props.budget}
          </p>
        </div>
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#f2f2f2",
            marginTop: "12px",
          }}
        />

        <p
          style={{
            display: "inline-block",
            fontSize: "15px",
            color: "#000000",
            marginTop: "12px",
          }}
        >
          {props.responseMessage}
        </p>
      </div>
    </div>
  );
};

export default Blog;
