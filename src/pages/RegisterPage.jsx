import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'

const RegisterPage = () => {

  const {handleUserRegister}=useAuth()

  const [credentials ,setCredentials]=useState({
    name:"",
    email:"",
    password1:"",
    password2:""
  })

  const handleInputChange =(e)=>{
    let name = e.target.name
    let value = e.target.value
    setCredentials({...credentials,[name]:value})
    // console.log(credentials)
  }

  return (
    <div className='auth--container'>
    
    <div className='form--wrapper'>
      <form onSubmit={(e)=>{handleUserRegister(e,credentials)}}>

      <div className='field--wrapper'>
          <label htmlFor="">Name:</label>
          <input 
          type="text"
          required
          name='name'
          placeholder='Enter your Name...' 
          value={credentials.name}
          onChange={handleInputChange}
          />
        </div>

        <div className='field--wrapper'>
          <label htmlFor="">Email:</label>
          <input 
          type="email"
          required
          name='email'
          placeholder='Enter your Email...' 
          value={credentials.email}
          onChange={handleInputChange}
          />
        </div>

        <div className='field--wrapper'>
          <label htmlFor="">Password:</label>
          <input 
          type="password"
          required
          name='password1'
          placeholder='Enter your password...' 
          value={credentials.password1}
          onChange={handleInputChange}
          />
        </div>


        <div className='field--wrapper'>
          <label htmlFor="">Confirm Password:</label>
          <input 
          type="password"
          required
          name='password2'
          placeholder='Confirm your Password...' 
          value={credentials.password2}
          onChange={handleInputChange}
          />
        </div>

        <div className='field--wrapper'>

          <input  className="btn btn--lg btn--main" type="submit" value="Register" />
        </div>
      </form>

      <p>You already have account? Login: <Link to="/login">here</Link></p>
    </div>
  </div>
  )
}

export default RegisterPage