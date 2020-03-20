const express = require('express');
const router = express.Router();
const lessonService = require('./lesson.service');
const {makeSuccessResponse, makeFailResponse} = require('../helpers/response');
const authorize = require('../helpers/authorize');
// routes
router.get('/', authorize(), getLessons);
router.post('/', authorize(), createLesson);
router.put('/:lessonId', authorize(), updateLesson);

module.exports = router;

async function getLessons(req, res, next) {
    try {
        const lessons = await lessonService.getLessons();
        res.json(makeSuccessResponse(lessons));
    } catch (err) {
        res.status(400).json(makeFailResponse(err.message));
    }
}

async function createLesson(req, res, next) {
    try {
        const lesson = await lessonService.createLesson(req.body);
        res.json(makeSuccessResponse(lesson));
    } catch (err) {
        res.status(400).json(makeFailResponse(err.message));
    }
} 

async function updateLesson(req, res, next) {
    try {
        const lesson = await lessonService.updateLesson(req.body, req.params.lessonId);
        res.json(makeSuccessResponse(lesson));
    } catch (err) {
        res.status(400).json(makeFailResponse(err.message));
    }
} 