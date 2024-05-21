import React, { useContext, useEffect, useState } from "react";
import "./Blog.scss";

import axios from "axios";
import { FaRegCommentDots } from "react-icons/fa6";
import Comment from "../../Components/Comment";
import { RxCross2 } from "react-icons/rx";
import { IoOptionsSharp } from "react-icons/io5";
import ReactTimeAgo from "react-time-ago";
import { context, showLogin } from "../../main";
import AddReview from "../../Components/AddReview";



const Blog = () => {
  const [data, setData] = useState({ user: {}, post: 0 });
  const [postDatas, setPostDatas] = useState([]);
  const [commentDatas, setCommentDatas] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const { showPopupLogin, setShowPopupLogin } = useContext(showLogin);
  const [addReview,setAddReview]=useState(false)              ;



  useEffect(() => {
    const fetchData = async () => {
      const allPostResponse = await axios.get("/api/post/posts");

      setPostDatas(allPostResponse.data.post);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const response = await axios.get("/api/user/profile");
          setData(response.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);

  console.log(data.user._id);
  console.log(postDatas);



  const handlePostReview=() => {
  
    if (!isAuthenticated) {
      setShowPopupLogin(true);
    } else {
      setAddReview(true);
    }


  }
  console.log(addReview);

  const handleShowReview = () => {
    
    if (!isAuthenticated) {
      setShowPopupLogin(true);
    } else {
     

    }
  }
  
  
  const handleShowComments = async (e, i) => {
    e.preventDefault();
    const id = postDatas[i]._id;

    const response = await axios.get(`/api/post/posts/comments/${id}`);
    setCommentDatas(response.data.comments);
  };

  return (
    <> 
    <div className={`blogBody ${showSidebar ? "" : "fullWidth"}`}>
    <aside className={`${showSidebar ? "" : "hidden"}`}>
      <div className={`container ${showSidebar ? "slideIn" : "slideOut"}`}>
        {showSidebar ? (
          <>
            <button onClick={() => setShowSidebar((prev) => !prev)}>
              <RxCross2 />
            </button>
            <div className="profile">
              <div className="avatar"></div>
              <h4>{data.user?.email}</h4>
            </div>

            <div className="info">
              <p>Posted Review:{data.postCount}</p>
            </div>
            <div className="feature">
              <button className="button" type="button" onClick={handlePostReview}>
                <span className="button__text">Add Review</span>
                <span className="button__icon">
                  <svg
                    className="svg"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="12" x2="12" y1="5" y2="19"></line>
                    <line x1="5" x2="19" y1="12" y2="12"></line>
                  </svg>
                </span>
              </button>

                  <button className="button showReview"
                  
                  onClick={handleShowReview}
                  >See Your Review</button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </aside>

    <div className="heroSection">
      <h2>
        {showSidebar ? (
          ""
        ) : (
          <button onClick={() => setShowSidebar((prev) => !prev)}>
            <IoOptionsSharp />
          </button>
        )}
      </h2>

      {postDatas.map((post, i) => (
        <div className="post" key={i}>


          
          
          <div className="one">
          <div className="profile-pic"></div>
            <div className="user-info">
              <h4>{post.userId.name }</h4>
              <p>
                <ReactTimeAgo date={post.createdAt} />
              </p>
          </div>

          
          
          </div>
          <div className="two">
            <h3>{post.title }</h3>
            <p>{ post.description}</p>
          
       
          </div>

          <div className="three">
            <button>comment</button>
            <button>View all Comment</button>
          </div>
         








          
   
      
        </div>
      ))}
    </div>

    {showComments ? (
      <>
        <Comment showComments />
      </>
    ) : (
      ""
        )}
        



        {addReview ? (
          <AddReview addReview={addReview} setAddReview={setAddReview} />
     ):""}
  
    
    
      </div>  
      


    
      


    </>
  );
};

export default Blog;
