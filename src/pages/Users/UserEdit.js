import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './users.css'
import { useSelector } from 'react-redux';
function UserEdit() {
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
  const { id } = useParams();
  console.log("id", id);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    // formData.append('post_by',userId.auth.user.data.id);
    formData.append('name',name);
    formData.append('email',email);
    formData.append('user_id',id);
  
    console.log("first",formData)
    try {
      const response = await axios.post('https://leaseovername.com/api/admin/user/update', formData,{
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
  const fetchDataWithToken = async (id) => {
    try {
      // Replace with your actual bearer token
      const response = await fetch(
        `https://leaseovername.com/api/admin/user/edit/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Data user:", data);
        setName(data.data.name);
        setEmail(data.data.email);
        // selectedCategoryId(data.data.category_id);
        // setDescription(data.data.description);
        // setImage(data.data.image);
        // Process the received data here
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataWithToken(id);
  }, []);

 
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="image">Email:</label>
        <input type="text" id="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
      </div>
    

      <button type="submit">Submit</button>
    </form>
  );
}

export default UserEdit;
