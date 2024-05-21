import React, { useState } from 'react'
import "./AddReview.scss"
import { IoArrowBack } from "react-icons/io5";
import axios from 'axios';
import { toast } from 'react-toastify';


const AddReview = ({ addReview, setAddReview }) => { 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");



    const handlePost = async () => {

        const response = await axios.post("/api/post/create", {
            title,
            description,

        }
          
        )

        if (response.data.success) {
            toast.success("Review added successfully");
            setAddReview(false);
            setTimeout(() => {
                window.location.reload();
            },1000);
          
        }
        else {
            toast.error("something went wrong");
           
        }

    }

  return (
    <div className='AddReview'>
          <div className="container">
              
     <div> <button onClick={()=>setAddReview(false)}> <IoArrowBack />
</button></div> 
              <h3>Title</h3>
              <input type="text"  value={title} onChange={(e)=>setTitle(e.target.value)}/>
              <h3>Description</h3>
              <textarea name="" id="" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
              <button onClick={handlePost}>Post Review</button>
   </div>
    </div>
  )
}

export default AddReview
