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
    },
    {
        userId: 3,
        userName: 'Joseph',
        age: '23',
        gender: 'M'
    },
    {
        userId: 3,
        userName: 'Faith',
        age: '23',
        gender: 'F'
    },
    {
        userId: 5,
        userName: 'Joy',
        age: '25',
        gender: 'F'
    }
];

var userSchema = `
        type User {
            userId: String
            userName: String
    }`;


var getUser = function (args) { console.log(args); return users[0]; }
var retrieveUsers = function (args) {

    return users;
}

exports.getUser = getUser
exports.retrieveUsers = retrieveUsers
exports.userSchema = userSchema