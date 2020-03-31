import { UserModel } from "../models/UserModel.js"
import { errorName } from "../../constants/statusCode.js";
import { generateToken } from "../../helper/validateUser.js";

function upsertUser(user, userData) {
    return new Promise(function (resolve, reject) {
        UserModel.findOne(user, (err, res) => {
            if (err) {
                reject(err);
            }
            const newUser = new UserModel(userData);
            try {
                // newUser.save();
                resolve(newUser);
            } catch (err) {
                console.log(err);
                reject(errorName.CREATE_FAILED);
            }
        });
    });
}

var authenticate = async function ({ user }) {
    const userData = {
        ...user
    };

    var unionId = {
        unionId: user.unionId
    }

    var ret = await upsertUser(unionId, userData).then((res, err) => {
        return res;
    });

    console.log(ret);
    var token = generateToken({
        userId: ret._id
    });

    return { token: token };
};


export { authenticate }

