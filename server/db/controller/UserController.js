import { UserModel } from "../models/UserModel.js"
import { errorName } from "../../constants/statusCode.js";
import { ObjectId } from "../../helper/helper.js";


const authenticate = async function ({ user }) {
    // const userData = {
    //     user: { unionId: 'aaa' },
    // };
    const query = await UserModel.findOne(user, (err, res) => {
        if (res) {
            console.log(res);
            // if user exists return the user
        } else {
            const newUser = new UserModel({ user: userData });
            console.log(userData);
            console.log(newUser);
            try {
                newUser.save();
                return true;
            } catch (err) {
                console.log(err);
                throw new Error(errorName.CREATE_FAILED);
            }
        }
    });



};

export { authenticate }

