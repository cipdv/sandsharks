import asyncHandler from 'express-async-handler'
import Post from '../models/postModels.js'

//desc: submit a new post
//route: POST /api/posts
//access: private admin
const submitPost = asyncHandler(async (req, res) => {
    const { message } = req.body
    try {
        if (message) {
            const post = await new Post({message})
            const newPost = await post.save()
            res.status(200).json(newPost)
        } else {
            return res.status(401).json({message: 'Message required'})
        }
    } catch (error) {
        console.log(error)
    }
})

export { submitPost }