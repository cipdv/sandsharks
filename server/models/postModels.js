import mongoose from "mongoose"

const postRepliesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    reply: {
        type: String,
        required: true
    }
})

const begClinicRepliesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    reply: {
        type: String,
        required: true
    }
})

const beginnerClinicSchema = mongoose.Schema({
    beginnerClinicOffered: {
        type: Boolean,
        default: false
    },
    beginnerClinicStartTime: {
        type: String
    },
    beginnerClinicEndTime: {
        type: String
    },
    replies: [begClinicRepliesSchema]
})



const postSchema = mongoose.Schema({
    postTitle: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
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
    },
    beginnerClinic: [beginnerClinicSchema],
    seekingReplies: {
        type: Boolean,
        default: true
    },
    replies: [postRepliesSchema]
}, {
    timestamps: true
})

postSchema.index({createdAt: 1}, {expireAfterSeconds: 86400})

const Post = mongoose.model('Post', postSchema)
// const PostReplies = mongoose.model('PostReplies', postRepliesSchema)

export default Post

