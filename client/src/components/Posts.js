import React from 'react'
import { useSelector } from 'react-redux'

const Posts = () => {

    const { posts } = useSelector(state=>state.postReducer)
    const latestPost = posts[posts.length - 1]

    const submitYes = (e) => {
        e.preventDefault()
        console.log('i will be there')
    }

    const submitNo = (e) => {
        e.preventDefault()
        console.log('i will not be there')
    }

    const submitMaybe = (e) => {
        e.preventDefault()
        console.log('i might be there')
    }

    return (
        <div className='post'>
            <h4>Latest Update</h4>
            <p>
                {latestPost && latestPost.message}
            </p>
            <h5>When: {latestPost && latestPost.date}</h5>
            <h5>Setting up at {latestPost && latestPost.startTime} until {latestPost && latestPost.endTime}</h5>
{/* show who is going here */}
            <div>
                <button className='btn' onClick={submitYes}>Yasss, I'll be there</button>
                <button className='btn' onClick={submitMaybe}>Slay, I might come</button>
                <button className='btn' onClick={submitNo}>I can't make it (aka I have brunch plans)</button>
            </div>
        </div>
    )
}

export default Posts