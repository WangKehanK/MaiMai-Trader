import jwt from "jsonwebtoken";

import Config from "../config/keys.js";

var validateUserToken = function (token) {
    // var token = jwt.sign({ unionId: "unionId", openId: "openId" }, Config.JWT.PRIVATE_KEY);
    var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlvbklkIjoidW5pb25JZCIsIm9wZW5JZCI6Im9wZW5JZCIsImlhdCI6MTU4NTM3NDI5OX0.66yvZEx3KyK_nhOZFk7CRhRFvLBGyMSsiS7AqPc5fag";
    console.log(token);

    jwt.verify(token, Config.JWT.PRIVATE_KEY, function (err, decoded) {
        if (err) {
            console.log(err);
        } else {
            console.log(decoded);
        }
    });
}

export {
    validateUserToken
}