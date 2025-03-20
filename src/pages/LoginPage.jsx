import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
// import Header from '../components/Header'

const LoginPage = () => {

  const {user ,handleUserLogin}= useAuth()
  const navigate = useNavigate()
  // const navigateInstance = navigate;
  useEffect(()=>{
    if(user){
      navigate("/")
    }

  },[])

  const[credentials, setCredentials]=useState({
    email:"",
    password:""
  })

  const[checkError, setCheckError]=useState("")

  const handleInputChange =(e)=>{
    let name = e.target.name
    let value = e.target.value
    setCredentials({...credentials,[name]:value})
    // console.log(credentials)
  }
  
  return (
    <div className='auth--container'>
    
      <div className='form--wrapper'>
        <form onSubmit={async (e) => {
  try {
    const result = await handleUserLogin(e, credentials); 
    console.log("result", result)
    setCheckError(result)
  } catch (error) {
  // console.error("Login error:", error)
  }
}}>
          <div className='field--wrapper'>
            <p style={{color:"red"}}>{checkError}</p>
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
            name='password'
            placeholder='Enter your password...' 
            value={credentials.password}
            onChange={handleInputChange}
            />
          </div>

          <div className='field--wrapper'>

            <input  className="btn btn--lg btn--main" type="submit" value="Login" />
          </div>
        </form>

        <p>Don't have account ? register <Link to="/register">here</Link></p>
      </div>
    </div>
  )
}


export default LoginPage