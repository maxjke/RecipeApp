import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

app.use(bodyParser.json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const favoritesFilePath = path.join(__dirname, '..', 'favorites.json');


function loadFavorites() {
  try {
    if (fs.existsSync(favoritesFilePath)) {
      const data = fs.readFileSync(favoritesFilePath, 'utf8');
      return JSON.parse(data);
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
}
function saveFavorites(favorites) {
  try {
    fs.writeFileSync(favoritesFilePath, JSON.stringify(favorites, null, 2));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
}



app.get('/api/favorites', (req, res) => {
  const favorites = loadFavorites();
  res.json(favorites);
});

app.post('/api/favorites', (req, res) => {
  const newFavorite = req.body;
  if (!newFavorite || !newFavorite.id) {
    return res.status(400).json({ error: 'Neteisingi recepto duomenys' });
  }
  let favorites = loadFavorites();
  
  if (favorites.some(fav => fav.id === newFavorite.id)) {
    return res.status(400).json({ error: 'Receptas jau yra mėgstamiausių sąraše' });
  }
  favorites.push(newFavorite);
  saveFavorites(favorites);
  res.status(201).json(newFavorite);
});

app.delete('/api/favorites/:id', (req, res) => {
  const id = req.params.id;
  let favorites = loadFavorites();
  const newFavorites = favorites.filter(fav => fav.id.toString() !== id);
  if (newFavorites.length === favorites.length) {
    return res.status(404).json({ error: 'Receptas nerastas mėgstamiausių sąraše' });
  }
  saveFavorites(newFavorites);
  res.status(200).json({ message: 'Receptas pašalintas iš mėgstamiausių' });
});


let users = [];


app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Trūksta registracijos duomenų' });
  }
  if (users.some(u => u.email === email)) {
    return res.status(400).json({ error: 'Vartotojas su tokiu el. paštu jau egzistuoja' });
  }
  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  res.status(201).json({ user: newUser });
});


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(400).json({ error: 'Neteisingi prisijungimo duomenys' });
  }
  res.status(200).json({ user });
});


app.listen(port, () => {
  console.log(`Express API serveris veikia http://localhost:${port}`);
});
