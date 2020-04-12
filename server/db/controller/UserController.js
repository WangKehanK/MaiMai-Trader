import { UserModel } from "../models/UserModel.js"
import { errorName } from "../../constants/statusCode.js";
import { generateToken } from "../../helper/validateUser.js";

import axios from "axios";
import Config from "../../config/keys.js";
import ApolloServer from 'apollo-server-express';


function upsertUser(userQuery, userData) {
    return new Promise(function (resolve, reject) {
        UserModel.findOneAndUpdate(userQuery, userData, { upsert: true }, (err, res) => {
            if (err) {
                reject(err);
            }
            try {
                resolve(res);
            } catch (err) {
                console.log(err);
                reject(errorName.CREATE_FAILED);
            }
        });
    });
}

function code2session(url) {
    return new Promise(function (resolve, reject) {
        axios.get(url)
            .then(function (response) {
                // handle success
                if (response.data.errcode) {
                    reject(response.data.errmsg);
                }
                var openId = response.data.openid;
                resolve(openId);
            })
    });
}

var authenticate = async function ({ user }) {
    var code = user.code;

    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${Config.WECHAT.APP_ID}&secret=${Config.WECHAT.APP_SECRET}&js_code=${code}&grant_type=authorization_code`

    try {
        var openId = await code2session(url).then(res => {
            console.log("openId", res);
            return res;
        }).catch(err => {
            throw err;
        })

        var userQuery = {
            openId: openId
        }

        var userData = {
            ...user,
            openId: openId
        };

        var ret = await upsertUser(userQuery, userData).then((res, err) => {
            return res;
        });

        var token = generateToken({
            userId: ret._id
        });

        return { token: token };
    } catch (error) {
        return new ApolloServer.ApolloError(error);
    }
};


export { authenticate }

