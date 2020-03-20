const {Lesson} = require('./lesson.model');
const {Question} = require('../questions/question.model');
const mongoose = require('mongoose');
const getLessons = async () => {
    const lessons = Lesson.find().exec();
    return lessons;
}

const createLesson = async({name, questions}) => {
    
    let lesson = {
        name,
        questions
    };
    questions = questions.map(question => mongoose.Types.ObjectId(question));
    if(!await findQuestions(questions))
        throw new Error("One or more questions does not exist in the database. Please try again");

    const created = await Lesson.create(lesson);
    return created;
};

const updateLesson = async({name, questions}, lessonId) => {
    let lesson = {
        name,
        questions
    };

    const lessonToUpdate = await Lesson.findOne({_id: lessonId});
    lessonToUpdate.name = lesson.name;
    lessonToUpdate.questions = lesson.questions;
    await lessonToUpdate.save();
    return lessonToUpdate;
}

const findQuestions = async (questions) => {
    for(const question of questions) {
        const found = await Question.findById(question).exec();
        if(!found) {
            return false;
        }
    }
    return true;
};

module.exports = {
    createLesson, 
    getLessons,
    updateLesson
};