import React, { useContext, useEffect, useState } from "react";
import "./Comment.scss";
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import { toast } from "react-toastify";
import { context, showLogin } from "../main";
import { MdDeleteOutline } from "react-icons/md";


const Comment = ({ showComments, setShowComments, commentDatas, postId }) => {
  const [commentText, setCommentText] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const { showPopupLogin, setShowPopupLogin } = useContext(showLogin);
  const [comments, setComments] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get("/api/user/profile");
          setUserId(response.data.user._id);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };
    fetchProfile();
  }, [isAuthenticated]);

  const fetchComments = async () => {
    const response = await axios.get(`/api/post/posts/comments/${postId}`);
    setComments(response.data.comments);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (isAuthenticated) {
      try {
        const response = await axios.post(`/api/post/comment/${postId}`, {
          commentText,
        });

        if (response.data.success) {
          toast.success(response.data.message);
          fetchComments();
          setCommentText("");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error adding comment");
      }
    } else {
      setShowPopupLogin(true);
    }
  };

  const handleDeleteComment = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`/api/post/comment/delete/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setComments(comments.filter(comment => comment._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error deleting comment");
    }
  };

  return (
    <div className="commentBody">
      <div className="comments">
        <div className="heading">
          <button onClick={() => setShowComments(false)}>
            <IoArrowBackSharp />
          </button>
          <h6>Comments</h6>
        </div>

        {comments.map((comment, i) => (
          <div className="comment" key={i}>
            <div className="profile"></div>
            <div>
              <div className="heading">
                <h5>{comment.userId.name}</h5>
                <h5>
                  <ReactTimeAgo date={comment.createdAt} />
                  {comment.userId._id === userId && (
                <button onClick={() => handleDeleteComment(comment._id)}>
                 <MdDeleteOutline />

                </button>
              )}
                </h5>
              </div>
              <p>{comment.comment}</p>
             
            </div>
          </div>
        ))}

        <div className="addComment">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <br />
          <br />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
