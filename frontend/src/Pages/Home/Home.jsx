import React from "react";
import "./Home.scss";
import Book from "../../Components/Book";
import PrepareToTravel from "../../Components/PrepareToTravel";
import Service from "../../Components/Service";
import { AiOutlineLike } from "react-icons/ai";
import { LuUser } from "react-icons/lu";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";

const Home = () => {
  return (
    <>
      <Book />
      <div className="hero">
        <h1>
          <button>Explore more</button>
        </h1>
      </div>
      <div className="bg"></div>

      <PrepareToTravel />
      <div className="service">
        <Service
          img={<AiOutlineLike />}
          h="Outstanding Services"
          p="We We have been providing outstanding services till date "
        />
        <Service
          img={<LuUser />}
          h="Happy Passengers"
          p="Our passengers are very happy with our service."
        />
        <Service
          img={<FaMoneyCheckAlt />}
          h="Competitive Fare"
          p="Our fare is competitive as compared to other airlines"
        />
        <Service
          img={<GrStatusGood />}
          h="Experience"
          p="We have been providing excellence service ."
        />
      </div>
    </>
  );
};

export default Home;
