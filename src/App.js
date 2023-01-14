import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        // Logged In
        // console.log(userAuth);
        dispatch(login({
          uid : userAuth.uid,
          email: userAuth.email,
        }))
      }
      else{
        // Logged out
        dispatch(logout())
      }
    });

    return unsubscribe

  },[dispatch]);


  return (
    <div className="app">
      
      <BrowserRouter>
      {!user ? (
        <LoginScreen/>
      ): <Routes>
      <Route eaxct path='/' element={<HomeScreen/>} />
      <Route eaxct path='/profile' element={<ProfileScreen/>} />
    </Routes>}
      
      
      
      </BrowserRouter>
    </div>
  );
}

export default App;
