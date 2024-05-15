import React from "react";

const Header = (props) => {
  return (
    <div>
      <div
        class="absolute top"
        style={{
          height: "36px",
          width: "100%",
          backgroundColor: "#3333FF",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: 13, color: "#FFFFFF" }}>
          The best gets better! Don’t miss the latest updates to our G-P
          Meridian Core and Prime EOR packages. Learn more
        </span>
      </div>

      <div
        class="absolute top border-black/5"
        style={{
          marginTop: "36px",
          backgroundColor: "#f9f9f9",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <img
          src={props.gpLogo}
          alt="logo"
          style={{
            width: "80px",
            height: "35px",
            cursor: "pointer",
            marginLeft: "12px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />
        <span
          class="text-grey-5 ml24"
          style={{ fontSize: 15, fontWeight: 400 }}
        >
          Spartans
        </span>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginRight: "12px",
          }}
        >
          <span
            class="text-grey-5 ml24"
            style={{ fontSize: 13, fontWeight: 400 }}
          >
            +1(888)-855-5328
          </span>
          <span
            class="text-grey-5 ml24"
            style={{ fontSize: 13, fontWeight: 400 }}
          >
            Contact Us
          </span>
          <span
            class="text-grey-5 ml24"
            style={{ fontSize: 13, fontWeight: 400 }}
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
