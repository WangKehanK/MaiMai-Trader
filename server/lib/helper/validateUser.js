"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateToken = exports.validateUserToken = undefined;

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _keys = require("../config/keys.js");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateUserToken = function validateUserToken(token) {
    // var token = jwt.sign({ unionId: "unionId", openId: "openId" }, Config.JWT.PRIVATE_KEY);
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlvbklkIjoidW5pb25JZCIsIm9wZW5JZCI6Im9wZW5JZCIsImlhdCI6MTU4NTM3NDI5OX0.66yvZEx3KyK_nhOZFk7CRhRFvLBGyMSsiS7AqPc5fag";
    console.log(token);

    _jsonwebtoken2.default.verify(token, _keys2.default.JWT.PRIVATE_KEY, function (err, decoded) {
        if (err) {
            console.log(err);
        } else {
            console.log(decoded);
        }
    });
};

var generateToken = function generateToken(data) {
    var token = _jsonwebtoken2.default.sign({
        data: data
    }, _keys2.default.JWT.PRIVATE_KEY);
    return token;
};

exports.validateUserToken = validateUserToken;
exports.generateToken = generateToken;