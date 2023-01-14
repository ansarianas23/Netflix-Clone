import React from 'react'
import { useSelector } from 'react-redux'
import "../components/ProfileScreen.css"
import { selectUser } from '../features/userSlice'
import { auth } from '../firebase'
import Navbar from './Navbar'
import PlanScreen from '../components/PlanScreen'

const ProfileScreen = () => {
    const user = useSelector(selectUser);

  return (
    <div className='profileScreen'>
        <Navbar/>
        <div className='profileScreen__body'>
            <h1>Edit Profile</h1>
            <div className='profileScreen__info'>

                <img src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' alt='avatar-logo'/>

                <div className='profileScreen__details'>
                    <h2 className=''>{user.email}</h2>
                    <div className='profileScreen__plans'>
                        <h3>Plans</h3>
                        <PlanScreen/>
                        
                        <button onClick={()=>auth.signOut()} className='profileScreen__signout'>Sign Out</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default ProfileScreen
