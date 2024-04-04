import React, { useState } from "react";
import "./Post.scss";
import { SlOptions } from "react-icons/sl";

import { FcLikePlaceholder } from "react-icons/fc";
import { FaCommentDots } from "react-icons/fa";
import Comment from "./Comment";
import { IoSend } from "react-icons/io5";
import { ImCross } from "react-icons/im";

const Post = () => {
  const [showComments, setShowComments] = useState(false);
  console.log(showComments);

  const comments = () => {
    setShowComments(!showComments);
  };

  return (
    <>
      {showComments ? (
        <div className="postComments">
          <div className="header">
            <h3>Comments</h3>
            <button onClick={comments}>
              <ImCross />
            </button>
          </div>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />

          <div className="footer">
            <input type="text" placeholder="write a comment" />
            <button>
              <IoSend />
            </button>
          </div>
        </div>
      ) : (
        <div className="postCard">
          <div className="postNav">
            <div>
              <div className="avator"></div>
              <h4>Suraj Chaudhary</h4>
            </div>
            <button>
              <SlOptions />
            </button>
          </div>
          <div className="image"></div>
          <div className="footer">
            <div className="button">
              <button>
                <FcLikePlaceholder />
              </button>

              <button onClick={comments}>
                <FaCommentDots />
              </button>
            </div>

            <div className="description">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
