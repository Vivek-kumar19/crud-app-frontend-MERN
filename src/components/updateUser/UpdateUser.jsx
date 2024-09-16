import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './updateUser.css'
import axios from 'axios';

function UpdateUser() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [user,setUser] = useState({
        fname : "",
        lname : "",
        email : ""
    });

    useEffect(()=>{
       const fetchUser = () =>{
        axios.get(`http://localhost:8000/api/getById/${id}`)
        .then((res)=>{setUser(res.data)})
        .catch(err=>err)
       }
       fetchUser();
    },[id]);

    
    const inputChangeHandler = (e) =>{
        const {name,value} = e.target;
        setUser({...user, [name]:value});
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        
        const finalRequest = async () =>{
        await  axios.put(`http://localhost:8000/api/updateById/${id}`,user)
        .then((res)=>{alert(`Record updated succesfully ${res.data.fname}`)
            navigate("/")
        })
        .catch(err=>err)
        }

        finalRequest();
    }

  return (
    <div className='addUser'>
    <h3>Update User</h3>
    <form onSubmit={submitHandler}>
      <div className='inputGroup'>
        <label htmlFor='fname'>First name</label>
        <input type="text" id="fname" onChange={inputChangeHandler} value={user?.fname} name='fname'  placeholder='First name' />
      </div>
      <div className='inputGroup'>
        <label htmlFor='lname'>Last name</label>
        <input type="text" id="lname" onChange={inputChangeHandler} value={user?.lname} name='lname'  placeholder='Last name' />
      </div>
      <div className='inputGroup'>
        <label htmlFor='email'>Email</label>
        <input type="email" id="email" onChange={inputChangeHandler} value={user?.email} name='email'  placeholder='Email' />
      </div>
      <div className='inputGroup'>
        <button className="submitBtn" type='submit'> UPDATE USER </button>
      </div>
    </form>
    <Link to={"/"}>Back</Link>
    </div>
  )
}

export default UpdateUser