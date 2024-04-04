import React from "react";
import "./Component.scss";
import PttCard from "./PttCard";
import pic2 from "../assets/before.jpeg"
import pic1 from "../assets/adventure.jpeg"
import pic3 from "../assets/baggage.jpeg"


const PrepareToTravel = () => {
  return (
    <div className="pttBody">
      <div className="description">
        <h1>
          Prepare
          <br />
          To Travel
        </h1>
        <p>
          Helpful hints for everything from packing to
          <br />
          paperwork, so you are fully prepared
        </p>
      </div>

      <div className="images">
        <PttCard img={ pic1 } heading="AIRPORT ADVENTURES" desc="Turn layovers into mini vacations—insights on terminals, lounges, amenities and more." />
        <PttCard img={pic2} heading="BEFORE YOU FLY" desc="From visa essentials to medical assistance, everything you need to know."/>
        <PttCard img={pic3} heading="BAGGAGE ESSENTIALS" desc="Travel light on worries and heavy on information. Baggage rules decoded."/>

      </div>
    </div>
  );
};

export default PrepareToTravel;
