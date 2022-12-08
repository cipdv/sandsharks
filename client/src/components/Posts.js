import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { replyToPost, deletePost } from '../actions/postActions'

const Posts = ({user}) => {

    const dispatch = useDispatch()

    const { posts } = useSelector(state=>state.postReducer)
    const latestPost = posts[posts.length - 1]

    const [errors, setErrors] = useState({})

    const data = {
        name: user.preferredName,
        email: user.email,
        userId: user._id,
        reply: ''
    }

    const submitYes = async (e) => {
        e.preventDefault()
        if(latestPost) {
            dispatch(replyToPost({...data, reply: 'yes'}, latestPost._id, setErrors))
        } else {
            console.log('no post')
        }
    }

    const submitNo = (e) => {
        e.preventDefault()
        if(latestPost) {
            dispatch(replyToPost({...data, reply: 'no'}, latestPost._id, setErrors))
        } else {
            console.log('no post')
        }
    }

    const submitMaybe = (e) => {
        e.preventDefault()
        if(latestPost) {
            dispatch(replyToPost({...data, reply: 'maybe'}, latestPost._id, setErrors))
        } else {
            console.log('no post')
        }
    }

    const handleUpdatePost = (e) => {
        e.preventDefault()
        console.log('update')
    }

    const handleDelete = (postId) => {
        if(latestPost && window.confirm('Are you sure you want to delete this post?')) {
            dispatch(deletePost(postId, setErrors))
        }
    }


    return (
        <div className='post'>
            <h4>{latestPost && latestPost.postTitle}</h4>
            <p>
                {latestPost && latestPost.message}
            </p>
            <h5>When: {latestPost && latestPost.date}</h5>
            <h5>Setting up at {latestPost && latestPost.startTime} until {latestPost && latestPost.endTime}</h5>
            <div>
                <h5>Who's coming:</h5>
                {
                    latestPost && latestPost.replies.map((reply)=>{
                        if(reply.reply === 'yes') {
                            return <p>{reply.name}</p>
                        } else if (reply.reply === 'no' || 'maybe') {
                            return <p></p>
                        } else {
                            return <p>No one yet</p>
                        }
                    })
                }
            </div>
            <div>
                <button className='btn' onClick={submitYes}>Yasss, I'll be there</button>
                <button className='btn' onClick={submitMaybe}>Slay, I might come</button>
                <button className='btn' onClick={submitNo}>I can't make it (aka I have brunch plans)</button>
                {errors.message && <p className='error-msg'>{errors.message}</p>}
            </div>
            {
                user.adminStatus === 'yes' ? (
                    <div>
                        <button className='btn-pink' onClick={()=> handleUpdatePost(latestPost._id)}>Update post</button>
                        <button className='btn-pink' onClick={() => handleDelete(latestPost._id)}>Delete post</button>
                    </div>
                ) : (
                    <></>
                )
            }
        </div>
    )
}

export default Posts