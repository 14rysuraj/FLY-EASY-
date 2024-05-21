import mongoose from 'mongoose';
import Comment from './comment.js';

const postSchema = new mongoose.Schema({

    title: {
    type: String,
    required: true,
 
},

    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    likes: [{
      
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
       
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
}, {
    timestamps: true,
});

export const Post = mongoose.model('Post', postSchema);

