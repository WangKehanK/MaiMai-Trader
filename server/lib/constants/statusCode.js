"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var errorName = {
    UNAUTHORIZED: "UNAUTHORIZED",
    CREATE_FAILED: "CREATE_FAILED",
    UPDATE_FAILED: "UPDATE_FAILED",
    GET_POSTS_FAILED: "GET_POSTS_FAILED",
    GET_POSTS_LIST_FAILED: "GET_POSTS_LIST_FAILED"
};

var errorType = {
    UNAUTHORIZED: {
        errorMsg: "Authentication is needed to get requested response.",
        statusCode: 401
    },
    CREATE_FAILED: {
        errorMsg: "Create posts failed.",
        statusCode: 100
    },
    UPDATE_FAILED: {
        errorMsg: "Update posts failed.",
        statusCode: 101
    },
    GET_POSTS_FAILED: {
        errorMsg: "Get posts list failed.",
        statusCode: 102
    }
};

var getError = function getError(errorName) {
    // TODO: error handling

    if (errorType[errorName]) {
        return errorType[errorName];
    } else {
        return errorName;
    }
};

exports.errorName = errorName;
exports.errorType = errorType;
exports.getError = getError;