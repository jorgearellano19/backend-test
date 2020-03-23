const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('../helpers/roles');

// users hardcoded.
const users = [
    { id: 1, username: 'admin', password: 'admin', role: Role.Professor},
    { id: 2, username: 'user', password: 'user', role: Role.Student, previousCourses: [{
        id: '5e753cd3d4adc40d3008b7e5',
        lessonsPassed: 0
    }] },
    { id: 2, username: 'user2', password: 'user2', role: Role.Student, previousCourses: [] }
];

module.exports = {
    authenticate
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id, role: user.role, previousCourses: []}, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}