import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';

//components
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import Header from './components/Header';

function App() {

  const user = useSelector(state => state.authReducer.user)

  return (
    <Router>
      <Header user={user}/>
      <Routes>
        <Route path='/' element={user ? <DashboardScreen /> : <HomeScreen />} />
        <Route path='/login' element={user ? <DashboardScreen /> : <LoginScreen />} />
        <Route path='/register' element={user ? <DashboardScreen /> : <RegisterScreen />} />
        <Route path='/dashboard' element={user ? <DashboardScreen /> : <LoginScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
