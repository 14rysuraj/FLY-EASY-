import Comment from "../models/comment.js";
import { Post } from "../models/post.js";
import { Reply } from "../models/reply.js";

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id;

    const post = Post.create({
      title,
      description,
      userId,
      likes: [],
      comments: [],
    });
    if (post) {
      res.status(201).json({
        success: true,
        message: "Post Created Successfully",
        post,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const likeanddislike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((like) => like.toString() != userId);
      await post.save();
      res.status(200).json({
        success: true,
        message: "Post disliked Successfully",
        post,
      });
    } else {
      post.likes.push(userId);
      await post.save();
      res.status(200).json({
        success: true,
        message: "Post liked Successfully",
        post,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const comment = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    const { commentText } = req.body;

    const comment = await Comment.create({
      comment: commentText,
      userId,
      likes: [],
      replies: [],
    });

    post.comments.push(comment);

    await post.save();

    res.status(200).json({
      success: true,
      message: "Comment Added Successfully",
      comment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const replies = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment Not Found",
      });
    }

    const { reply } = req.body;

    const replies = await Reply.create({
      reply,
      userId,
      likes: [],
    });

    comment.replies.push(replies);
    await comment.save();

    res.status(200).json({
      success: true,
      message: "Reply Added Successfully",
      comment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const allPosts = async (req, res) => {
  let post = await Post.find().populate("userId");

  post = post.reverse();

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post Not Found",
    });
  }

  res.status(200).json({
    success: true,
    post,
  });
};

export const postComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    const postCommentsId = post.comments;

    const comments = await Comment.find({
      _id: {
        $in: postCommentsId,
      },
    }).populate("userId");

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const myPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const posts = await Post.find({
      userId,
    }).populate("userId");

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteMyPost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post Not Found",
      });
    }

    if (post.userId.toString() != userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteMyComment = async (req, res) => {
    try {

        const { commentId } = req.params;


        const userId = req.user._id;

 
        const comment = await Comment.findById(commentId);

  
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found.",
            });
        }


        if (String(comment.userId)!== String(userId)) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this comment.",
            });
        }

        await comment.deleteOne();


        const post = await Post.findOne({ 'comments': commentId });

     
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found.",
            });
        }


        post.comments = post.comments.filter(id => id.toString()!== commentId);

   
        await post.save();

        res.status(200).json({
            success: true,
            message: "Comment deleted successfully.",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing your request.",
            error: error.message,
        });
    }
};