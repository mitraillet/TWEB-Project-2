require("dotenv").config();
import { GraphQLServer, PubSub } from "graphql-yoga";
import mongoose from "mongoose";
import typeDefs from "../graphql/types/index"
import resolvers from "../graphql/resolvers/index"


import schema from "../graphql/";
import { models } from "./config/db/";

const { mongoURI: db } = process.env;
console.log(db);
const pubsub = new PubSub();


const ms = require('ms');
const session = require('express-session');

const options = {
    cors: {
        credentials: true,
        origin: ['http://localhost:3000'] // your frontend url.
    },
    port: process.env.PORT || "4000",
    endpoint: "/graphql",
    subscriptions: "/subscriptions",
    playground: "/playground"
};

// context
const context = (req) => ({
    req: req.request,
    models,
    pubsub
});



// Connect to MongoDB with Mongoose.
mongoose
    .connect(
        db,
        {
            useCreateIndex: true,
            useNewUrlParser: true
        }
    )
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    schema,
    context
});

// session middleware
server.express.use(session({
    name: 'qid',
    secret: process.env.secretOrKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: ms('1d'),
    },
}));


server.start(options, ({ port }) => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
