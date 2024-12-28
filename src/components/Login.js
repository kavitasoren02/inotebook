import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Login = (props) => {

  const[credential,setCredential]=useState({email:'',password:''})
  const navigate = useNavigate();  // Get the navigate function

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/login",{
            method:'POST',
            headers:{
              "Content-type": "application/json",
            },
          body:JSON.stringify({email:credential.email,password:credential.password})
          })
          const json=await response.json()
          console.log(json);
          if(json.success){
            // Save the auth token and redirect
            localStorage.setItem('token',json.authToken);
            props.showAlert('Account Login Sucessfully','success')
            navigate('/');  // Navigate to the homepage
          }
          else{
            props.showAlert('Invalid credentials','danger')
          }
     
    }

    const onChange=(e)=>{
      setCredential({...credential,[e.target.name]: e.target.value})
  }
  return (
    <div className='mt-3'>
      <h3>Login to continue to HOME PAGE</h3>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control"value={credential.email} id="email"name="email"  onChange={onChange} aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" value={credential.password} className="form-control" id="password" name="password" onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Login
