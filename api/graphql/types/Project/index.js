export default `
  scalar DateTime
  scalar PositiveInt
  type Project {
    _id: String!
    name: String!
    amount: PositiveInt!
    description: String!
    timeEstimated: DateTime!
    technologies: String!
    status: AllowedStatus!
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
    amount: PositiveInt!
    description: String!
    timeEstimated: DateTime!
    technologies: String!
    status: AllowedStatus!
    deadline: DateTime!
    customer: ID!,

  }
  
  input UpdateProjectInput {
    name: String!
    amount: PositiveInt!
    description: String!
    timeEstimated: DateTime!
    technologies: String!
    status: AllowedStatus!
    deadline: DateTime!
  } 
  
    enum AllowedStatus {
    Proposed
    Approved
    Ongoing
    Delivered
  }
  
  

`;
