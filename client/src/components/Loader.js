import React from 'react'
import BallLoader from '../images/BallLoader.gif'
import { useSelector } from 'react-redux'

const LoadingScreen = () => {

  const loading = useSelector((state)=>state.loadingReducer.loading)

  if (!loading) {
    return null
  }

  return (
    <div className="loader">
        <img src={BallLoader} alt='loading'/>
  </div>
  )
}

export default LoadingScreen