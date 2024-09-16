import React, { useState } from 'react'
import './adduser.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

function AddUser() {

  const [user,setUser] = useState({
    fname:"",
    lname:"",
    email:"",
    password:""
  });

  const navigate = useNavigate();


  const inputHandler = (e) =>{
    const {name,value} = e.target;
    setUser({...user,[name]:value});
  }

  const submitHandler = async (e) =>{
    e.preventDefault();

    await axios.post("http://localhost:8000/api/create",user)
    .then((res)=>{
      toast.success(res.data.msg, {position:"top-right"})
        navigate("/")
  
    }).catch(err=>console.log(err))

  }


  return (
    <div className='addUser' >
    <h3>Add New User</h3>
    <form onSubmit={submitHandler}>
      <div className='inputGroup'>
        <label htmlFor='fname'>First name</label>
        <input type="text" id="fname" onChange={inputHandler} name='fname' autoComplete='off' placeholder='First name' />
      </div>
      <div className='inputGroup'>
        <label htmlFor='lname'>Last name</label>
        <input type="text" id="lname" onChange={inputHandler} name='lname' autoComplete='off' placeholder='Last name' />
      </div>
      <div className='inputGroup'>
        <label htmlFor='email'>Email</label>
        <input type="email" id="email" onChange={inputHandler} name='email' autoComplete='off' placeholder='Email' />
      </div>
      <div className='inputGroup'>
        <label htmlFor='password'>Password</label>
        <input type="password" id="password" onChange={inputHandler} name='password' autoComplete='off' placeholder='Password' />
      </div>
      <div className='inputGroup'>
        <button className="submitBtn" type='submit'> ADD USER </button>
      </div>
    </form>
    <Link to={"/"}>Back</Link>
    <Toaster />
    </div>
  )
}

export default AddUser;