import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(function fetchRecipeEffect() {
    setLoading(true);
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Klaida gaunant recepto duomenis:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>Nerasta recepto.</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      {recipe.ingredients && <p>Ingredients: {recipe.ingredients.join(', ')}</p>}
      {recipe.instructions && <p>Instructions: {recipe.instructions}</p>}
    </div>
  );
}

export default RecipeDetail;
