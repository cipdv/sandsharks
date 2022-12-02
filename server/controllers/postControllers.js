import asyncHandler from 'express-async-handler'
import Post from '../models/postModels.js'

//desc: submit a new post
//route: POST /api/posts
//access: private admin
const submitPost = asyncHandler(async (req, res) => {
    const { message, date, startTime, endTime } = req.body
    try {
        if (message) {
            const post = await new Post({message, date, startTime, endTime})
            const newPost = await post.save()
            res.status(200).json(newPost)
        } else {
            return res.status(401).json({message: 'Message required'})
        }
    } catch (error) {
        console.log(error)
    }
})

//desc: get all posts
//route: GET /api/posts
//access: private
const getPosts = asyncHandler(async(req, res) => {
    try {
        const posts = await Post.find()
        if (posts) {
            res.status(200).json(posts)
        } else {
            return res.status(400).json({message: 'No posts available'})
        }
    } catch (error) {
        console.log(error)
    }
})

export { submitPost, getPosts }