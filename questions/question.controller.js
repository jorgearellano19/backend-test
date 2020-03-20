const express = require('express');
const router = express.Router();
const questionService = require('./question.service');
const {makeSuccessResponse, makeFailResponse} = require('../helpers/response');
const authorize = require('../helpers/authorize');
// routes
router.get('/', authorize(), getQuestions);
router.post('/', authorize(), createQuestion);
router.put('/:questionId', authorize(), updateQuestion);

module.exports = router;

async function getQuestions(req, res, next) {
    try {
        const questions = await questionService.getQuestions();
        res.json(makeSuccessResponse(questions));
    } catch (err) {
        res.status(400).json(makeFailResponse(err.message));
    }
}

async function createQuestion(req, res, next) {
    try {
        const questions = await questionService.createQuestion(req.body);
        res.json(makeSuccessResponse(questions));
    } catch (err) {
        res.status(400).json(makeFailResponse(err.message));
    }
} 

async function updateQuestion(req, res, next) {
    try {
        const questions = await questionService.updateQuestion(req.body, req.params.questionId);
        res.json(makeSuccessResponse(questions));
    } catch (err) {
        res.status(400).json(makeFailResponse(err.message));
    }
} 