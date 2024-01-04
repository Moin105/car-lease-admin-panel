import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './category.css'
import { useSelector } from 'react-redux';
function CreateCategory() {
  const [name, setName] = useState('');
  const userId =  useSelector(state => state);
  const [title,setTitle] = useState('');
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
    formData.append('title',title);
  
    console.log("first",formData)
    try {
      const response = await axios.post('https://leaseovername.com/api/admin/category/store', formData,{
        headers: headers
      });
      console.log('POST request response:', response.data);
      if (response.data.status == 200) {
        alert("Category Added Successfully")
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
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" onChange={(e)=>{setTitle(e.target.value)}} />
      </div>
    
      <button type="submit">Submit</button>
    </form>
  );
}

export default CreateCategory;

// export default CreateCategory