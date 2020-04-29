import { UserModel } from "../models/UserModel.js"
import { errorName } from "../../constants/statusCode.js";
import { generateToken } from "../../helper/validateUser.js";
import axios from "axios";
import Config from "../../config/keys.js";
import ApolloServer from 'apollo-server-express';
import Nexmo from "nexmo";

const nexmo = new Nexmo({
    apiKey: '11912fda',
    apiSecret: 'xVPB3J0oLoLYJpVp',
});

function requestMsg(phoneNumber) {
    return new Promise(function (resolve, reject) {
        console.log(phoneNumber);

        nexmo.verify.request({
            number: phoneNumber,
            brand: 'Awesome Company',
            code_length: 4,
        }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                if (result && result.status == '0') {
                    resolve(result);
                } else {
                    reject(result);
                }
            }
        });
    });
}

function upsertUser(userQuery, userData) {
    return new Promise(function (resolve, reject) {
        UserModel.findOneAndUpdate(userQuery, userData, { upsert: true, useFindAndModify: false }, (err, res) => {
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

var phoneNumberLogin = async function (input) {
    let phoneNumber = parseInt(input["phoneNumber"]);
    console.log(typeof phoneNumber)
    try {
        var res = await requestMsg(phoneNumber);
        return res;
    } catch (error) {
        console.log(error)
        return error["error_text"];
    }
}

// {"request_id":"32642d7ec2a24ff98543d34b5d90ba3c", "status":"0"}

var authenticate = async function ({ user }) {
    let phoneNumber = user["contact"]["phone"];

    try {
        var userQuery = {
            "contact.phone": phoneNumber
        }

        var userData = user;

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

export { authenticate, upsertUser, phoneNumberLogin }

