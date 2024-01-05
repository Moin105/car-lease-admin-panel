import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './blog.css'
import { useSelector } from 'react-redux';
function Blogs() {
  const [name, setName] = useState('');
  const [image,setImage] = useState('');
  const [description,setDescription] = useState('');
  const userId =  useSelector(state => state);
  const [category, setCategory] = useState([]);

  const [post_by,setPost_by] = useState('');
  console.log(userId.auth.user.data.id)
  const token = useSelector(state => state.auth.token);
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'multipart/form-data' // Adjust the Content-Type as needed
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('post_by',userId.auth.user.data.id);
    formData.append('title',name);
    formData.append('image',image);
    formData.append('description',description);
    formData.append('category_id',category_id);
  
    console.log("first",formData)
    try {
      const response = await axios.post('https://leaseovername.com/api/admin/blog/create', formData,{
        headers: headers
      });
      console.log('POST request response:', response.data);
      if (response.data.status == 200) {
        alert("Blog Added Successfully")
      }
      // Optionally handle the response data
    } catch (error) {
      console.error('Error in POST request:', error);
      // Handle errors
    }
  };
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileName = selectedFile.name;
      const fileType = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
  
      if (fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg') {
        // Valid file type, handle the file (e.g., upload to server, store in state, etc.)
        setImage(selectedFile); // Assuming 'setImage' is a state updater function
      } else {
        // Invalid file type, show an error message or handle accordingly
        console.error('Invalid file type. Please select a PNG, JPG, or JPEG file.');
      }
    }
  };
  const [category_id,selectedCategoryId] = useState('');

  const handleSelectChange = (event) => {
    selectedCategoryId(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = 'https://leaseovername.com/api/admin/category/index'; // Replace with your API endpoint
   
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      try {
        const response = await axios.get(apiUrl, config);
        console.log('GET request response:', response.data);
        setCategory(response.data.data)
        // Handle the response data here
      } catch (error) {
        console.error('Error in GET request:', error);
        // Handle errors
      }
    };

    fetchData();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" onChange={(e)=>{setName(e.target.value)}} />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input type="file" id="image" name="image" accept=".png, .jpg, .jpeg" onChange={(e) => { handleImageChange(e) }} />

      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" onChange={(e)=>{setDescription(e.target.value)}} name="description" />
      </div>
      <div>
        <label htmlFor="userSelect">Select a Category:</label>
        <select
          id="userSelect"
          value={category_id}
          onChange={handleSelectChange}
        >
          <option value="">Select Category</option>
          {category?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.title}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Blogs;
