import React, { useState } from "react";
import "./Blog.scss";
import { Outlet } from "react-router-dom";


const Blog = () => {
  const [showComments, setShowComments] = useState(false);
  return (
    <div className="blogBody">
      <aside>
        <div className="container">
          <div className="profile">
            <div className="avatar">

            </div>
            <h4>Suraj Chaudhary</h4>
        </div>
          <div className="feature">
          <button>Add Post</button>
          <button>Your Post</button>
        </div>
         
        </div>
      </aside>
      <div className="contents">
        <div className="posts">
          
          <Outlet />
       
        </div>
        
        
       
        
      </div>
   
    </div>
  );
};

export default Blog;
