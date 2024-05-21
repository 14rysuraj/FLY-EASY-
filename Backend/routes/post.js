
import express from 'express';
import { allPosts, comment, createPost, likeanddislike, postComments, replies } from '../controllers/post.js';
import { isAuthenticated } from '../middlewares/auth.js';


const router = express.Router();

router.post('/create', isAuthenticated, createPost);
router.post('/like/:postId', isAuthenticated, likeanddislike);
router.post('/comment/:postId', isAuthenticated, comment);
router.post('/comment/reply/:commentId', isAuthenticated, replies);
router.get('/posts', allPosts);
router.get('/posts/comments/:postId', postComments);



export default router;