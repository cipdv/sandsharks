import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//components
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import { useSelector } from 'react-redux';


function App() {

  const user = useSelector(state => state.authReducer.user)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/dashboard' element={user ? <DashboardScreen /> : <LoginScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
