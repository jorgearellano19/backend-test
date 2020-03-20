const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const authorize = require('../helpers/authorize')
const Role = require('../helpers/roles');

// routes
router.post('/authenticate', authenticate);     // public route
module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}