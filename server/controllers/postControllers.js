import asyncHandler from 'express-async-handler'
import Post from '../models/postModels.js'

//desc: submit a new post
//route: POST /api/posts
//access: private admin
const submitPost = asyncHandler(async (req, res) => {
    const { postTitle, message, date, startTime, endTime } = req.body
    try {
        if (message) {
            const post = await new Post({postTitle, message, date, startTime, endTime, createdAt: new Date()})
            const newPost = await post.save()
            res.status(200).json(newPost)
        } else {
            return res.status(401).json({message: 'Message required'})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message: 'Something went wrong, check all fields and try again'})
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

//desc: update post with a reply
//route: PUT /api/posts/reply/:id
//access: private
const replyToPost = asyncHandler(async(req, res) => {

    const postId = req.params.id

    try {
        const post = await Post.findById(postId)
        post.replies.push(req.body)
        post.isNew
        post.save()

        if (post) {
            res.status(200).json(post)
        } else {
            return res.status(400).json({message: 'Something went wrong, try again'})
        }
    } catch (error) {
        console.log(error)
    }
})

export { submitPost, getPosts, replyToPost }