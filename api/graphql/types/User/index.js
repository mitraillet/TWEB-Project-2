export default `
  scalar EmailAddress

  type User {
    _id: String!
    firstName: String!
    lastName: String!
    email: EmailAddress!
    company: String!
    projectsProposed: [Project!]!
    applications: [Application!]!
    projectsApplicable: [Project!]!
  }

  type Query {
    me: User
    user(_id: ID!): User!
    users: [User!]!
    isLogin: String!
  }

  type Mutation {
    createUser(user: CreateUserInput): User!
    updateUser(_id:String!, user: UpdateUserInput!): User!
    deleteUser(_id: String!): User!
    login(email: String!, password: String!):  User!
    logout: Boolean!
    
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: EmailAddress!
    company: String!
    password: String!
  }
  
  input UpdateUserInput {
    firstName: String
    lastName: String
    email: EmailAddress
    company: String
    password: String
  } 
`;
