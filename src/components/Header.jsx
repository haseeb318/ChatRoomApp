import React from 'react'
import { LogOut } from 'react-feather'
import { useAuth } from '../utils/AuthContext'

const Header = () => {
    const {user,handleUserLogout} = useAuth()
    console.log("Header user ", user)
  return (
    <div id='header--wrapper'>
     {user?(
        <>
        welcome {user.name}
        <LogOut onClick={handleUserLogout} className='header--link'/>
        </>
     ):(
        <Button>Login</Button>
     )}
    </div>
  )
}

export default Header