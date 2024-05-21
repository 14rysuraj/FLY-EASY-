import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Reply'
        }],
  
}, {
    timestamps: true,
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;