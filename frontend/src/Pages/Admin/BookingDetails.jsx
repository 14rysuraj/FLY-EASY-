import React, { useEffect, useState } from "react";
import "./BookingDetails.scss";
import DataTable from "react-data-table-component";
import axios from "axios";
import { format } from "date-fns";

const BookingDetails = () => {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return format(date, "dd MMMM yyyy");
  };

  const columns = [
    {
      name: "From",
      selector: (row) => row.flightId?.departureAirport,
      sortable: true,
    },
    {
      name: "To",
      selector: (row) => row.flightId?.arrivalAirport,
      sortable: true,
    },
    {
      name: "Departure Date",
      selector: (row) => formatDate(row.flightId?.departureDate),
      sortable: true,
    },
    {
      name: "Seat Booked",
      selector: (row) => row.seatsBooked,
      sortable: true,
    },
    {
      name: "Booked By",
      selector: (row) => row.userId?.email,
      sortable: true,
    },
    {
      name: "Booking Date",
      selector: (row) => formatDate(row.bookingDate),
      sortable: true,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/bookings");
        setData(response.data.bookings);
        setRecords(response.data.bookings);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  const handleFilter = (event) => {
    const newData = data.filter((row) => {
      return (
        row.userId?.email
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        row.flightId?.departureAirport
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        row.flightId?.arrivalAirport
          .toLowerCase()
              .includes(event.target.value.toLowerCase()) ||
          row.flightId?.departureDate
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) ||
          row.bookingDate
              .toLowerCase()
          .includes(event.target.value.toLowerCase())
          
      );
    });
    setRecords(newData);
  };

  return (
    <div className="booking-details-body">
      <div className="searchbar">
        From: <input type="text" onChange={handleFilter} placeholder="Search" />
        To: <input type="text" onChange={handleFilter} placeholder="Search" />
        Departure Date :{" "}
        <input
          type="text"
          onChange={handleFilter}
          placeholder="Format year-m-d"
        />
        Booked By :
        <input type="text" onChange={handleFilter} placeholder="Email" />
        Booking Date :{" "}
        <input
          type="text"
          onChange={handleFilter}
          placeholder="Search in year-m-d"
        />
      </div>
      <DataTable
        columns={columns}
        data={records}
        pagination
        selectableRows
        fixedHeader
      />
    </div>
  );
};

export default BookingDetails;
