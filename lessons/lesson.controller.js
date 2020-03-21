const express = require('express');
const router = express.Router();
const lessonService = require('./lesson.service');
const {makeSuccessResponse, makeFailResponse} = require('../helpers/response');
const authorize = require('../helpers/authorize');
const Role = require('../helpers/roles');

// routes
router.get('/', authorize(), getLessons);
router.get('/:lessonId', authorize(), getLessonDetail);
router.post('/', authorize(Role.Professor), createLesson);
router.put('/answer/:lessonId', authorize(), answerLesson);
router.put('/:lessonId', authorize(Role.Professor), updateLesson);

module.exports = router;

async function getLessons(req, res, next) {
    try {
        const lessons = await lessonService.getLessons();
        res.json(makeSuccessResponse(lessons));
    } catch (err) {
        res.status(400).json(makeFailResponse(err.message));
    }
}

async function getLessonDetail(req, res, next) {
    try {
        const lessons = await lessonService.getLessonDetail(req.params.lessonId);
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

async function answerLesson(req, res, next){
    try {
        const lesson = await lessonService.answerLesson(req.body, req.params.lessonId);
        res.json(makeSuccessResponse(lesson));
    } catch(err) {
        res.status(400).json(makeFailResponse(err.message));   
    }
} 