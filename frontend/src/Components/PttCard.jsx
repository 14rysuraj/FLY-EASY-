import React from "react";
import "./PttCard.scss";

const PttCard = ({img,heading,desc}) => {
  return (
    <div className="pttCard">
      <div className="img img1">
        <div className="bgimg">
          <img src={img} alt="" />
        </div>
        <div className="desc">
          <h5>{heading }</h5>
          <p>
            Turn layovers into mini vacations insights on
            terminals,lounges,anebuties and more
          </p>
        </div>
      </div>
    </div>
  );
};

export default PttCard;
