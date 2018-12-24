export default `
  type User {
    _id: String!
    firstName: String!
    lastName: String!
    email: String!
    company: String!
    password: String!
    projectsProposed: [Project!]!
    applications: [Application!]!

  }

  type Query {
    user(_id: ID!): User!
    users: [User!]!
    isLogin: String!
  }

  type Mutation {
    createUser(user: CreateUserInput): User!
    updateUser(_id: String!, user: UpdateUserInput!): User!
    deleteUser(_id: String!): User!
    login(email: String!, password: String!): Boolean!
    logout: Boolean!
    
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    company: String!
    password: String!
  }
  
  input UpdateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    company: String!
    password: String!
  } 
`;
