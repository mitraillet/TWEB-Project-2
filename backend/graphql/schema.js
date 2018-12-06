import { gql } from 'apollo-server-express';
/**
 * Graphql Schema definition
 */
export default gql`
  type Application {
    id: ID!
    name: String
    description: String
    authors: [User]
    reviews: [Review]
    score: Int!  
  }
  type User {    
    id: ID!
    name: String!
    reviews: [Review]
  }
  type Review {
    id: ID!
    stars: Int!
    author: User!
    comment: String
    application: Application
  }
  type Query {
    # Get the list of all applications
    applications: [Application]
    # Get a single application
    application(id: ID!): Application
  }
  input ReviewInput {
    stars: Int!,
    comment: String!
    authorId: ID,
    applicationId: ID,
  }
  type Mutation {
    addReview(data: ReviewInput!): Review
  }
`;