import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, AuthContext } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import Favorites from './Pages/Favorites';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <nav style={{ marginBottom: '20px' }}>
      
        {!auth.isAuthenticated && <Link to="/">Home</Link>}
        {!auth.isAuthenticated && <> | <Link to="/login">Login</Link> | <Link to="/register">Register</Link> | </>}
        {auth.isAuthenticated && (
          <>
            <Link to="/dashboard">Dashboard</Link> |{' '}
            <Link to="/recipes">Recipes</Link> |{' '}
            <Link to="/favorites">Favorites</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
