import _ from "lodash";
import PostResolvers from "./postResolver.js";
import UserResolvers from "./userResolver.js";

const resolvers = _.merge(PostResolvers, UserResolvers);

export default resolvers;