import React, { useEffect, useState } from "react";
import "./ManageFlights.scss";
import DataTable from "react-data-table-component";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";



const ManageFlights = () => {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
    const [showAddFlight, setShowAddFlight] = useState(false);
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [airline, setAirline] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [price, setPrice] = useState("");
  const [seatsAvailable, setSeatsAvailable] = useState("");
  const [showFlightEdit, setShowFlightEdit] = useState(false);
  const [currentFlightId, setCurrentFlightId] = useState("");



  const handleEditFlight = async (id) => {
    setCurrentFlightId(id);
    setShowFlightEdit(true);
    setShowAddFlight(false);


  }

  console.log(currentFlightId);

  const columns = [
    {
      name: "Airline",
      selector: (row) => row.airline,
      sortable: true,
    },
    {
      name: "Flight Number",
      selector: (row) => row.flightNumber,
      sortable: true,
    },
    {
      name: "Departure Airport",
      selector: (row) => row.departureAirport,
      sortable: true,
    },
    {
      name: "Arrival Airport",
      selector: (row) => row.arrivalAirport,
      sortable: true,
    },
    {
      name: "Departure Date",
      selector: (row) => new Date(row.departureDate).toISOString().split('T')[0],
      sortable: true,
    },
    {
      name: "Departure Time",
      selector: (row) => row.departureTime,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Seats",
      selector: (row) => row.seatsAvailable,
      sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <div id="edit-delete-btn">
            <button id="edit-btn" onClick={() => handleEditFlight(row._id)}><MdModeEdit /></button>
            <button id="delete-btn"onClick={() => handleDeleteFlight(row._id)}><MdOutlineDelete /></button>
          </div>
        ),
      },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/flights");
        setData(response.data.flights);
        setRecords(response.data.flights);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, []);

    console.log(data);
    
    const handleDeleteFlight = async (id) => {
    
        const response = await axios.delete(`/api/flights/delete/${id}`);

        if (response.data.success) {
            toast.success(response.data.message);
            setTimeout(() => {
              window.location.reload();  
            },1500)
        }
        else {
            toast.error(response.data.message);
        }
    
}



    const handleAddFlight = async() => {

        const response = await axios.post('/api/flights/create', {
            airline,
            flightNumber,
            departureAirport,
            arrivalAirport,
            departureDate,
            arrivalDate: null,
            departureTime,
            arrivalTime,
            price,
            seatsAvailable,
        });
     

        if (response.data.success) {
            toast.success(response.data.message);
            setTimeout(() => {
                window.location.reload();  
              },1500)
            setDepartureAirport("");
            setArrivalAirport("");
            setDepartureDate("");
            setDepartureTime("");
            setArrivalTime("");
            setAirline("");
            setFlightNumber("");
            setPrice("");
            setSeatsAvailable("");
            
           

        }
        else {
             
            toast.error(response.data.message);
        }
        
    }
  
  
  const handleUpdateFlight = async () => {

    const response = await axios.put(`/api/flights/update/${currentFlightId}`, {
      airline,
      flightNumber,
      departureAirport,
      arrivalAirport,
      departureDate,
      arrivalDate: null,
      departureTime,
      arrivalTime,
      price,
      seatsAvailable,

    });
    if (response.data.success) {
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();  
      },1500)
    }
    else {
      toast.error(response.data.message);
    }
    
  }

  return (
    <div className="manage-flights-body">
      {showAddFlight ? (
        <button className="add-flight" onClick={() => setShowAddFlight(false) }>
          close
        </button>
      ) : (
        <button className="add-flight" onClick={() => setShowAddFlight(true) && setShowFlightEdit(false)}>
          Add Flight
        </button>
      )}

      <DataTable columns={columns} data={records} pagination selectableRows />

      {showAddFlight ? (
        <div className="addFlight">
          <div className="container">
            <select
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
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
              value={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
            >
              <option value=""> To</option>
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
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
            <input
              type="text"
              placeholder="Flight Number"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Airline"
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Seats"
              value={seatsAvailable}
              onChange={(e) => setSeatsAvailable(e.target.value)}
            />
            <input
              type="text"
              placeholder="Departure Time"
              value={departureTime}
              onChange={(e)=>setDepartureTime(e.target.value)}
            />
            <input
              type="text"
              placeholder="Arrival Time"
              value={arrivalTime}
              onChange={(e)=>setArrivalTime(e.target.value)}
            />
            <button onClick={handleAddFlight}>Add Flight</button>
          </div>
        </div>
      ) : (
        ""
      )}

      {showFlightEdit ? (
        <div className="flight-edit-body">
           <select
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
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
              value={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
            >
              <option value=""> To</option>
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
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
            <input
              type="text"
              placeholder="Flight Number"
              value={flightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Airline"
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Seats"
              value={seatsAvailable}
              onChange={(e) => setSeatsAvailable(e.target.value)}
            />
            <input
              type="text"
              placeholder="Departure Time"
              value={departureTime}
              onChange={(e)=>setDepartureTime(e.target.value)}
            />
            <input
              type="text"
              placeholder="Arrival Time"
              value={arrivalTime}
              onChange={(e)=>setArrivalTime(e.target.value)}
            />
            <button onClick={handleUpdateFlight}>Update Flight</button>
        </div>
      
      
):""}

    </div>
  );
};

export default ManageFlights;
