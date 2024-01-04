import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './maintext.css'
import { useSelector } from 'react-redux';
function AddMainText() {
  const [name, setName] = useState('');
  const userId =  useSelector(state => state);
  const [title,setTitle] = useState('');
  const [users,setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [post_by,setPost_by] = useState('');
  console.log(userId.auth.user.data.id)
  const token = useSelector(state => state.auth.token);
  const bearerToken = useSelector(state=>state.auth.token);
  const headers = {
    'Authorization': `Bearer ${token}`,
    // 'Content-Type': 'multipart/form-data' // Adjust the Content-Type as needed
  };
  const handleSelectChange = (event) => {
    setSelectedUserId(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    // formData.append('post_by',userId.auth.user.data.id);
    formData.append('title',title);
    formData.append('user_id',selectedUserId)
  
    console.log("first",formData)
    try {
      const response = await axios.post('https://leaseovername.com/api/admin/main-text/create', formData,{
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
  useEffect(() => {
      const fetchData = async () => {
        const apiUrl = 'https://leaseovername.com/api/admin/user/index'; // Replace with your API endpoint
     
        const config = {
          headers: {
            'Authorization': `Bearer ${bearerToken}`
          }
        };
  
        try {
          const response = await axios.get(apiUrl, config);
          console.log('GET request response:', response.data);
          setUsers(response.data.data)
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
        <input type="text" id="title" name="title" onChange={(e)=>{setTitle(e.target.value)}} />
      </div>
      <div>
      <label htmlFor="userSelect">Select a user:</label>
      <select id="userSelect" value={selectedUserId} onChange={handleSelectChange}>
          <option value=''>Select Category</option>
        {users?.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
    </div>
    
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddMainText;

// export default CreateCategory