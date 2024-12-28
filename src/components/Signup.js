import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';  // Import useNavigate


const Signup = (props) =>{

  const[credential,setCredential]=useState({name:'',email:'',password:'',cpassword:'' })
  let navigate = useNavigate();  // Get the navigate function
  const{name,email,password}=credential

  const handleSubmit= async (e)=>{
      e.preventDefault();
      const response=await fetch("http://localhost:5000/api/auth/createuser",{
          method:'POST',
          headers:{
            "Content-type": "application/json",
          },
        body:JSON.stringify({name,email,password})
        })
        const json=await response.json()
        console.log(json);
        if(json.success){
          // Save the auth token and redirect
          localStorage.setItem('token',json.authToken);
          props.showAlert('Account created Sucessfully','success')
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
    <div className='mt-2'>
      <h3>Create an Account to use iNotebook</h3>
      <form className='container' onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" onChange={onChange} name="name"aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" name="email"onChange={onChange}aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword"onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
