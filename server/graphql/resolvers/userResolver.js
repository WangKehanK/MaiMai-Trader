

var users = [
    {
        userId: 1,
        userName: 'Brian',
        age: '21',
        gender: 'M'
    },
    {
        userId: 2,
        userName: 'Kim',
        age: '22',
        gender: 'M'
    }
];

var getUser = function (args) {
    return users[0];
}

var getUsers = function (args) {
    return users;
}

export default {
    Query: {
        getUser: getUser,
        getUsers: getUsers
    }
}