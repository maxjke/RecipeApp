import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Pagrindinis puslapis</h2>
      <nav>
        <ul>
          <li><Link to="/login">Prisijungti</Link></li>
          <li><Link to="/register">Registruotis</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
