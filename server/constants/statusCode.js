const errorName = {
    UNAUTHORIZED: "UNAUTHORIZED",
    CREATE_FAILED: "CREATE_FAILED",
    UPDATE_FAILED: "UPDATE_FAILED",
    GET_POSTS_FAILED: "GET_POSTS_FAILED",
    GET_POSTS_LIST_FAILED: "GET_POSTS_LIST_FAILED",
}

const errorType = {
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
    },
}

const getError = errorName => {
    // TODO: error handling

    if (errorType[errorName]) {
        return errorType[errorName];
    } else {
        return errorName;
    }
}

export { errorName, errorType, getError }