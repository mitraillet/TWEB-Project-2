import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
const jwt = require('express-jwt')
const app = express();
const port = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Enables playground and introspection in production
  introspection: true,
  playground: true,
  context: ({ req }) => {
	// get the user token from the headers
	const token = req.headers.authorization || '';

	// try to retrieve a user with the token
	const user = getUser(token);
	  
	  // optionally block the user
	 // we could also check user roles/permissions here
	 if (!user) throw new AuthorizationError('you must be logged in'); 


	// add the user to the context
	return { user };
	},
});

server.applyMiddleware({ app });


app.get('/', (req, res) => {
  res.send('Hello express!');
});

// Forward 404 to error handler
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});