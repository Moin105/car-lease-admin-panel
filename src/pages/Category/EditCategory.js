import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './category.css'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
function EditCategory() {
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
  const { id } = useParams();
  console.log("id", id);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    // formData.append('post_by',userId.auth.user.data.id);
    formData.append('title',title);
    formData.append('id',id);
  
    console.log("first",formData)
    try {
      const response = await axios.post('https://leaseovername.com/api/admin/category/update', formData,{
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
  const fetchDataWithToken = async () => {
    try {
      // Replace with your actual bearer token
      const response = await fetch(
        `https://leaseovername.com/api/admin/category/edit?id=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Data: title category", data);
        setTitle(data.data.title);
        // Process the received data here
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataWithToken();
  }, []);
 
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
      </div>
    
      <button type="submit">Submit</button>
    </form>
  );
}

export default EditCategory;

// export default CreateCategory