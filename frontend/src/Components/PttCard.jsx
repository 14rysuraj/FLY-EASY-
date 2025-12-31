import React from "react";
import "./PttCard.scss";

const PttCard = ({ img, icon, heading, desc }) => {
  return (
    <div className="pttCard">
      <div className="card-inner">
        <div className="bgimg">
          <img src={img} alt={heading} />
          <div className="overlay"></div>
          <div className="icon-badge">{icon}</div>
        </div>
        <div className="desc">
          <h5>{heading}</h5>
          <p>{desc}</p>
          <button className="learn-more">Learn More →</button>
        </div>
      </div>
    </div>
  );
};

export default PttCard;
