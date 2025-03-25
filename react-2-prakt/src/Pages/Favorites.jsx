import React, { useEffect, useState } from 'react';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  function fetchFavorites() {
    setLoading(true);
    fetch('/api/favorites')
      .then(res => res.json())
      .then(data => {
        setFavorites(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Klaida gaunant mėgstamiausius:', error);
        setLoading(false);
      });
  }

  useEffect(function fetchFavoritesEffect() {
    fetchFavorites();
  }, []);

  function handleRemove(id) {
    fetch(`/api/favorites/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          fetchFavorites();
        } else {
          console.error('Klaida šalinant iš mėgstamiausių');
        }
      })
      .catch(error => {
        console.error('Klaida šalinant iš mėgstamiausių:', error);
      });
  }

  return (
    <div>
      <h1>Mėgstamiausi receptai</h1>
      {loading ? (
        <p>Loading favorites...</p>
      ) : favorites.length === 0 ? (
        <p>Nėra mėgstamiausių receptų.</p>
      ) : (
        favorites.map(recipe => (
          <div
            key={recipe.id}
            style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
          >
            
            <h3>{recipe.name}</h3>
            
            <p>
              {recipe.instructions && recipe.instructions.length > 0
                ? recipe.instructions[0]
                : 'Trūksta informacijos'}
            </p>
            <button onClick={() => handleRemove(recipe.id)}>Pašalinti</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Favorites;
