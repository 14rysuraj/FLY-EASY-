import React from "react";
import "./Component.scss";
import PttCard from "./PttCard";
import pic2 from "../assets/before.jpeg"
import pic1 from "../assets/adventure.jpeg"
import pic3 from "../assets/baggage.jpeg"
import { MdFlight, MdLuggage, MdInfo } from "react-icons/md";

const PrepareToTravel = () => {
  return (
    <div className="pttBody">
      <div className="ptt-container">
        <div className="description">
          <div className="section-badge">Travel Essentials</div>
          <h1>Prepare To Travel</h1>
          <p>
            Everything you need to know before you fly. From airport tips to baggage rules,
            we've got you covered for a smooth journey.
          </p>
          <button className="explore-btn">Explore All Resources</button>
        </div>

        <div className="images">
          <PttCard
            img={pic1}
            icon={<MdFlight />}
            heading="Airport Adventures"
            desc="Turn layovers into mini vacations—insights on terminals, lounges, amenities and more."
          />
          <PttCard
            img={pic2}
            icon={<MdInfo />}
            heading="Before You Fly"
            desc="From visa essentials to medical assistance, everything you need to know."
          />
          <PttCard
            img={pic3}
            icon={<MdLuggage />}
            heading="Baggage Essentials"
            desc="Travel light on worries and heavy on information. Baggage rules decoded."
          />
        </div>
      </div>
    </div>
  );
};

export default PrepareToTravel;
