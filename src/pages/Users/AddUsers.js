import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './users.css'
import { useSelector } from 'react-redux';
function AddUsers() {
  const [name, setName] = useState('');
  const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cpassword,setCPassword] = useState('');
  const userId =  useSelector(state => state);
  const [post_by,setPost_by] = useState('');
  console.log(userId.auth.user.data.id)
  const token = useSelector(state => state.auth.token);
  const headers = {
    'Authorization': `Bearer ${token}`,
    // 'Content-Type': 'multipart/form-data' // Adjust the Content-Type as needed
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    // formData.append('post_by',userId.auth.user.data.id);
    formData.append('name',name);
    formData.append('email',email);
    formData.append('password',password);
    formData.append('password_confirmation',cpassword);
  
    console.log("first",formData)
    try {
      const response = await axios.post('https://leaseovername.com/api/admin/user/create', formData,{
        headers: headers
      });
      console.log('POST request response:', response.data);
      if (response.data.status == 200) {
        alert("User Added Successfully")
      }
      // Optionally handle the response data
    } catch (error) {
      console.error('Error in POST request:', error);
      // Handle errors
    }
  };
 
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Name:</label>
        <input type="text" id="name" name="name" onChange={(e)=>{setName(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="image">Email:</label>
        <input type="text" id="email" name="email" onChange={(e)=>{setEmail(e.target.value)}} />

      </div>
      <div>
        <label htmlFor="description">Password:</label>
        <input type="password" id="password" onChange={(e)=>{setPassword(e.target.value)}} name="password" />
      </div>
      <div>
        <label htmlFor="description">Confirm Password:</label>
        <input type="password"  id="password_confirmation" onChange={(e)=>{setCPassword(e.target.value)}} name="password_confirmation" />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default AddUsers;
