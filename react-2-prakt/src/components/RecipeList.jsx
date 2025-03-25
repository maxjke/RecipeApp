import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';

const RECIPES_PER_PAGE = 5;

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(function fetchRecipesEffect() {
    setLoading(true);
    fetch('https://dummyjson.com/recipes')
      .then(res => res.json())
      .then(data => {
        
        if (data.recipes && Array.isArray(data.recipes)) {
          
          const recipesWithId = data.recipes.map((r, index) => ({
            ...r,
            id: r.id || index + 1
          }));
          setRecipes(recipesWithId);
        } else {
          console.error('Neteisinga API struktūra:', data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Klaida gaunant receptus:', error);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(recipes.length / RECIPES_PER_PAGE);
  const startIndex = (currentPage - 1) * RECIPES_PER_PAGE;
  const currentRecipes = recipes.slice(startIndex, startIndex + RECIPES_PER_PAGE);

  return (
    <div>
      <h1>Recipes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        currentRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      )}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Atgal
        </button>
        <span style={{ margin: '0 10px' }}>
          {currentPage} / {totalPages}
        </span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Kitas
        </button>
      </div>
    </div>
  );
}

export default RecipeList;
