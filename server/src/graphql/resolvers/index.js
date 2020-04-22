import _ from "lodash";
import PostResolvers from "./PostResolver.js";
import UserResolvers from "./UserResolver.js";

const resolvers = _.merge(PostResolvers, UserResolvers);

export default resolvers;