import React from 'react'
import "./Footer.scss"
import { NavLink } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { IoAirplane } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-section brand-section">
          <div className="brand-logo">
            <IoAirplane />
            <h3>Fly Easy</h3>
          </div>
          <p className="brand-description">
            Your trusted travel partner since 2000. Connecting you to the world with comfort, safety, and reliability.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/where-we-fly">Destinations</NavLink></li>
            <li><NavLink to="/blog">Travel Guide</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>

        {/* Travel Info */}
        <div className="footer-section">
          <h4>Travel Information</h4>
          <ul>
            <li><NavLink to="/prepare">Before You Fly</NavLink></li>
            <li><NavLink to="/baggage">Baggage Policy</NavLink></li>
            <li><NavLink to="/check-in">Online Check-in</NavLink></li>
            <li><NavLink to="/faq">FAQs</NavLink></li>
            <li><NavLink to="/special-assistance">Special Assistance</NavLink></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section contact-section">
          <h4>Contact Us</h4>
          <div className="contact-item">
            <MdPhone />
            <span>+977 1-4567890</span>
          </div>
          <div className="contact-item">
            <MdEmail />
            <span>support@flyeasy.com</span>
          </div>
          <div className="contact-item">
            <MdLocationOn />
            <span>Kathmandu, Nepal</span>
          </div>
          <div className="operating-hours">
            <p><strong>24/7 Customer Support</strong></p>
            <p>Always here to help</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} Fly Easy Airlines. All rights reserved.</p>
          <div className="footer-legal">
            <NavLink to="/privacy">Privacy Policy</NavLink>
            <span className="separator">|</span>
            <NavLink to="/terms">Terms & Conditions</NavLink>
            <span className="separator">|</span>
            <NavLink to="/cookies">Cookie Policy</NavLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
