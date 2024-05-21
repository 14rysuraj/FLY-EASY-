import React, { useEffect, useState } from "react";
import "./MyTicket.scss";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { FaRegCopy } from "react-icons/fa6";
import { toast } from "react-toastify";

const MyTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [ticketDetails, setTicketDetails] = useState({});
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user/tickets");

        setTickets(response.data.bookings);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleShowTicketDetail = async (e, id) => {
    e.preventDefault();

    console.log(id);

    const response = await axios.get(`/api/user/ticket/details/${id}`);
    setTicketDetails(response.data.booking);
    setPassengerDetails(response.data.booking.passenger);

    setShowTicketDetail((prev) => !prev);
  };

  console.log(passengerDetails);

  const handleCopyId = (id) => {
    setBookingId(id);
    navigator.clipboard.writeText(bookingId);

    toast.success("Booking ID copied successfully");
  };


  useEffect(() => {
    if (bookingId) {
        navigator.clipboard.writeText(bookingId);
    }
}, [bookingId]);

  return (
    <>
      {showTicketDetail ? (
        <div className="ticket-detail">
          <button onClick={() => setShowTicketDetail((prev) => !prev)}>
            <RxCross1 />
          </button>

          <div className="container">
            <div className="heading">
              <h2>Flight Ticket Detail</h2>
            </div>

            <div className="flightDetails">
              <h2>Flight Details</h2>
              <p>
                Booking Id :{ticketDetails._id}
                <button onClick={() => handleCopyId(ticketDetails._id)}>
                  <FaRegCopy />
                </button>
              </p>
              <div className="route">
                <div>
                  <h3>From</h3>
                  <p>{ticketDetails.flightId.departureAirport}</p>
                </div>
                <div>
                  <h3>Departure Date</h3>
                  <p>{ticketDetails.flightId.departureDate}</p>
                </div>

                <div>
                  <h3>Time</h3>
                  <p>{ticketDetails.flightId.departureTime}</p>
                </div>
                <div>
                  <h3>To</h3>
                  <p>{ticketDetails.flightId.arrivalAirport}</p>
                </div>
                <div>
                  <h3>Flight Number</h3>
                  <p>{ticketDetails.flightId.flightNumber}</p>
                </div>
                <div>
                  <h3>Airline</h3>
                  <p>{ticketDetails.flightId.airline}</p>
                </div>
                <div>
                  <h3>Amount</h3>
                  <p>{ticketDetails.totalPrice}</p>
                </div>
                <div>
                  <h3>Class Type </h3>
                  <p>Economy</p>
                </div>

                <div>
                  <h3>Trip Type</h3>
                  <p>One Way</p>
                </div>
              </div>
            </div>

            <div className="passengerDetails">
              <h2>Passenger Details</h2>

              {passengerDetails.map((passenger, i) => (
                <div key={passenger._id} className="details">
                  <h3>Passsenger {i + 1}</h3>
                  <p>Title : {passenger.title}</p>
                  <p>
                    Name : {passenger.firstName} {passenger.lastName}
                  </p>
                  <p></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="MyTicketBody">
        <div className="heroSection">
          {tickets.map((ticket, i) => (
            <div key={i} className="ticket">
              <div>
                <p>From:</p>
                <p>{ticket.flightId.departureAirport}</p>
              </div>
              <div>
                <p>To:</p>
                <p>{ticket.flightId.arrivalAirport}</p>
              </div>
              <div>
                <p>Departure Date:</p>
                <p>{ticket.flightId.departureDate}</p>
              </div>
              <div>
                <p>Booking Date:</p>
                <p>{ticket.bookingDate}</p>
              </div>
              <button onClick={(e) => handleShowTicketDetail(e, ticket._id)}>
                Show Ticket Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyTicket;
