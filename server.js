const express = require('express');
// const jwt = require('express-jwt');
const { expressjwt: jwt } = require('express-jwt');
const cookieParser = require('cookie-parser');

const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
const app = express();
app.use(cors());
const jwtSecret = 'secret123';

//For JWT
/* app.get('/jwt', (req, res) => {
  res.json({
    token: jsonwebtoken.sign({ user: 'johndoe' }, jwtSecret)
  });
}); */

//For Cookie Based
app.get('/jwt', (req, res) => {
  console.log('jwt hit')
  const token = jsonwebtoken.sign({ user: 'johndoe' }, jwtSecret);
  res.cookie('token', token, { httpOnly: true });
  res.json({ token });
});

//For JWT
// app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }));


//For Cookie Based
app.use(cookieParser());
app.use(
  jwt({
    secret: 'secret123',
    getToken: req => req.cookies.token,
    algorithms: ['HS256']
  })
);

const foods = [
  { id: 1, description: 'burritos' },
  { id: 2, description: 'quesadillas' },
  { id: 3, description: 'churos' }
];
app.get('/foods', (req, res) => {
  res.json(foods);
});
app.listen(3001);
console.log('App running on localhost:3001');