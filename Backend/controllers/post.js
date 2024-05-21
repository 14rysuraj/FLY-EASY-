import Comment from "../models/comment.js";
import { Post } from "../models/post.js";
import {Reply } from "../models/reply.js";


export const createPost = async(req, res) => {


    try {


        const {title, description } = req.body;
        const userId = req.user._id;
    
        const post = Post.create({
            title,
            description,
            userId,
            likes: [],
            comments: [],
    
    
        })
        if (post) {
                res.status(201).json({
                    success: true,
                    message: "Post Created Successfully",
                    post,
                })
        }
        
        
    } catch (error) {
        
        res.status(400).json({
            success: false,
            error: error.message,
        })
    }
    
   
    

}

export const likeanddislike = async (req, res) => {
    
    try {
        const { postId } = req.params;
        const userId  = req.user._id;

        const post = await Post.findById(postId);
    
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found",
            })
        }

        const alreadyLiked = post.likes.includes(userId);
    
        if (alreadyLiked) {
            post.likes = post.likes.filter(like => like.toString()!= userId);
            await post.save();
            res.status(200).json({
                success: true,
                message: "Post disliked Successfully",
                post,
            });
        }
        else {
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
        })
    }



}

export const comment = async (req, res) => {
    
    try {
        const { postId } = req.params;
        const userId = req.user.id;
        
        const post = await Post.findById(postId);
        
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found",
            })
        }
    
        const { commentText } = req.body;
    
        const comment =await Comment.create({
            comment: commentText,
            userId,
            likes: [],
            replies: [],
        })

        post.comments.push(comment);
        
        await post.save();


        res.status(200).json({
            success: true,
            message: "Comment Added Successfully",
            post,
        })
    
    } catch (error) {
        
        res.status(400).json({
            success: false,
            error: error.message,
        })
    
}


    

}


export const replies = async (req, res) => {
    

    try {


        const { commentId } = req.params;
        const userId = req.user.id;
    
        const comment =await Comment.findById(commentId);
        
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment Not Found",
            })
        }
        
        const { reply } = req.body;
    
    
        const replies =await Reply.create({
           reply,
            userId,
            likes: [],
         
        })
    
    
        comment.replies.push(replies);
        await comment.save();
        
        res.status(200).json({
            success: true,
            message: "Reply Added Successfully",
            comment,
        })
        
    } catch (error) {

        res.status(400).json({
            success: false,
            error: error.message,
        })
        
    }
    

    
}

export const allPosts = async (req, res) => {
    

let post = await Post.find().populate('userId')
    
  
post= post.reverse();

    
    
    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post Not Found",
        })
    }

    res.status(200).json({
        success: true,
        post,
    })


}


export const postComments = async (req, res) => {



    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);
    
        const postCommentsId = post.comments;

        const comments = await Comment.find({
            _id: {
                $in: postCommentsId,
            },
        });
        


    
        res.status(200).json({
            success: true,
            comments
            
        })
        
    } catch (error) {

        res.status(400).json({
            success: false,
            error: error.message,
        })
        
    }
    
   






}