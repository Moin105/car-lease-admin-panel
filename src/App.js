import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import Login from './pages/Login/Login';
import { useSelector } from 'react-redux';
import Main from './Main/Main';

function App() {
  const token = useSelector(state => state.auth.token);
  useEffect(() => {console.log(token)}, [token]);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
      {token ? (
          <Route path="/" element={<Navigate to="/blogs" />} />
        ) : (
          <Route path="/*" element={<div>No Existing Page</div>} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
