import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { submitPost } from '../actions/postActions'
import LoadingScreen from './Loader'

const PostMessage = () => {

    const dispatch = useDispatch()

    const [postTitle, setPostTitle] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [date, setDate] = useState('')
    const [message, setMessage] = useState('')
    const [beginnerClinicOffered, setBeginnerClinicOffered] = useState(false)
    const [beginnerClinicStartTime, setBeginnerClinicStartTime] = useState('')
    const [beginnerClinicEndTime, setBeginnerClinicEndTime] = useState('')
    const [seekingReplies, setSeekingReplies] = useState(false)

    const [errors, setErrors] = useState({})

    const formData = {
        postTitle,
        startTime,
        endTime,
        date,
        message,
        beginnerClinic: {
            beginnerClinicOffered,
            beginnerClinicStartTime,
            beginnerClinicEndTime,
        },
        seekingReplies
    }

    const clearStates = () => {
        setPostTitle('')
        setStartTime('')
        setEndTime('')
        setDate('')
        setMessage('')
        setErrors('')
        setSeekingReplies(false)
        setBeginnerClinicEndTime(false)
        setBeginnerClinicStartTime('')
        setBeginnerClinicEndTime('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(submitPost(formData, setErrors))
        if(beginnerClinicOffered) {
            //dispatch submit beginner clinic
        }
        clearStates()
    }

    return (
        <>
            <LoadingScreen />
            <div className='post'>
                <h4>Post a New Message to the Group</h4>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Post title:</label>
                        <input type='text' value={postTitle} onChange={e=>setPostTitle(e.target.value)} />
                    </div>
                    <div>
                        <label>Update for:</label>
                        <input type='date' value={date} onChange={e=>setDate(e.target.value)} />
                    </div>
                    <div>
                        <label>Start time</label>
                        <input type='time' value={startTime} onChange={e=>setStartTime(e.target.value)} />
                    </div>
                    <div>
                        <label>End time</label>
                        <input type='time' value={endTime} onChange={e=>setEndTime(e.target.value)} />
                    </div>
                    <div>
                        <label>Post a new message to the group</label>
                        <textarea placeholder='send a fun message to the group' value={message} onChange={e=>setMessage(e.target.value)} />
                        {errors.message && <p className='error-msg'>{errors.message}</p>}
                    </div>
                    <div>
                        <label>Beginner clinic offered?</label>
                        <input type='checkbox' checked={beginnerClinicOffered} onChange={e=>setBeginnerClinicOffered(e.target.checked)} />
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
                        </div>
                    ) : (<></>)}
                    <div>
                        <label>Seeking replies?</label>
                        <input type='checkbox' checked={seekingReplies} onChange={e=>setSeekingReplies(e.target.checked)} />
                    </div>
                    <button className='btn' type='submit'>Post Message</button>
                </form>
            </div>
        </>
        
    )
}

export default PostMessage