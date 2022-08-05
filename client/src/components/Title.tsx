import React from "react";

interface IProps {
  title: string;
  width: string
}

const Title: React.FC<IProps> = ({ title, width = "25%" }) => {
  return (
    <div className="dashboardBody__main text-center m-auto">
      <h2>{title.toUpperCase()}</h2>
      <hr
        style={{
          width: `${width}`,
          opacity: 1,
          margin: "auto",
          color: "#1F2226",
          height: "1px",
        }}
      />{" "}
    </div>
  );
};

export default Title;
