import React from "react";
import close from "../assets/cancel.png";

export const BlogDescription =
  " India's rapidly expanding economy and increasing globalization have led to a rise in demand for flexible workforce solutions. Companies are seeking efficient ways to manage their human resources, including payroll, benefits administration, and compliance with local labor laws\n\n As more multinational corporations expand their operations into India, they require local expertise to navigate complex employment regulations and cultural nuances. EOR services offer a streamlined solution for hiring and managing local talent without the need to establish a legal entity in the country\n\nIndia has complex labor laws and regulations that vary across states and industries. EOR providers specialize in ensuring compliance with these regulations, reducing the administrative burden and mitigating the risk of non-compliance for client companies\n\nEOR services enable companies to access a broader pool of talent in India without the constraints of traditional hiring processes. This flexibility allows businesses to scale up or down quickly in response to market demands, seasonal fluctuations, or project requirements\n\nOutsourcing employment functions to an EOR provider can result in cost savings for companies compared to establishing and maintaining a legal entity in India. EOR services often offer competitive pricing models and economies of scale that make them an attractive option for businesses of all sizes\n\nEOR providers typically have expertise in local labor markets, employment laws, tax regulations, and other administrative requirements. This specialized knowledge allows them to offer tailored solutions to meet the needs of diverse industries and client organizations\n\nBy partnering with an EOR provider, companies can transfer certain employment-related risks, such as legal liabilities and tax obligations, to the service provider. This risk-sharing arrangement can provide peace of mind for companies operating in unfamiliar legal environments\n\nOverall, the EOR industry in India presents significant opportunities for companies seeking flexible, compliant, and cost-effective solutions for managing their workforce. As the demand for contingent and remote work arrangements continues to rise globally, the role of EOR services in facilitating cross-border employment is expected to grow accordingly\n\nChina's policies aimed at attracting foreign investment have led to an influx of multinational companies setting up subsidiaries, branches, or representative offices in the country. EOR services offer a convenient way for these companies to hire and manage local employees without the need to establish a legal entity.\n\nChina has complex labor laws, regulations, and administrative procedures that can be challenging for foreign companies to navigate independently. EOR providers offer expertise in compliance with local employment regulations, tax laws, and other legal requirements, reducing the administrative burden and mitigating compliance risks.\n\nChina's vast talent pool and diverse workforce make it an attractive destination for companies seeking skilled professionals in various industries. EOR services enable companies to access local talent quickly and efficiently, allowing for greater flexibility in scaling up or down based on business needs";

const Blog = (props) => {
  return (
    <div
      className="bg-white absolute top right mt24 mr12 mb300 py12 px12 shadow-darken10 round z1 hmax200"
      style={{ width: "400px", maxHeight: "700px", overflowY: "auto" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="txt-bold txt-m block">{props.title}</h2>
        <img
          src={close}
          alt="close"
          onClick={props.onClose}
          style={{ width: "24px", height: "24px" }}
        />
      </div>
      <p
        className="txt-m color-gray mt12"
        style={{ display: "inline-block", height: "80%" }}
      >
        {props.description}
      </p>
    </div>
  );
};

export default Blog;
