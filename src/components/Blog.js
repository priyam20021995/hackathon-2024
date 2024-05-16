import React, { useEffect, useRef } from "react";
import close from "../assets/cancel.png";
import wallpaper from "../assets/wallpaper.jpg";
import { RotatingLines } from "react-loader-spinner";
import Carousel from "./RoleCarousel";
import { Rating } from "react-simple-star-rating";
import sendIcon from "../assets/send-icon.png";

const Blog = (props) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (props.chatOn) {
      scrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.chatOn, props.chatList]);

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
            fontWeight: 500,
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
                fontWeight: 500,
              }}
            >
              {props.blogData.details.blogDetails.Intro}
            </p>
            <h2 className="txt-bold txt-m block">{"Roles of Interest"}</h2>
            <Carousel items={props.blogData.details.blogDetails.roles} />

            <h2 className="txt-bold txt-m block">{"Employment Terms"}</h2>

            <div
              style={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "4px",
                paddingBottom: "4px",
                display: "flex",
                flexDirection: "column",
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000095",
                  fontWeight: 600,
                }}
              >
                Probation Period
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000070",
                  fontWeight: 500,
                  lineHeight: "14px",
                  marginBottom: "6px",
                  marginTop: "2px",
                }}
              >
                {
                  props.blogData.details.blogDetails.employmentTerms
                    .probationPeriod
                }
              </span>
            </div>

            <div
              style={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "4px",
                paddingBottom: "4px",
                display: "flex",
                flexDirection: "column",
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000095",
                  fontWeight: 600,
                }}
              >
                Working Hours
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000070",
                  fontWeight: 500,
                  lineHeight: "14px",
                  marginBottom: "6px",
                  marginTop: "2px",
                }}
              >
                {
                  props.blogData.details.blogDetails.employmentTerms
                    .workingHours
                }
              </span>
            </div>

            <div
              style={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "4px",
                paddingBottom: "4px",
                display: "flex",
                flexDirection: "column",
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000095",
                  fontWeight: 600,
                }}
              >
                Contracts Types
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000070",
                  fontWeight: 500,
                  lineHeight: "14px",
                  marginBottom: "6px",
                  marginTop: "2px",
                }}
              >
                {props.blogData.details.blogDetails.employmentTerms.typesOfContracts.join(
                  ", "
                )}
              </span>
            </div>

            <div
              style={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "4px",
                paddingBottom: "4px",
                display: "flex",
                flexDirection: "column",
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000095",
                  fontWeight: 600,
                }}
              >
                Leave Types
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000070",
                  fontWeight: 500,
                  lineHeight: "14px",
                  marginBottom: "6px",
                  marginTop: "2px",
                }}
              >
                {props.blogData.details.blogDetails.employmentTerms.typesOfLeaves.join(
                  ", "
                )}
              </span>
            </div>

            <div
              style={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "4px",
                paddingBottom: "4px",
                display: "flex",
                flexDirection: "column",
                marginTop: "8px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000095",
                  fontWeight: 600,
                }}
              >
                Termination
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000070",
                  fontWeight: 500,
                  lineHeight: "14px",
                  marginBottom: "6px",
                  marginTop: "2px",
                }}
              >
                {`During Probation: ${props.blogData.details.blogDetails.employmentTerms.termination.duringProbation}`}
              </span>

              <span
                style={{
                  fontSize: "13px",
                  color: "#00000070",
                  fontWeight: 500,
                  lineHeight: "14px",
                  marginBottom: "6px",
                  marginTop: "2px",
                }}
              >
                {`After Probation: ${props.blogData.details.blogDetails.employmentTerms.termination.afterProbation}`}
              </span>
            </div>

            <h2 className="txt-bold txt-m block">{"Tax System"}</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#000000",
                  fontWeight: 300,
                  marginRight: "8px",
                }}
              >
                Corporate Income Tax
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#00000070",
                  fontWeight: 500,
                  width: "60%",
                  textAlign: "end",
                }}
              >
                {props.blogData.details.blogDetails.taxes.CorporateIncomeTax}
              </span>
            </div>
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
                  color: "#000000",
                  fontWeight: 300,
                  marginRight: "8px",
                }}
              >
                Value Added Tax
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#00000070",
                  fontWeight: 500,
                  width: "60%",
                  textAlign: "end",
                }}
              >
                {props.blogData.details.blogDetails.taxes.ValueAddedTax}
              </span>
            </div>
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
                  color: "#000000",
                  fontWeight: 300,
                  marginRight: "8px",
                }}
              >
                Social Insurance
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#00000070",
                  fontWeight: 500,
                  width: "60%",
                  textAlign: "end",
                }}
              >
                {
                  props.blogData.details.blogDetails.taxes
                    .SocialInsuranceContributions
                }
              </span>
            </div>
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
                  color: "#000000",
                  fontWeight: 300,
                  marginRight: "8px",
                }}
              >
                Individual Income Tax
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#00000070",
                  fontWeight: 500,
                  width: "60%",
                  textAlign: "end",
                }}
              >
                {props.blogData.details.blogDetails.taxes.IndividualIncomeTax}
              </span>
            </div>
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
                  color: "#000000",
                  fontWeight: 300,
                  marginRight: "8px",
                }}
              >
                Housing Fund
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#00000070",
                  fontWeight: 500,
                  width: "60%",
                  textAlign: "end",
                }}
              >
                {
                  props.blogData.details.blogDetails.taxes
                    .HousingFundContribution
                }
              </span>
            </div>
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
                  color: "#000000",
                  fontWeight: 300,
                  marginRight: "8px",
                }}
              >
                Business Tax
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#00000070",
                  fontWeight: 500,
                  width: "60%",
                  textAlign: "end",
                }}
              >
                {props.blogData.details.blogDetails.taxes.BusinessTax}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#000000",
                  fontWeight: 300,
                  marginRight: "8px",
                }}
              >
                Property Tax
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#00000070",
                  fontWeight: 500,
                  width: "60%",
                  textAlign: "end",
                }}
              >
                {props.blogData.details.blogDetails.taxes.PropertyTax}
              </span>
            </div>

            <h2 className="txt-bold txt-m block">{"Risk Factors"}</h2>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#00000070",
                  fontWeight: 500,
                  marginRight: "15px",
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
                justifyContent: "start",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#00000070",
                  fontWeight: 500,
                  marginRight: "15px",
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
                justifyContent: "start",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#00000070",
                  fontWeight: 500,
                  marginRight: "15px",
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
                justifyContent: "start",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#00000070",
                  fontWeight: 500,
                  marginRight: "15px",
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
                justifyContent: "start",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#00000070",
                  fontWeight: 500,
                  marginRight: "15px",
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
                justifyContent: "start",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#00000070",
                  fontWeight: 500,
                  marginRight: "15px",
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

            <h2 className="txt-bold txt-m block">{"How GP Can Help You"}</h2>
            <div
              style={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "4px",
                paddingBottom: "4px",
                display: "flex",
                flexDirection: "column",
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000095",
                  fontWeight: 600,
                  marginTop: "2px",
                }}
              >
                Global Expansion
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000070",
                  fontWeight: 500,
                  lineHeight: "14px",
                  marginBottom: "6px",
                  marginTop: "2px",
                }}
              >
                {
                  props.blogData.details.blogDetails.howGpCanBeHelpful
                    .GlobalExpansion
                }
              </span>
            </div>

            <div
              style={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "4px",
                paddingBottom: "4px",
                display: "flex",
                flexDirection: "column",
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000095",
                  fontWeight: 600,
                  marginTop: "2px",
                }}
              >
                Compliance Management
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000070",
                  fontWeight: 500,
                  lineHeight: "14px",
                  marginBottom: "6px",
                  marginTop: "2px",
                }}
              >
                {
                  props.blogData.details.blogDetails.howGpCanBeHelpful
                    .ComplianceManagement
                }
              </span>
            </div>

            <div
              style={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "4px",
                paddingBottom: "4px",
                display: "flex",
                flexDirection: "column",
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000095",
                  fontWeight: 600,
                  marginTop: "2px",
                }}
              >
                Talent Acquisition
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000070",
                  fontWeight: 500,
                  lineHeight: "14px",
                  marginBottom: "6px",
                  marginTop: "2px",
                }}
              >
                {
                  props.blogData.details.blogDetails.howGpCanBeHelpful
                    .TalentAcquisition
                }
              </span>
            </div>

            <div
              style={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "4px",
                paddingBottom: "4px",
                display: "flex",
                flexDirection: "column",
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000095",
                  fontWeight: 600,
                  marginTop: "2px",
                }}
              >
                Market Research
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000070",
                  fontWeight: 500,
                  lineHeight: "14px",
                  marginBottom: "6px",
                  marginTop: "2px",
                }}
              >
                {
                  props.blogData.details.blogDetails.howGpCanBeHelpful
                    .MarketResearch
                }
              </span>
            </div>

            <div
              style={{
                width: "100%",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                paddingLeft: "8px",
                paddingRight: "8px",
                paddingTop: "4px",
                paddingBottom: "4px",
                display: "flex",
                flexDirection: "column",
                marginTop: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000095",
                  fontWeight: 600,
                  marginTop: "2px",
                }}
              >
                Operational Support
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "#00000070",
                  fontWeight: 500,
                  lineHeight: "14px",
                  marginBottom: "6px",
                  marginTop: "2px",
                }}
              >
                {
                  props.blogData.details.blogDetails.howGpCanBeHelpful
                    .OperationalSupport
                }
              </span>
            </div>

            {!props.chatOn && (
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
                onClick={props.setChatOn}
              >
                <span
                  style={{
                    fontSize: "15px",
                    color: "#FFFFFF",
                    fontWeight: 500,
                  }}
                >
                  Have Query? Chat with GP-Sherlock
                </span>
              </div>
            )}

            {props.chatOn && (
              <div style={{ marginTop: "12px", marginBottom: "18px" }}>
                <h2 className="txt-bold txt-m block">
                  {"Chat with GP-Sherlock"}
                </h2>

                {props.chatList.length > 0 && (
                  <div
                    style={{
                      width: "100%",
                      marginTop: "18px",
                      marginBottom: "18px",
                    }}
                  >
                    {props.chatList.map((chatItem, chatIndex) => (
                      <div
                        key={chatIndex}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "18px",
                          marginBottom: "18px",
                          justifyContent: chatItem.isAuthor
                            ? "flex-end"
                            : "flex-start",
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "200px",
                            height: "auto",
                            borderTopLeftRadius: "8px",
                            borderTopRightRadius: "8px",
                            borderBottomLeftRadius: chatItem.isAuthor
                              ? "8px"
                              : "0px",
                            borderBottomRightRadius: chatItem.isAuthor
                              ? "0px"
                              : "8px",
                            border: "1px solid #0000FF",
                            backgroundColor: "#FFFFFF",
                            padding: "8px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "#000000",
                              lineHeight: "15px",
                            }}
                          >
                            {chatItem.message}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  style={{
                    marginTop: "18px",
                    width: "100%",
                    border: "1px solid #E9EAEC",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: "12px",
                  }}
                >
                  <input
                    id="message_id"
                    name="message"
                    type="text"
                    inputmode="text"
                    value={props.typedMessage}
                    onInput={(e) => props.setTypedMessage(e.target.value)}
                    placeholder={"Type your query"}
                    style={{
                      width: "320px",
                      height: "40px",
                      paddingLeft: "12px",
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      fontSize: "15px",
                      border: "1px solid #00000000",
                      borderRadius: "20px",
                      backgroundColor: "#FFFFFF",
                    }}
                  />

                  {props.chatSubmitting ? (
                    <RotatingLines
                      strokeColor="#0000FF"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="24"
                      visible={true}
                    />
                  ) : (
                    <img
                      src={sendIcon}
                      alt="send"
                      onClick={props.submitChatQuery}
                      style={{
                        width: "24px",
                        height: "24px",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
