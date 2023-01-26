import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';

//components
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import Header from './components/Header';
import UpdateProfileScreen from './screens/UpdateProfileScreen';
import DeleteProfileScreen from './screens/DeleteProfileScreen';
import ViewProfilesScreen from './screens/ViewProfilesScreen';
import Footer from './components/Footer';
import WaiverCoC from './screens/WaiverCoC';

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
        <Route path='/updateprofile' element={user ? <UpdateProfileScreen /> : <LoginScreen />} />
        <Route path='/deleteprofile' element={user ? <DeleteProfileScreen user={user} /> : <LoginScreen />} />
        <Route path='/viewprofiles' element={user ? <ViewProfilesScreen /> : <LoginScreen />} />
        <Route path='/waiverandcodeofconduct' element={user ? <WaiverCoC /> : <LoginScreen />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
