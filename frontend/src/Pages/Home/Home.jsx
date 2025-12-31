import React from "react";
import "./Home.scss";
import Book from "../../Components/Book";
import PrepareToTravel from "../../Components/PrepareToTravel";
import Service from "../../Components/Service";
import { MdFlight, MdSecurity } from "react-icons/md";
import { FaAward, FaClock } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <div className="hero-booking-wrapper">
        <div className="hero">
          <div className="hero-content">
            <h1>Your Journey Begins Here</h1>
            <p>Discover the world with Fly Easy - Book your perfect flight today</p>
          </div>
        </div>
        <Book />
      </div>

      <div className="bg"></div>

      <PrepareToTravel />

      {/* Why Choose Fly Easy Section */}
      <div className="why-choose-section">
        <div className="section-header">
          <h2>Why Choose Fly Easy</h2>
          <p>Experience the difference with our world-class services</p>
        </div>

        <div className="service">
          <Service
            img={<MdFlight />}
            h="100+ Destinations"
            p="Explore over 100 destinations worldwide with our extensive network of routes"
            stat="100+"
          />
          <Service
            img={<FaClock />}
            h="On-Time Performance"
            p="96% on-time arrival rate ensuring you reach your destination as planned"
            stat="96%"
          />
          <Service
            img={<FaAward />}
            h="Award-Winning Service"
            p="Recognized globally for exceptional customer service and satisfaction"
            stat="50+"
          />
          <Service
            img={<MdSecurity />}
            h="Safe & Secure"
            p="Your safety is our priority with highest security standards and protocols"
            stat="100%"
          />
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-item">
            <h3>10M+</h3>
            <p>Happy Passengers</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Daily Flights</p>
          </div>
          <div className="stat-item">
            <h3>25+</h3>
            <p>Years Experience</p>
          </div>
          <div className="stat-item">
            <h3>4.8/5</h3>
            <p>Customer Rating</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
