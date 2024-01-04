import React, { useEffect, useState } from "react";
import axios from "axios";
import "./blog.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
function EditBlogs() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const userId = useSelector((state) => state);
  const [current_image, setCurrentImage] = useState("");
  const [post_by, setPost_by] = useState("");
  const [category, setCategory] = useState([]);
  console.log(userId.auth.user.data.id);
  const [category_id, selectedCategoryId] = useState("");
  const token = useSelector((state) => state.auth.token);
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data", // Adjust the Content-Type as needed
  };
  const { id } = useParams();
  console.log("id", id);
  
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    let imageToUpload = current_image; // Assign image by default

if (!current_image) {
  imageToUpload = image; // If image is empty, use current_image instead
}
    formData.append("post_by", userId.auth.user.data.id);
    formData.append("title", name);
    formData.append("image", image);
    formData.append('blog_id',id)
    formData.append("current_image", imageToUpload);
    formData.append("category_id", category_id);
    formData.append("description", description);

    console.log("first", formData);
    try {
      const response = await axios.post(
        "https://leaseovername.com/api/admin/blog/update",
        formData,
        {
          headers: headers,
        }
      );
      console.log("POST request response:", response.data);
      if (response.data.status == 200) {
        alert("Blog Added Successfully");
      }
      // Optionally handle the response data
    } catch (error) {
      console.error("Error in POST request:", error);
      // Handle errors
    }
  };
  const fetchDataWithToken = async () => {
    try {
      // Replace with your actual bearer token
      const response = await fetch(
        `https://leaseovername.com/api/admin/blog/edit/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Data:", data);
        setName(data.data.title);
        selectedCategoryId(data.data.category_id);
        setDescription(data.data.description);
        setImage(data.data.image);
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

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileName = selectedFile.name;
      const fileType = fileName
        .substring(fileName.lastIndexOf(".") + 1)
        .toLowerCase();

      if (fileType === "png" || fileType === "jpg" || fileType === "jpeg") {
        // Valid file type, handle the file (e.g., upload to server, store in state, etc.)
        setCurrentImage(selectedFile); // Assuming 'setImage' is a state updater function
      } else {
        // Invalid file type, show an error message or handle accordingly
        console.error(
          "Invalid file type. Please select a PNG, JPG, or JPEG file."
        );
      }
    }
  };
  const handleSelectChange = (event) => {
    selectedCategoryId(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => {
            handleImageChange(e);
          }}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          name="description"
        />
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

export default EditBlogs;
