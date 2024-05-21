import React, { useEffect, useState } from 'react'
import "./Payment.scss"
import { RxCross2 } from "react-icons/rx";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Payment = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;
    const [showPolicy, setShowPolicy] = useState(false);
    const [price, setPrice] = useState(5000);
    const [flightId, setFlightId] = useState(formData.flightId);
    const [passenger, setPassenger] = useState(formData.passengerInfo);
    const [totalPassenger, setTotalPassenger] = useState(formData.totalPassenger);

   

    useEffect(() => {
        setPrice(price * formData.totalPassenger);
    },[])


    const handlePolicy = (e) => {
        e.preventDefault();

        setShowPolicy((prev) =>!prev);
        console.log(showPolicy)
    }


    console.log(flightId)
    console.log(passenger)



    const handleBooking = async (e) => {
        e.preventDefault();
        
        const response = await axios.post("/api/bookFlight", {
            flightId,
            seatsBooked: totalPassenger,
            passenger
           
        }
            
            
        
        )

        if (response.data.success) {
            toast.success(response.data.message);
            navigate('/my-ticket');

            
        }

        else {
            toast.error(response.data.message);
        }
        



    }
    
   


  return (
      <div className='paymentBody'>
          



         {
                  showPolicy ? (<>
                  
                      <div className='policy'>
                          
                      <div className="container">
                          <div className="heading">
                              <h2>DANGEROUS GOODS POLICY </h2>
                              <button onClick={handlePolicy}>
                              <RxCross2 />

                              </button>
                          </div>

                          



                          <div className='prohibitedItems'>
                              
                              <div className="container">
                                  <h2>Prohibited Items</h2>

                                  <div className="items">
                                      

                                  <p>Flammable Liquids</p>
                                  <p>Fireworks</p>
                                  <p>Flammable gases</p>
                                  <p>Corrosive Chemical Products</p>
                                  <p>small lithium battery operated vehivles</p>
                                  <p>Biohazardous or infeectious materials</p>
                                  <p>Radioactive products</p>
                                  <p>Explosives</p>
                                  <p>Toxic Substances</p>
                                  </div>
                                 
                            </div>
                                  
</div>



               
                        









                        </div>
                  </div>
                  </>) : ""
              } 





 <div className="container">
              <div className="heading">
                  <h2>Booking Total</h2>
                  <h2>NPR { price}</h2>
              </div>
              <div className="infos">
                  <p>Total Passenger : {formData.totalPassenger }</p>
                  <p>Trip Type : {formData.tripType }</p>
                  <p> {formData.from} To {formData.to }</p>
                  <p>Trip Date : {formData.departureDate}</p>
                  <p>Class Type : {formData.className }</p>
                  <h4 > <button onClick={handlePolicy}>Dangerous Goods Policy</button></h4>


              </div>

              
             


             

          </div>
          
          <div className="payment">
                  
              <h2>
                  Select Your Payment Method
              </h2>

              <div className="services">
                  

                  <a href="https://esewa.com.np/#/home">
                      <div className="paymentlink esewa">  </div>
                      </a>
                 
                <a href="https://web.khalti.com/?csrt=12461804768103111144#/">
                      <div className="paymentlink khalti">
                      </div>
                      </a>
                      
   
                  
                      
              </div>
              

              <h2>
 Direct Book Ticket
              </h2>

              <div className="book">

                  <button onClick={handleBooking}>Book Ticket</button>
                  </div>






              
              
              </div>
 </div>
  )
}

export default Payment
