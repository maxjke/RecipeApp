import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Sveiki, {auth.user ? auth.user.name : 'Vartotojau'}!</p>
      <button onClick={handleLogout}>Atsijungti</button>
    </div>
  );
};

export default Dashboard;
