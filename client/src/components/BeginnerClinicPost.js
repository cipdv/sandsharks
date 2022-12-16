import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { replyToClinic } from '../actions/postActions'
 
const BeginnerClinicPost = ({user}) => {

    const dispatch = useDispatch()

    const [errors, setErrors] = useState({})

    const { posts } = useSelector(state=>state.postReducer)
    const latestPost = posts[posts.length - 1]

    useEffect(()=>{
        
    }, [latestPost])

    const data = {
        name: user.preferredName,
        email: user.email,
        userId: user._id,
        reply: ''
    }

    const submitYes = async (e) => {
        e.preventDefault()
        setErrors({})
        if(latestPost) {
            dispatch(replyToClinic({...data, reply: 'yes'}, latestPost._id, setErrors))
        } else {
            console.log('no post')
        }
    }

    const submitNo = (e) => {
        e.preventDefault()
        setErrors({})
        if(latestPost) {
            dispatch(replyToClinic({...data, reply: 'no'}, latestPost._id, setErrors))
        } else {
            console.log('no post')
        }
    }

    const submitMaybe = (e) => {
        e.preventDefault()
        setErrors({})
        if(latestPost) {
            dispatch(replyToClinic({...data, reply: 'maybe'}, latestPost._id, setErrors))
        } else {
            console.log('no post')
        }
    }

    if (latestPost && latestPost.beginnerClinic[0].beginnerClinicOffered) {
        return (
            <div className='post'>
                <h3>Beginner Clinic</h3>
                <div>
                    <h5>A clinic for new players will be hosted from {latestPost.beginnerClinic[0].beginnerClinicStartTime} until {latestPost.beginnerClinic[0].beginnerClinicEndTime} on {latestPost.date}</h5>
                {
                    latestPost && latestPost.beginnerClinic[0].replies.length !== 0 ? (
                        <div>
                            <h5>Who's coming:</h5>                                  
                            {latestPost.beginnerClinic[0].replies.map((reply)=>{
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
                <div>
                    <button className='btn' onClick={submitYes}>Yasss, I'll be there</button>
                    <button className='btn' onClick={submitMaybe}>Slay, I might come</button>
                    <button className='btn' onClick={submitNo}>I can't make it (aka I have brunch plans)</button>
                    {errors.message && <p className='error-msg'>{errors.message}</p>}
                </div>          
            </div>
        </div>
        )
    } else {
        return (
            <>
                {user.vballExperience === 'novballexperience' ? (
                    <div>
                        Updates for beginner clinics will show up here when they're running. Keep checking back for updates.
                    </div>
                ) : (<></>)}
            </>
        )
    }
}

export default BeginnerClinicPost