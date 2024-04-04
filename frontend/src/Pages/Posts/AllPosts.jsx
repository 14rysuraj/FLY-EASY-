import React from "react";
import "./AllPosts.scss";
import Post from "../../Components/Post";
const AllPosts = () => {
  return (
    <div className="allPostsBody">
      <div className="container">
        <Post />
        
      </div>
    </div>
  );
};

export default AllPosts;
