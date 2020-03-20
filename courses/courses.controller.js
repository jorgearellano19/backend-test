const express = require('express');
const router = express.Router();
const courseService = require('./course.service');
const {makeSuccessResponse, makeFailResponse} = require('../helpers/response');
const authorize = require('../helpers/authorize');
const Role = require('../helpers/roles');


router.get('/', authorize(Role.Professor), getCourses);
router.get('/students', authorize(Role.Student), getCoursesByStudent);
router.get('/:courseId', authorize(), getCourseById);
router.post('/', authorize(Role.Professor), createCourse);
router.put('/:courseId', authorize(Role.Professor), updateCourse);

module.exports = router;

async function getCourses(req, res, next) {
    try {
        const courses = await courseService.getCourses();
        res.json(makeSuccessResponse(courses));
    } catch (err) {
        res.status(400).json(makeFailResponse(err.message));
    }
}

async function getCourseById(req, res, next) {
    try {
        const courses = await courseService.getCourseById(req.params.courseId);
        res.json(makeSuccessResponse(courses));
    } catch (err) {
        res.status(400).json(makeFailResponse(err.message));
    }
}

async function createCourse(req, res, next) {
    try {
        const course = await courseService.createCourse(req.body);
        res.json(makeSuccessResponse(course));
    } catch (err) {
        res.status(400).json(makeFailResponse(err.message));
    }
} 

async function updateCourse(req, res, next) {
    try {
        const course = await courseService.updateCourse(req.body, req.params.courseId);
        res.json(makeSuccessResponse(course));
    } catch (err) {
        res.status(400).json(makeFailResponse(err.message));
    }
}

async function getCoursesByStudent(req, res, next) {
    try {
        const courses = await courseService.getCoursesByStudent(req.user); 
        res.json(makeSuccessResponse(courses));
    } catch (err) {
        res.status(400).json(makeFailResponse(err.message));
    }
}
