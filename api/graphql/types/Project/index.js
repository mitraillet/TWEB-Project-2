export default `
  scalar DateTime
  type Project {
    _id: String!
    name: String!
    amount: Int!
    description: String!
    timeEstimated: DateTime!
    technologies: String!
    status: String!
    deadline: DateTime!
    customer: User!,
    applications: [Application!]!
  }

  type Query {
    project(_id: ID!): Project!
    projects: [Project!]!
  }

  type Mutation {
    createProject(project: CreateProjectInput): Project!
    updateProject(_id: String!, project: UpdateProjectInput!): Project!
    deleteProject(_id: String!): Project!    
  }

  input CreateProjectInput {
    name: String!
    amount: Int!
    description: String!
    timeEstimated: DateTime!
    technologies: String!
    status: String!
    deadline: DateTime!
    customer: ID!,

  }
  
  input UpdateProjectInput {
    name: String!
    amount: Int!
    description: String!
    timeEstimated: DateTime!
    technologies: String!
    status: String!
    deadline: DateTime!
  } 
  
  

`;
