import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../redux/actions/authActions';
import './styles.css'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 const dispatch = useDispatch()
 const navigate = useNavigate();
 const handleRouteChange = (url, datas) => {
     navigate(url, { state: { data: datas } });
   };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://leaseovername.com/api/admin/login', {
        email: username,
        password: password
      });

      // Handle the response as needed, e.g., set state, show messages, etc.
      console.log('Login successful:', response.data);
      dispatch(loginSuccess(response.data))
      handleRouteChange('/blogs')

    } catch (error) {
      // Handle errors, e.g., show error messages to the user
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
