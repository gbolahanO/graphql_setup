import express from 'express'
import bodyParser from 'body-parser'
import { ApolloServer, gql } from 'apollo-server-express'

import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/db_name_goes_here')
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log("we're connected!");
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const typeDefs = gql`
  type Book {
    author: String
    title: String
  }

  type Query {
    books: [Book]
  }
`

const resolvers = {
  Query: {
    books: () => books
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
});
