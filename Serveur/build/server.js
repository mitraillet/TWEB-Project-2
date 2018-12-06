require("source-map-support").install(),function(e){var t={};function i(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=e,i.c=t,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(r,o,function(t){return e[t]}.bind(null,o));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=4)}([function(e,t){e.exports={apps:[{id:"1",name:"Retis",description:"A social network to share samples of code between developers",authors:["1","8","69"],tags:["social","code"]},{id:"2",name:"PixL",description:"A social network for photographers",authors:["4","8","69"],tags:["social","photography","learn"]},{id:"3",name:"Guidoux-fruits",description:"A beautiful place in earth",authors:["3","8","69"],tags:["fruits","happiness","love"]},{id:"4",name:"PaulNta SA",description:"The best pedagogy in the world",authors:["42","8","69"],tags:["Two guys one class","Javascript","React"]}],reviews:[{id:"1",author:"5",comment:"Nice app! But I cannot logout. Please help :(",applicationId:"1",stars:"3"},{id:"3",author:"69",comment:"Nice app! Hochet is the best",applicationId:"3",stars:"5"},{id:"2",author:"3",comment:"I tried to upload a picture. I am still waiting...",applicationId:"2",stars:"4"}],users:[{id:"1",name:"PlayStation Rochat"},{id:"2",name:"J. Marchand"},{id:"3",name:"A. von Bauer Gauss"},{id:"4",name:"H. Reymond"},{id:"5",name:"B. Curchod"},{id:"6",name:"D. Gonzalez Lopez"},{id:"7",name:"Phillip Morris"},{id:"8",name:"Helena ou elle est là ?"},{id:"42",name:"Chuck Norris"},{id:"69",name:"Dejvid Gonzales Giffos"}]}},function(e,t){e.exports=require("apollo-server-express")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("express-jwt")},function(e,t,i){"use strict";i.r(t);var r=i(2),o=i.n(r),n=i(1),a=n.gql`
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
`,s=i(0),p={Query:{applications:()=>s.apps},Mutation:{addReview:(e,{data:t})=>{const i={id:String(s.reviews.length),stars:t.stars,comment:t.comment,author:t.authorId,applicationId:t.applicationId};return s.reviews.push(i),i}},Application:{authors:e=>s.users.filter(t=>e.authors.includes(t.id)),reviews:e=>s.reviews.filter(t=>t.applicationId===e.id)},Review:{author:e=>s.users.find(t=>t.id===e.author),application:e=>s.apps.find(t=>t.id===e.applicationId)},User:{reviews:e=>s.reviews.filter(t=>t.author===e.id)}};i(3);const u=o()(),l=process.env.PORT||5e3;new n.ApolloServer({typeDefs:a,resolvers:p,introspection:!0,playground:!0,context:({req:e})=>{const t=e.headers.authorization||"",i=getUser(t);if(!i)throw new AuthorizationError("you must be logged in");return{user:i}}}).applyMiddleware({app:u}),u.get("/",(e,t)=>{t.send("Hello express!")}),u.use((e,t,i)=>{const r=new Error("Not found");r.status=404,i(r)}),u.use((e,t,i,r)=>{console.error(e),i.status(e.status||500),i.send(e.message)}),u.listen(l,()=>{console.log(`Server listening at http://localhost:${l}`)})}]);
//# sourceMappingURL=server.js.map