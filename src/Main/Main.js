import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import SideBar from '../components/Sidebar';
import sidebar_menu from '../constants/sidebar-menu';
import './styles.css'
import Orders from '../pages/Orders';
import Blogs from '../pages/Blogs/Blogs';
import GetBlogs from '../pages/Blogs/GetBlogs';
import Users from '../pages/Users/Users';
import AddUsers from '../pages/Users/AddUsers';
import Category from '../pages/Category/Category';
import CreateCategory from '../pages/Category/CreateCategory';
import MainText from '../pages/MainText/MainText';
import AddMainText from '../pages/MainText/AddMainText';
import EditBlogs from '../pages/Blogs/EditBlog';
import UserEdit from '../pages/Users/UserEdit';
import EditCategory from '../pages/Category/EditCategory';

function Main() {
  return (

         <div className='dashboard-container'>
        <SideBar menu={sidebar_menu} />
          
          <div className='dashboard-body'>
            <Routes>
                  <Route path="*" element={<div>No Existing Page</div>} />
                  <Route  path="/" element={<div>Home</div>} />
                  <Route  path="/orders" element={< Orders/>} />
                  <Route  path="/locations" element={<div></div>} />
                  <Route  path="/add-blogs" element={<Blogs/>} />
                  <Route  path="/blogs" element={<GetBlogs/>} />
                  <Route  path="/users" element={<Users/>} />
                  <Route  path="/add-users" element={<AddUsers/>} />
                  <Route  path="/categories" element={<Category/>} />
                  <Route path="/add-categories" element={<CreateCategory/>} />
                  <Route path="/main-text" element={<MainText/>} />
                  <Route path='/add-main-text' element={<AddMainText/>} />
                  <Route path='/edit-blog/:id' element={<EditBlogs/>} />
                  <Route path='/user-edit/:id' element={<UserEdit/>} />
                  <Route path='/edit-category/:id' element={<EditCategory/>} />
            </Routes>
       
          </div>
      </div>

  )
}

export default Main