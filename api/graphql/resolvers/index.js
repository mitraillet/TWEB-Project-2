import {mergeResolvers} from "merge-graphql-schemas";

import User from "./User/";
import Project from "./Project/";
import Application from "./Application";
import Message from "./Message";


const resolvers = [User, Project, Application, Message];

export default mergeResolvers(resolvers);
