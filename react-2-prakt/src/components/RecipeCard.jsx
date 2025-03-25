import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
  const [favorite, setFavorite] = useState(false);

  
  function handleFavorite() {
    if (!favorite) {
      
      fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe)
      })
        .then(res => {
          if (res.ok) {
            setFavorite(true);
          } else {
            console.error('Klaida pridedant į mėgstamiausius');
          }
        })
        .catch(error => {
          console.error('Klaida pridedant į mėgstamiausius:', error);
        });
    } else {
      
      fetch(`/api/favorites/${recipe.id}`, {
        method: 'DELETE'
      })
        .then(res => {
          if (res.ok) {
            setFavorite(false);
          } else {
            console.error('Klaida pašalinant iš mėgstamiausių');
          }
        })
        .catch(error => {
          console.error('Klaida pašalinant iš mėgstamiausių:', error);
        });
    }
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
    
      <Link to={`/recipe/${recipe.id}`}>
        
        <h3>{recipe.name}</h3>
      </Link>

      
      <p>
        {recipe.instructions && recipe.instructions.length > 0
          ? recipe.instructions[0]
          : 'Aprašymas nepateiktas.'}
      </p>

      
      <button onClick={handleFavorite}>
        {favorite ? '❤️ Pašalinti iš mėgstamiausių' : '❤️ Mėgstamiausi'}
      </button>
    </div>
  );
}

export default RecipeCard;
