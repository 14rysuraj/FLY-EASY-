import "./Aboutus.scss";
import { FaPlane, FaGlobeAmericas, FaUsers, FaAward } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { GiCommercialAirplane } from "react-icons/gi";
import airportImage from "../../assets/airport-info-new.webp";

const Aboutus = () => {
  return (
    <div className="about-us">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>About Fly Easy</h1>
            <p>Your Journey, Our Commitment</p>
          </div>
        </div>
      </div>

      {/* Company Story Section */}
      <div className="story-section">
        <div className="container">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              Since our inception, Fly Easy has been dedicated to making air travel accessible,
              comfortable, and memorable for millions of passengers worldwide. We believe that
              every journey should be more than just reaching a destination—it should be an
              experience to remember.
            </p>
            <p>
              Our state-of-the-art reservation system streamlines the booking process,
              ensuring a seamless and efficient travel experience from search to boarding.
              We combine cutting-edge technology with warm, personalized service to create
              the perfect balance for modern travelers.
            </p>
          </div>
          <div className="story-image">
            <img src={airportImage} alt="Fly Easy Airlines" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="container">
          <div className="stat-card">
            <FaPlane className="stat-icon" />
            <h3>500+</h3>
            <p>Daily Flights</p>
          </div>
          <div className="stat-card">
            <FaGlobeAmericas className="stat-icon" />
            <h3>50+</h3>
            <p>Destinations</p>
          </div>
          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <h3>10M+</h3>
            <p>Happy Passengers</p>
          </div>
          <div className="stat-card">
            <FaAward className="stat-icon" />
            <h3>15+</h3>
            <p>Years of Excellence</p>
          </div>
        </div>
      </div>

      {/* Mission & Values Section */}
      <div className="values-section">
        <div className="container">
          <h2>Our Mission & Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <GiCommercialAirplane />
              </div>
              <h3>Safety First</h3>
              <p>
                Your safety is our top priority. We maintain the highest
                standards in aircraft maintenance and crew training.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <FaUsers />
              </div>
              <h3>Customer Focus</h3>
              <p>
                We&apos;re committed to providing exceptional service and
                personalized experiences for every passenger.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <FaGlobeAmericas />
              </div>
              <h3>Global Reach</h3>
              <p>
                Connecting people and places across the globe with
                reliable and convenient flight options.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <FaAward />
              </div>
              <h3>Excellence</h3>
              <p>
                Continuously innovating and improving to deliver
                world-class aviation services.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Section */}
      <div className="fleet-section">
        <div className="container">
          <h2>Our Modern Fleet</h2>
          <p className="fleet-intro">
            Experience comfort and reliability with our state-of-the-art aircraft,
            equipped with the latest technology and amenities.
          </p>
          <div className="fleet-features">
            <div className="fleet-feature">
              <FaPlane />
              <h4>Latest Aircraft</h4>
              <p>Modern, fuel-efficient fleet with advanced safety features</p>
            </div>
            <div className="fleet-feature">
              <FaPlane />
              <h4>Comfortable Cabins</h4>
              <p>Spacious seating with enhanced legroom and entertainment</p>
            </div>
            <div className="fleet-feature">
              <FaPlane />
              <h4>Eco-Friendly</h4>
              <p>Committed to reducing our environmental footprint</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <div className="container">
          <h2>Get In Touch</h2>
          <p className="contact-intro">
            Have questions or need assistance? Our team is here to help you 24/7.
          </p>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <MdPhone />
              </div>
              <h3>Call Us</h3>
              <p>+977 9808191548</p>
              <p>+977 9823947937</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <MdEmail />
              </div>
              <h3>Email Us</h3>
              <p>suraj@flyeasy.com</p>
              <p>nirmal@flyeasy.com</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <MdLocationOn />
              </div>
              <h3>Visit Us</h3>
              <p>Tribhuvan International Airport</p>
              <p>Kathmandu, Nepal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
