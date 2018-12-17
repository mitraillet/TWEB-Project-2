require('dotenv/config');
const express = require('express');
const passport = require('passport');
const { port } = require('./config');
const api = require('./routes/api');
const auth = require('./routes/auth');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/api', api);
app.use('/auth', auth);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Magic happens at http://localhost:${port}`);
});