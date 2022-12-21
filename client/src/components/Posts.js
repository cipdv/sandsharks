import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { replyToPost, deletePost, updatePost } from '../actions/postActions'

const Posts = ({user}) => {

    const dispatch = useDispatch()

    const { posts } = useSelector(state=>state.postReducer)
    const latestPost = posts[posts.length - 1]
    
    const [postTitle, setPostTitle] = useState('')
    const [message, setMessage] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [date, setDate] = useState('')
    const [beginnerClinicOffered, setBeginnerClinicOffered] = useState(false)
    const [beginnerClinicStartTime, setBeginnerClinicStartTime] = useState('')
    const [beginnerClinicEndTime, setBeginnerClinicEndTime] = useState('')
    const [seekingReplies, setSeekingReplies] = useState(false)

    const [errors, setErrors] = useState({})

    useEffect(()=>{
        if(latestPost) {
            setPostTitle(latestPost.postTitle)
            setMessage(latestPost.message)
            setStartTime(latestPost.startTime)
            setEndTime(latestPost.endTime)
            setDate(latestPost.date)
            setSeekingReplies(latestPost.seekingReplies)
            setBeginnerClinicOffered(latestPost.beginnerClinic[0].beginnerClinicOffered)
            setBeginnerClinicStartTime(latestPost.beginnerClinic[0].beginnerClinicStartTime)
            setBeginnerClinicEndTime(latestPost.beginnerClinic[0].beginnerClinicEndTime)
        }
    }, [latestPost])

    const data = {
        name: user.preferredName,
        email: user.email,
        userId: user._id,
        reply: ''
    }

    const formData = {
        postTitle,
        message,
        startTime,
        endTime,
        date,
        beginnerClinic: {
            beginnerClinicOffered,
            beginnerClinicStartTime,
            beginnerClinicEndTime,
        },
        seekingReplies
    }

    const clear = () => {
        setPostTitle('')
        setMessage('')
        setStartTime('')
        setEndTime('')
        setDate('')
        setSeekingReplies(false)
        setBeginnerClinicOffered(false)
        setBeginnerClinicStartTime('')
        setBeginnerClinicEndTime('')
    }

    const submitYes = async (e) => {
        e.preventDefault()
        setErrors({})
        if(latestPost) {
            dispatch(replyToPost({...data, reply: 'yes'}, latestPost._id, setErrors))
        } else {
            console.log('no post')
        }
    }

    const submitNo = (e) => {
        e.preventDefault()
        setErrors({})
        if(latestPost) {
            dispatch(replyToPost({...data, reply: 'no'}, latestPost._id, setErrors))
        } else {
            console.log('no post')
        }
    }

    const submitMaybe = (e) => {
        e.preventDefault()
        setErrors({})
        if(latestPost) {
            dispatch(replyToPost({...data, reply: 'maybe'}, latestPost._id, setErrors))
        } else {
            console.log('no post')
        }
    }

    const handleUpdatePost = (e) => {
        if(latestPost && window.confirm('Are you sure you want to update this post?')) {
            dispatch(updatePost(formData, latestPost._id, setErrors))
        } 
    }

    const handleDeletePost = (postId) => {
        if(latestPost && window.confirm('Are you sure you want to delete this post?')) {
            dispatch(deletePost(postId, setErrors))
            clear()
            
        }
    }

    const countReplies = (rep) => {
        if(latestPost) {
            const numOfYes = latestPost.replies.filter(r => r.reply === rep).length
            return (
                <>{numOfYes}</>
            )
        }
    }

    const clinciReplies = (rep) => {
        if(latestPost && latestPost.beginnerClinic[0]) {
            const numOfYes = latestPost.beginnerClinic[0].replies.filter(r => r.reply === rep).length
            return (
                <>{numOfYes}</>
            )
        }
    }

    return (
        <div className='post'>  
            {
                user.adminStatus === 'yes' ? (
                    <div>
                        <h4>Latest Posts</h4>
                        {errors.message && <p className='error-msg'>{errors.message}</p>}
                        <div>
                            <label>Post title:</label>
                            <input type='text' value={postTitle} onChange={e=>setPostTitle(e.target.value)} />
                        </div>
                        <div>
                            <label>Post message:</label>
                            <textarea value={message} onChange={e=>setMessage(e.target.value)} />
                        </div>
                        <div>
                            <label>Date:</label>
                            <input type='date' value={date} onChange={e=>setDate(e.target.value)} />
                        </div>
                        <div>
                            <label>Start time:</label>
                            <input type='time' value={startTime} onChange={e=>setStartTime(e.target.value)} />
                        </div>
                        <div>
                            <label>End time:</label>
                            <input type='time' value={endTime} onChange={e=>setEndTime(e.target.value)} />
                        </div>
                        <div>
                            <h4>Who's coming:</h4>
                            <h5>Yes: {countReplies('yes')}</h5>
                            {
                                latestPost && latestPost.replies.map((reply)=>{
                                    if(reply.reply === 'yes') {
                                        return <p id={reply._id}>{reply.name}</p>
                                    } 
                                    else {
                                        return <></>
                                    }
                                })
                            }
                            <h5>Maybe: {countReplies('maybe')}</h5>
                            {
                                latestPost && latestPost.replies.map((reply)=>{
                                    if(reply.reply === 'maybe') {
                                        return <p id={reply._id}>{reply.name}</p>
                                    } 
                                    else {
                                        return <></>
                                    }
                                })
                            }
                            <h5>No: {countReplies('no')}</h5>
                            {
                                latestPost && latestPost.replies.map((reply)=>{
                                    if(reply.reply === 'no') {
                                        return <p id={reply._id}>{reply.name}</p>
                                    } 
                                    else {
                                        return <></>
                                    }
                                })
                            }
                        </div>
                        <div>
                            <label>Seeking replies?</label>
                            <input type='checkbox' checked={seekingReplies} onChange={e=>latestPost && setSeekingReplies(e.target.checked)} />
                        </div>
                        {
                            latestPost && latestPost.seekingReplies ? (
                                <div>
                                    <button className='btn' onClick={submitYes}>Yasss, I'll be there</button>
                                    <button className='btn' onClick={submitMaybe}>Slay, I might come</button>
                                    <button className='btn' onClick={submitNo}>I can't make it (aka I have brunch plans)</button>
                                </div>
                            ) : (
                                <></>
                            )
                        }
                        <div>
                            <h3>Beginner Clinic</h3>
                            <label>Beginner clinic offered?</label>
                            <input type='checkbox' checked={beginnerClinicOffered} onChange={e=>latestPost && setBeginnerClinicOffered(e.target.checked)} />
                        </div>
                        {beginnerClinicOffered ? (
                            <div>
                                <div>
                                    <label>Clinic start time</label>
                                    <input type='time' value={beginnerClinicStartTime} onChange={e=>setBeginnerClinicStartTime(e.target.value)} />
                                </div>
                                <div>
                                    <label>Clinic end time</label>
                                    <input type='time' value={beginnerClinicEndTime} onChange={e=>setBeginnerClinicEndTime(e.target.value)} />
                                </div>
                                <div>
                                    <h4>Who's coming:</h4>
                                    <h5>Yes: {clinciReplies('yes')}</h5>
                                    {
                                        latestPost && latestPost.beginnerClinic[0].replies.map((reply)=>{
                                            if(reply.reply === 'yes') {
                                                return <p id={reply._id}>{reply.name}</p>
                                            } 
                                            else {
                                                return <></>
                                            }
                                        })
                                    }
                                    <h5>Maybe: {clinciReplies('maybe')}</h5>
                                    {
                                        latestPost && latestPost.beginnerClinic[0].replies.map((reply)=>{
                                            if(reply.reply === 'maybe') {
                                                return <p id={reply._id}>{reply.name}</p>
                                            } 
                                            else {
                                                return <></>
                                            }
                                        })
                                    }
                                    <h5>No: {clinciReplies('no')}</h5>
                                    {
                                        latestPost && latestPost.beginnerClinic[0].replies.map((reply)=>{
                                            if(reply.reply === 'no') {
                                                return <p id={reply._id}>{reply.name}</p>
                                            } 
                                            else {
                                                return <></>
                                            }
                                        })
                                    }
                                </div>
                            </div>                          
                        ) : (<></>)}                     
                        <div>
                            <button className='btn-pink' onClick={()=> latestPost && handleUpdatePost(latestPost._id)}>Update post</button>
                            <button className='btn-pink' onClick={() => latestPost && handleDeletePost(latestPost._id)}>Delete post</button>
                        </div>
                        {errors.message && <p className='error-msg'>{errors.message}</p>}
                    </div>
                ) : (
                    <>
                        {!latestPost ? (
                            <div className='post'>
                                <p>No upcoming beach volleyball days have been set. Keep checking back for updates :D</p>
                            </div>
                        ) : (
                            <div>
                                <h4>{latestPost && latestPost.postTitle}</h4>
                                <p>
                                    {latestPost && latestPost.message}
                                </p>
                                {
                                    latestPost && latestPost.date ? (
                                        <h5>When: {latestPost.date}</h5>
                                    ) : (<></>)
                                }
                                {
                                    latestPost && latestPost.startTime ? (
                                        <h5>Setting up at {latestPost && latestPost.startTime} until {latestPost && latestPost.endTime}</h5>
                                    ) : (<></>)
                                }
                                
                                <div>
                                    {
                                        latestPost && latestPost.replies.length !== 0 ? (
                                            <div>
                                                <h5>Who's coming:</h5>                                  
                                                {latestPost.replies.map((reply)=>{
                                                    if(reply.reply === 'yes') {
                                                        return <p id={reply._id}>{reply.name}</p>
                                                    } else if (reply.reply === 'no' || 'maybe') {
                                                        return <p id={reply._id}></p>
                                                    } else {
                                                        return <p id={reply._id}>No one yet</p>
                                                    }
                                                })
                                                }
                                            </div>
                                        ) : (<></>)
                                    }
                                </div>                               
                                {
                                    latestPost && latestPost.seekingReplies ? (
                                        <div>
                                            <button className='btn' onClick={submitYes}>Yasss, I'll be there</button>
                                            <button className='btn' onClick={submitMaybe}>Slay, I might come</button>
                                            <button className='btn' onClick={submitNo}>I can't make it (aka I have brunch plans)</button>
                                            {errors.message && <p className='error-msg'>{errors.message}</p>}
                                        </div>
                                    ) : (
                                        <></>
                                    )
                                }                      
                            </div>
                        )}
                    </>
                )
            }
        </div>
    )
}

export default Posts