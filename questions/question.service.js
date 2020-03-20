const Questions = require('./question.model');

const getQuestions = async () => {
    const questions = await Questions.Question.find().exec();
    return questions;
};

const createQuestion = async ({ questionType, question, answer, score }) => {
    let insert = {
        questionType,
        question,
        answer,
        score,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    const created = await Questions.Question.create(insert)
    return created;
}

const updateQuestion = async ({ questionType, question, answer, score }, questionId) => {
        let insert = {
            questionType,
            question,
            answer,
            score,
            updatedAt: Date.now()
        };
        const questionToUpdate = await Questions.Question.findOne({ _id: questionId });
        questionToUpdate.answer = insert.answer;
        questionToUpdate.questionType = insert.questionType;
        questionToUpdate.question = insert.question;
        questionToUpdate.score = insert.score;
        questionToUpdate.updatetAt = insert.updatedAt;
        await questionToUpdate.save();
        return questionToUpdate;
}
module.exports = {
    getQuestions,
    createQuestion,
    updateQuestion
};