const errorName = {
    UNAUTHORIZED: "UNAUTHORIZED",
    CREATE_FAILED: "CREATE_FAILED",
    UPDATE_FAILED: "UPDATE_FAILED",
}

const errorType = {
    UNAUTHORIZED: {
        errorMsg: "Authentication is needed to get requested response.",
        statusCode: 401
    },
    CREATE_FAILED: {
        errorMsg: "Create posts failed.",
        statusCode: 1
    },
    UPDATE_FAILED: {
        errorMsg: "Update posts failed.",
        statusCode: 2
    },
}

const getError = errorName => {
    return errorType[errorName];
}

export { errorName, errorType, getError }