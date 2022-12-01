import React from 'react'
import BallLoader from '../images/BallLoader.gif'
import { useSelector } from 'react-redux'

const LoadingScreen = () => {

  const loading = useSelector((state)=>state.loadingReducer.loading)

  if (!loading) {
    return null
  }

  return (
    <div class="loader">
        <img src={BallLoader} />
  </div>
  )
}

export default LoadingScreen