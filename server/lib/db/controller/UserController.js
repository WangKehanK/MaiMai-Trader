"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authenticate = undefined;

var _UserModel = require("../models/UserModel.js");

var _statusCode = require("../../constants/statusCode.js");

var _validateUser = require("../../helper/validateUser.js");

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _keys = require("../../config/keys.js");

var _keys2 = _interopRequireDefault(_keys);

var _apolloServerExpress = require("apollo-server-express");

var _apolloServerExpress2 = _interopRequireDefault(_apolloServerExpress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function upsertUser(userQuery, userData) {
    return new Promise(function (resolve, reject) {
        _UserModel.UserModel.findOneAndUpdate(userQuery, userData, { upsert: true }, function (err, res) {
            if (err) {
                reject(err);
            }
            try {
                resolve(res);
            } catch (err) {
                console.log(err);
                reject(_statusCode.errorName.CREATE_FAILED);
            }
        });
    });
}

function code2session(url) {
    return new Promise(function (resolve, reject) {
        _axios2.default.get(url).then(function (response) {
            // handle success
            if (response.data.errcode) {
                reject(response.data.errmsg);
            }
            var openId = response.data.openid;
            resolve(openId);
        });
    });
}

var authenticate = async function authenticate(_ref) {
    var user = _ref.user;

    var code = user.code;

    var url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + _keys2.default.WECHAT.APP_ID + "&secret=" + _keys2.default.WECHAT.APP_SECRET + "&js_code=" + code + "&grant_type=authorization_code";

    try {
        var openId = await code2session(url).then(function (res) {
            console.log("openId", res);
            return res;
        }).catch(function (err) {
            throw err;
        });

        var userQuery = {
            openId: openId

            // var userData = {
            //     ...user,
            //     openId: openId
            // };

        };var userData = user;
        userData["openId"] = openId;

        var ret = await upsertUser(userQuery, userData).then(function (res, err) {
            return res;
        });

        var token = (0, _validateUser.generateToken)({
            userId: ret._id
        });

        return { token: token };
    } catch (error) {
        return new _apolloServerExpress2.default.ApolloError(error);
    }
};

exports.authenticate = authenticate;