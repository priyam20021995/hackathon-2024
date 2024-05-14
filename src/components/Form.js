import React from "react";
import { RotatingLines } from "react-loader-spinner";

const Form = (props) => {
  return (
    <div
      className="bg-white absolute top right py24 px24 shadow-darken10 round"
      style={{ maxWidth: "328px", marginTop: "120px", marginRight: "12px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="txt-bold txt-m block">
          Fill out the form to find the right talent around the world
        </h2>
      </div>

      <div style={{ marginTop: "26px" }}>
        <span style={{ fontSize: "12px", color: "#00000080" }}>
          Profile Role
        </span>
      </div>

      <div style={{ marginTop: "4px" }}>
        <input
          id="role_id"
          name="role"
          type="text"
          inputmode="text"
          value={props.role}
          onInput={(e) => props.setRole(e.target.value)}
          style={{
            width: "280px",
            paddingLeft: "12px",
            paddingTop: "8px",
            paddingBottom: "8px",
            border: "1px solid #E9EAEC",
            fontSize: "15px",
            backgroundColor: "#F6F8F6",
            borderRadius: "6px",
          }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <span style={{ fontSize: "12px", color: "#00000080" }}>
          Technologies
        </span>
      </div>

      <div style={{ marginTop: "4px" }}>
        <input
          id="tech_id"
          name="tech"
          type="text"
          inputmode="text"
          value={props.tech}
          onInput={(e) => props.setTech(e.target.value)}
          style={{
            width: "280px",
            paddingLeft: "12px",
            paddingTop: "8px",
            paddingBottom: "8px",
            border: "1px solid #E9EAEC",
            fontSize: "15px",
            backgroundColor: "#F6F8F6",
            borderRadius: "6px",
          }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <span style={{ fontSize: "12px", color: "#00000080" }}>
          Years of Experience
        </span>
      </div>

      <div style={{ marginTop: "4px" }}>
        <input
          id="year_id"
          name="year"
          type="text"
          inputmode="text"
          value={props.years}
          onInput={(e) => props.setYears(e.target.value)}
          style={{
            width: "280px",
            paddingLeft: "12px",
            paddingTop: "8px",
            paddingBottom: "8px",
            border: "1px solid #E9EAEC",
            fontSize: "15px",
            backgroundColor: "#F6F8F6",
            borderRadius: "6px",
          }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <span style={{ fontSize: "12px", color: "#00000080" }}>Budget($)</span>
      </div>

      <div style={{ marginTop: "4px" }}>
        <input
          id="budget_id"
          name="budget"
          type="text"
          inputmode="text"
          value={props.budget}
          onInput={(e) => props.setBudget(e.target.value)}
          style={{
            width: "280px",
            paddingLeft: "12px",
            paddingTop: "8px",
            paddingBottom: "8px",
            border: "1px solid #E9EAEC",
            fontSize: "15px",
            backgroundColor: "#F6F8F6",
            borderRadius: "6px",
          }}
        />
      </div>

      <div
        style={{
          backgroundColor: "#0000FF",
          borderRadius: "24px",
          height: "48px",
          cursor: "pointer",
          marginTop: "36px",
          marginBottom: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={props.handleSubmit}
      >
        {props.submitting ? (
          <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="38"
            visible={true}
          />
        ) : (
          <span style={{ fontSize: "15px", color: "#FFFFFF", fontWeight: 500 }}>
            Submit
          </span>
        )}
      </div>
    </div>
  );
};

export default Form;
