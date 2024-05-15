import React from "react";
import close from "../assets/cancel.png";
import wallpaper from "../assets/wallpaper.jpg";
import { RotatingLines } from "react-loader-spinner";
import Carousel from "./RoleCarousel";
import { Rating } from "react-simple-star-rating";

const Blog = (props) => {
  return (
    <div
      className="bg-white absolute top right pt12 px24 shadow-darken10 round"
      style={{ width: "430px", marginTop: "100px", marginRight: "12px" }}
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

      <div style={{ width: "382px", maxHeight: "640px", overflowY: "auto" }}>
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
            color: "#00000090",
            marginTop: "12px",
            marginBottom: "12px",
          }}
        >
          {props.responseMessage}
        </p>

        {props.blogFetching && (
          <div
            style={{
              marginTop: "12px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <RotatingLines
              strokeColor="#0000FF"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          </div>
        )}

        {props.blogData !== null && (
          <div>
            <div
              style={{
                width: "100%",
                height: "1px",
                backgroundColor: "#f2f2f2",
                marginBottom: "12px",
              }}
            />
            <img
              src={wallpaper}
              alt="wallpaper"
              style={{
                width: "100%",
                height: "auto",
                cursor: "pointer",
                marginTop: "12px",
                marginBottom: "12px",
                borderRadius: "8px",
              }}
            />
            <h2 className="txt-bold txt-m block">{props.blogData.country}</h2>
            <p
              style={{
                display: "inline-block",
                fontSize: "15px",
                color: "#000000",
                marginTop: "12px",
                marginBottom: "12px",
              }}
            >
              {props.blogData.details.blogDetails.Intro}
            </p>
            <h2 className="txt-bold txt-s block">{"Roles of Interest"}</h2>
            <Carousel items={props.blogData.details.blogDetails.roles} />

            <h2 className="txt-bold txt-s block">{"Tax System"}</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#00000070",
                  fontWeight: 600,
                  marginRight: "8px",
                }}
              >
                Corporate IncomeTax
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#00000070",
                  fontWeight: 500,
                  marginRight: "8px",
                }}
              >
                {props.blogData.details.blogDetails.taxes.CorporateIncomeTax}
              </span>
            </div>

            <h2 className="txt-bold txt-s block">{"Risk Factors"}</h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#00000070",
                  fontWeight: 500,
                  marginRight: "8px",
                }}
              >
                Economic Forces
              </span>
              <Rating
                initialValue={
                  props.blogData.details.blogDetails.riskFactors.economicForces
                }
                readonly={true}
                size={15}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#00000070",
                  fontWeight: 500,
                  marginRight: "8px",
                }}
              >
                Legal Challenges
              </span>
              <Rating
                initialValue={
                  props.blogData.details.blogDetails.riskFactors.legalChallenges
                }
                readonly={true}
                size={15}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#00000070",
                  fontWeight: 500,
                  marginRight: "8px",
                }}
              >
                Political Factors
              </span>
              <Rating
                initialValue={
                  props.blogData.details.blogDetails.riskFactors
                    .politicalFactors
                }
                readonly={true}
                size={15}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#00000070",
                  fontWeight: 500,
                  marginRight: "8px",
                }}
              >
                Natural Disasters
              </span>
              <Rating
                initialValue={
                  props.blogData.details.blogDetails.riskFactors
                    .naturalDisasters
                }
                readonly={true}
                size={15}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#00000070",
                  fontWeight: 500,
                  marginRight: "8px",
                }}
              >
                Cultural Differences
              </span>
              <Rating
                initialValue={
                  props.blogData.details.blogDetails.riskFactors
                    .culturalDifferences
                }
                readonly={true}
                size={15}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#00000070",
                  fontWeight: 500,
                  marginRight: "8px",
                }}
              >
                Competitors
              </span>
              <Rating
                initialValue={
                  props.blogData.details.blogDetails.riskFactors.competitors
                }
                readonly={true}
                size={15}
              />
            </div>

            <div
              style={{
                backgroundColor: "#0000FF",
                borderRadius: "24px",
                height: "36px",
                cursor: "pointer",
                marginTop: "24px",
                marginBottom: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                window.open(
                  "https://www.globalization-partners.com/contact-us/"
                );
              }}
            >
              <span
                style={{
                  fontSize: "15px",
                  color: "#FFFFFF",
                  fontWeight: 500,
                }}
              >
                Contact Us
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
