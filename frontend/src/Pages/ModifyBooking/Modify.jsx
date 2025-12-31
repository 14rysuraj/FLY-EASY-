import React, { useEffect, useState } from "react";
import "./Modify.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";


const Modify = () => {
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [showUpdate, setShowUpdate] = useState(false);
    const [flights, setFlights] = useState([]);
    const [departureDate, setDepartureDate] = useState("");
    const [showHeading, setShowHeading] = useState(false);
    const [bookingId, setBookingId] = useState(data?.bookingId);
    const [showUpdateMessage, setShowUpdateMessage] = useState(false);
    const [bookingDetails, setBookingDetails] = useState({});
  
    console.log("hello")
    console.log(bookingId);

    const fetchBookingDetails = async () => {
        const response = await axios.get(`/api/user/ticket/details/${bookingId}`);
        setBookingDetails(response.data.booking);
    };

    useEffect(() => {
        if (bookingId) {
            fetchBookingDetails();
        }
    }, [bookingId]);
      console.log(bookingDetails)

  



  const fetchData = async () => {
    const response = await axios.get(
      `/api/flights/search?departureAirport=${from}&arrivalAirport=${to}&departureDate=${departureDate}`
    );
    setFlights(response.data.flights);
    setShowHeading(true);
  };

    console.log(flights);
    


    const handleUpdate = async (e, flightId) => {
        
        const response = await axios.put(`/api/updateBooking/${bookingId}/${flightId}`);

        if (response.data.success) {
            
            toast.success(response.data.message);
            setShowUpdateMessage(true); 
           
          

            fetchBookingDetails();
            setShowUpdate(false);
            setFlights([]);
            setShowHeading(false);
      
            window.scrollTo({ top: 0, behavior: 'smooth' });
    
               
          
          
            
        }
        else {
            toast.error(response.data.message);
        }

       
        

    }
  
  
  const handleCancelBooking = async () => {
    
    const response = await axios.delete(`/api/cancelBooking/${bookingId}`);

    if (response.data.success) {
     
      navigate('/');
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }

  }

  return (
      <div className="modify-body">
        
{        

          <div className="main-box">
              
              {showUpdateMessage ? (
    
    <div className="message-box">
    <p>Your flight has been updated successfully. The updated flight details are provided below.</p> 
    <button onClick={()=>setShowUpdateMessage(false)}><RxCross2 />
</button>
</div>
):""}

        
        <div className="booking-details">
          <h2>Your Booked Flight Details</h2>
          {bookingDetails.flightId ? (
                        <>
                            <h6>Airline: {bookingDetails.flightId.airline}</h6>
                            <h6>Flight Number: {bookingDetails.flightId.flightNumber}</h6>
                            <h6>From: {bookingDetails.flightId.departureAirport}</h6>
                            <h6>To: {bookingDetails.flightId.arrivalAirport}</h6>
                            <h6>Time: {bookingDetails.flightId.departureTime} to {bookingDetails.flightId.arrivalTime}</h6>
                            <h6>Seat Booked: {bookingDetails.seatsBooked}</h6>
                        </>
                    ) : (
                        <p>Loading booking details...</p>
                    )}
        </div>

        <div className="policies">
          <div>
            <ul>
              <li>
                Within 24 hours of Booking: Cancellations made within 24 hours
                of the original booking time are eligible for a full refund
                without any cancellation fee, provided the booking was made at
                least 7 days before the departure date.
              </li>
              <li>
                More than 24 hours after Booking: Cancellations made more than
                24 hours after booking are subject to a cancellation fee. The
                fee amount varies depending on the fare type and the time
                remaining before the scheduled departure.
              </li>
              <li>
                * Only Flight update are available you cannot update the
                passenger details and number of seat.
              </li>
              <li>
                To change the passenger details and the number of seats, you
                must cancel the booking and book the flight again.
              </li>
            </ul>
          </div>
        </div>

        <div className="buttons">
          <button onClick={() => setShowUpdate((prev) => !prev)}>
            Update Booking
          </button>
          <button onClick={handleCancelBooking}>Cancel Booking</button>
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>

        <div className="update-booking">
          {showUpdate ? (
            <div className="flight-details">
              <select
                name=""
                id=""
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              >
                <option value="">From</option>
                <option value="Kathmandu">Kathmadu</option>
                <option value="Pokhara">Pokhara</option>
                <option value="Lumbini">Lumbini</option>
                <option value="Bhaktapur">Bhaktapur</option>
                <option value="Bharatput">Bharatpur</option>
                <option value="Biratnagar">Biratnagar</option>
                <option value="Janakpur">Janakpur</option>
                <option value="Surkhet">Surkhet</option>
                <option value="Nepaljung">Nepaljung</option>
                <option value="Bhadrapur">Bhadrapur</option>
                <option value="Bajhang">Bajhang</option>
                <option value="Simara">Simara</option>
                <option value="Dhangadhi">Dhangadhi</option>
                <option value="Dolpa">Dolpa</option>
                <option value="Ramechhap">Ramechhap</option>
              </select>
              <select
                name=""
                id=""
                value={to}
                onChange={(e) => setTo(e.target.value)}
              >
                <option value="">To</option>
                <option value="Kathmandu">Kathmadu</option>
                <option value="Pokhara">Pokhara</option>
                <option value="Lumbini">Lumbini</option>
                <option value="Bhaktapur">Bhaktapur</option>
                <option value="Bharatput">Bharatpur</option>
                <option value="Biratnagar">Biratnagar</option>
                <option value="Janakpur">Janakpur</option>
                <option value="Surkhet">Surkhet</option>
                <option value="Nepaljung">Nepaljung</option>
                <option value="Bhadrapur">Bhadrapur</option>
                <option value="Bajhang">Bajhang</option>
                <option value="Simara">Simara</option>
                <option value="Dhangadhi">Dhangadhi</option>
                <option value="Dolpa">Dolpa</option>
                <option value="Ramechhap">Ramechhap</option>
              </select>
              <select name="" id="">
                <option value="Economy">Economy</option>
                <option value="Business">Business</option>
                <option value="First">First</option>
              </select>
              <select name="" id="">
                <option value="OneWay">One Way</option>
                <option value="RoundTrip">Round Trip</option>
              </select>
              <input
                type="date"
                onChange={(e) => setDepartureDate(e.target.value)}
              />
              <button onClick={fetchData}>Search Flight</button>
            </div>
          ) : (
            ""
          )}

          <div className="flight-search">
            {showHeading ? (
              <div className="heading">
                {flights.length} flight found for your trip
              </div>
            ) : (
              ""
            )}

            {flights.map((flight, i) => (
              <div className="flight" key={i}>
                <div className="first">
                  <div className="head">
                            <h5>{ flight.flightNumber}</h5>
                            <h5>{ flight.airline}</h5>
                  </div>

                  <br />
                  <div className="date">
                            <p>{ flight.departureDate}</p>
                            <p>{flight.arrivalDate }</p>
                  </div>
                  <div className="date">
                            <p>{ flight.departureTime}</p>
                            <p>{ flight.arrivalTime}</p>
                  </div>
                  <div className="date">
                            <h3>{flight.departureAirport }</h3>
                            <h3>{ flight.arrivalAirport}</h3>
                  </div>
                </div>
                <div className="second">
                  <div className="head">
                    <h2>Economy</h2>
                            <h5>{flight.seatAvailable }</h5>
                  </div>
                  <div className="buttom">
                            <h1>{flight.price }</h1>
                    <button onClick={(e)=>handleUpdate(e,flight._id)}>Update</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

                  <div className="passenger-details">
                      

          </div>
        </div>
          </div> }
         
    </div>
  );
};

export default Modify;
