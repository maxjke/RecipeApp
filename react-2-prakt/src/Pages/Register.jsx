  import React, { useState, useContext } from 'react';
  import { AuthContext } from '../components/AuthContext';
  import { useNavigate } from 'react-router';

  const Register = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!response.ok) throw new Error('Registracija nepavyko');
        const data = await response.json();
        login(data.user);
        navigate('/dashboard');
      } catch (err) {
        setError(err.message);
      }
    };

    return (
      <div>
        <h2>Registracija</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Vardas:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Slaptažodis:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Registruotis</button>
        </form>
      </div>
    );
  };

  export default Register;
