export default `
  type Message {
    _id: String!
    sender: User!
    application: Application!
    subject: String!
    body: String!
    date: Date!
  }

  type Query {
    message(_id: ID!): Message!
    messages: [Message!]!
  }

  type Mutation {
    createMessage(message: CreateMessageInput): Message!
    updateMessage(_id: String!, message: UpdateMessageInput!): Message!
    deleteMessage(_id: String!): Message!    
  }

  input CreateMessageInput {
    sender: ID!
    application: ID!
    subject: String!
    body: String!
    date: Date!
  }
  
  input UpdateMessageInput {
    subject: String!
    body: String!
  } 
  
   scalar Date

`;
