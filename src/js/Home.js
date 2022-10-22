import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
 
  let navigate = useNavigate()
   
  return (
    <>
    <div className='home'>
    <div className='note'>
        <h3 >Note : -</h3>
        <ul>
          <li>Please try Login and  Logout feature</li>
          <li>Please try Forgot password feature</li>
        </ul>
        
      </div>
    
      <span className='over logout' onClick={() => {
          window.localStorage.removeItem("Token")
          window.localStorage.removeItem("name")
       
          navigate("/")}}>Logout</span>
      <div className='wellcome_page'>
        <h5>Wellcome to <span className='name'>{window.localStorage.getItem("name")}</span></h5>
        <marquee behavior="alternative" direction="right" scrollamount="15">Welcome to  <span className='name1'>{window.localStorage.getItem("name")}</span></marquee>
        
       
      </div>
     
    </div>
    
    </>
  )
}

export default Home