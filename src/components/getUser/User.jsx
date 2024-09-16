import React, { useEffect, useState } from 'react'
import './user.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

function User() {

    const [users,setUsers] = useState();
    const [isDelete,setIsDelete] = useState(false);

    const onDeleteHandler = (e) =>{
        const {value} = e.target;
        
        const deleteUser = async () => {
            await axios.delete(`http://localhost:8000/api/deleteById/${value}`)
            .then((res)=>{alert(`User ${res.data.fname} deleted succesfully`)})
            .catch(err=>console.log(err));
        }
        deleteUser();
        setIsDelete(true)
    }

    useEffect(()=>{
       const  fetchData = async () =>{
    await axios.get("http://localhost:8000/api/getAll")
    .then((res)=>setUsers(res.data))
    .catch(err=>console.log(err)); 
        setIsDelete(false);
}
        
        fetchData();
            
    },[isDelete])

  return (
    <div className='userTable'>
        <Link className='addUser' to={"/add"}>Add User</Link>
        <table>
            <thead>
                <tr>
                    <th>
                        S.No
                    </th>
                    <th>
                       First Name
                    </th>
                    <th>
                       Last Name
                    </th>
                    <th>
                       Email
                    </th>
                    <th>
                       Actions
                    </th>
                </tr>
            </thead>
            <tbody> 
            {
                users?.map((data,index)=>{
                   return (
                    <tr key={index} >
                    <td>{1+index}.</td>
                    <td>{data.fname}</td>
                    <td>{data.lname}</td>
                    <td>{data.email}</td>
                    <td>
                        <button className='deleteBtn' value={data._id} onClick={onDeleteHandler} >Delete</button>
                        <Link className='editBtn' to={`/edit/${data._id}`}>Edit</Link>
                    </td>
                </tr>
                   ) 
                })}
            
                
            </tbody>
        </table>
    </div>
  )
}

export default User