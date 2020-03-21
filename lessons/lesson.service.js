const {Lesson} = require('./lesson.model');
const {Question} = require('../questions/question.model');
const {getQuestionsDetail} = require('../questions/question.service')
const { GeneralException } = require('../helpers/general-exception')
const mongoose = require('mongoose');

const getLessons = async () => {
    const lessons = Lesson.find().exec();
    return lessons;
}

const getLessonDetail = async (id) => {
    const lesson = await Lesson.findById(id).exec();
    questionDetails = await getQuestionsDetail(lesson.questions);
    return {
        ...lesson.toJSON(),
        questionDetails
    }
}

const createLesson = async({name, questions}) => {
    
    let lesson = {
        name,
        questions
    };
    questions = questions.map(question => mongoose.Types.ObjectId(question));
    if(!await getQuestionsDetail(questions))
        throw new Error("One or more questions does not exist in the database. Please try again");

    const created = await Lesson.create(lesson);
    return created;
};

const updateLesson = async({name, questions, isActive}, lessonId) => {
    let lesson = {
        name,
        questions,
        isActive
    };

    const lessonToUpdate = await Lesson.findOne({_id: lessonId});
    lessonToUpdate.name = lesson.name;
    lessonToUpdate.questions = lesson.questions;
    lessonToUpdate.isActive = lesson.isActive;
    await lessonToUpdate.save();
    return lessonToUpdate;
}

const findLessons = async (lessons) => {
    for(const lesson of lessons) {
        const found = await Lesson.findById(lesson).exec();
        if(!found) {
            return false;
        } 
    }
    return true; 
};

const getLessonsDetails = async (lessons) => {
    let arrayLessons = [];
    for(const lesson of lessons) {
        const found = await Lesson.find({_id:lesson, isActive: true}).exec();
        arrayLessons.push(found);
    }
    return arrayLessons; 
};

const answerLesson = async ({answers}, lessonId) => {
    const details = await getLessonDetail(lessonId);
    let scoreUser = 0;
    details.questionDetails.forEach(question => {
       const index = answers.findIndex(ans => ans._id == question._id);
       if(index < 0) {
            exception = new GeneralException('Questions are missing');
            throw exception;
        }
        switch(question.questionType) {
            case "Boolean":
                if(question.answer === answers[index].answer)
                    scoreUser+=question.score;
                break;
            case "All_Choice":
                if(!Array.isArray(answers[index].answer)){
                    exception = new GeneralException('Bad typing in all choice answer');
                    throw exception;
                }
                if(question.answer.answer.sort().join(',')=== answers[index].answer.sort().join(','))
                    scoreUser+=question.score;
                break;
            case "One_Choice":
                if(question.answer.answer === answers[index].answer)
                    scoreUser+=question.score; 
                break;
            case "Mul_Choice":
                if(question.answer.answer.some(a => answers[index].answer.indexOf(a) >= 0))
                    scoreUser+=question.score; 
                break;
        }
    });

    const lessonScore = details.questionDetails.reduce((total, current) => {
        return {score: total.score + current.score}
    });
    if(scoreUser <= lessonScore.score) {
        return {
            success: false,
            scoreUser,
            lessonScore: lessonScore.score
        }
    }
    else return {
        success: true,
        scoreUser,
        lessonScore: lessonScore.score
    }  
}

module.exports = {
    createLesson, 
    getLessons,
    updateLesson,
    findLessons,
    getLessonDetail,
    answerLesson
};