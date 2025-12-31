import { useContext, useEffect, useState } from "react";
import "./Blog.scss";
import axios from "axios";
import Comment from "../../Components/Comment";
import { RxCross2 } from "react-icons/rx";
import { IoOptionsSharp } from "react-icons/io5";
import ReactTimeAgo from "react-time-ago";
import { context, showLogin } from "../../main";
import AddReview from "../../Components/AddReview";
import { toast } from "react-toastify";
import { FaStar, FaRegStar, FaQuoteLeft, FaUserCircle } from "react-icons/fa";
import { MdRateReview, MdDelete } from "react-icons/md";
import { BiComment } from "react-icons/bi";

const Blog = () => {
  const [data, setData] = useState({ user: {}, post: 0 });
  const [postDatas, setPostDatas] = useState([]);
  const [commentDatas, setCommentDatas] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const { showPopupLogin, setShowPopupLogin } = useContext(showLogin);
  const [addReview, setAddReview] = useState(false);
  const [postId, setPostId] = useState("");
  const [myPosts, setMyPosts] = useState([]);
  const [showMyReviews, setShowMyReviews] = useState(false);
  const [userId, setUserId] = useState(null);

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
          setUserId(response.data.user._id);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);

  const handlePostReview = () => {
    if (!isAuthenticated) {
      setShowPopupLogin(true);
    } else {
      setAddReview(true);
    }
  };

  const handleShowReview = async () => {
    if (!isAuthenticated) {
      setShowPopupLogin(true);
    } else {
      const response = await axios.get("/api/post/myPosts");
      setShowMyReviews(true);
      setMyPosts(response.data.posts);
    }
  };

  const handleDeletePost = async (id) => {
    console.log(id);
    const response = await axios.delete(`/api/post/delete/${id}`);
    if (response.data.success) {
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      toast.error(response.data.message);
    }
  };

  const handleShowComments = async (e, i) => {
    e.preventDefault();
    const id = postDatas[i]._id;
    setPostId(id);
    setShowComments((prev) => !prev);
  };

  return (
    <>
      <div className={`blogBody ${showSidebar ? "" : "fullWidth"}`}>
        {/* Sidebar */}
        <aside className={`blog-sidebar ${showSidebar ? "" : "hidden"}`}>
          <div className={`sidebar-container ${showSidebar ? "slideIn" : "slideOut"}`}>
            {showSidebar && (
              <>
                <button className="close-btn" onClick={() => setShowSidebar((prev) => !prev)}>
                  <RxCross2 />
                </button>

                <div className="profile-section">
                  <div className="avatar-circle">
                    <FaUserCircle />
                  </div>
                  <h3>{data.user?.name || "Guest"}</h3>
                  <p className="email">{data.user?.email}</p>
                </div>

                <div className="stats-section">
                  <div className="stat-item">
                    <MdRateReview />
                    <div>
                      <h4>{data.postCount || 0}</h4>
                      <p>Reviews Posted</p>
                    </div>
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="primary-btn" onClick={handlePostReview}>
                    <span className="btn-icon">+</span>
                    <span className="btn-text">Write a Review</span>
                  </button>

                  <button
                    className="secondary-btn"
                    onClick={showMyReviews ? () => setShowMyReviews(false) : handleShowReview}
                  >
                    {showMyReviews ? "See All Reviews" : "My Reviews"}
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="blog-content">
          {/* Header */}
          <div className="content-header">
            {!showSidebar && (
              <button className="menu-toggle" onClick={() => setShowSidebar((prev) => !prev)}>
                <IoOptionsSharp />
              </button>
            )}

            <div className="header-content">
              <h1>
                {showMyReviews ? "My Travel Reviews" : "Passenger Reviews & Testimonials"}
              </h1>
              <p className="subtitle">
                {showMyReviews
                  ? "Manage and view your flight experiences"
                  : "Real experiences from real travelers"}
              </p>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="reviews-container">
            {(showMyReviews ? myPosts : postDatas).map((post, i) => (
              <div className="review-card" key={i}>
                <div className="review-header">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      <FaUserCircle />
                    </div>
                    <div className="reviewer-details">
                      <h4>{post.userId.name}</h4>
                      <p className="review-time">
                        <ReactTimeAgo date={post.createdAt} />
                      </p>
                    </div>
                  </div>

                  {post.userId._id === userId && (
                    <button
                      className="delete-btn"
                      onClick={() => handleDeletePost(post._id)}
                      title="Delete review"
                    >
                      <MdDelete />
                    </button>
                  )}
                </div>

                <div className="review-content">
                  <FaQuoteLeft className="quote-icon" />
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>

                <div className="review-footer">
                  <div className="comment-count">
                    <BiComment />
                    <span>{post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}</span>
                  </div>
                  <button
                    className="comment-btn"
                    onClick={(e) => handleShowComments(e, i)}
                  >
                    View Comments
                  </button>
                </div>
              </div>
            ))}

            {(showMyReviews ? myPosts : postDatas).length === 0 && (
              <div className="empty-state">
                <MdRateReview />
                <h3>{showMyReviews ? "No reviews yet" : "Be the first to review"}</h3>
                <p>{showMyReviews ? "Share your travel experience with us!" : "Help others by sharing your experience"}</p>
                {!isAuthenticated && (
                  <button className="primary-btn" onClick={() => setShowPopupLogin(true)}>
                    Login to Review
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {showComments && (
          <Comment
            showComments={showComments}
            setShowComments={setShowComments}
            commentDatas={commentDatas}
            postId={postId}
          />
        )}

        {addReview && (
          <AddReview addReview={addReview} setAddReview={setAddReview} />
        )}
      </div>
    </>
  );
};

export default Blog;
