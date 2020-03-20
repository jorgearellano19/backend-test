const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('../helpers/roles');

// users hardcoded.
const users = [
    { id: 1, username: 'admin', password: 'admin', role: Role.Professor },
    { id: 2, username: 'user', password: 'user', role: Role.Student }
];

module.exports = {
    authenticate
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}