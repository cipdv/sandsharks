import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    }
}, {
    timestamps: true
})


const Post = mongoose.model('Post', postSchema)

export default Post

