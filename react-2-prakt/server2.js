const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

server.use(middlewares);
server.use(bodyParser.json());


server.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  
  
  const users = router.db.get('users').value();
  const userExists = users.some(user => user.email === email);
  
  if (userExists) {
    return res.status(400).json({ error: 'Vartotojas su tokiu el. paštu jau egzistuoja' });
  }
  
  
  const newUser = { id: Date.now(), name, email, password };
  router.db.get('users').push(newUser).write();
  
  res.status(201).json({ user: newUser });
});


server.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  
  const users = router.db.get('users').value();
  const user = users.find(user => user.email === email && user.password === password);
  
  if (!user) {
    return res.status(400).json({ error: 'Neteisingi prisijungimo duomenys' });
  }
  
  res.status(200).json({ user });
});


server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server veikia http://localhost:${PORT}`);
});
