const {Course} = require('./course.model');
const mongoose = require('mongoose');
const {findLessons} = require('../lessons/lesson.service');
const {GeneralException} = require('../helpers/general-exception');


const getCourses = async () => {
    const courses = Course.find().exec();
    return courses;
}

const getCoursesByStudent = async (user) => {
    const courses = await Course.find().exec();
    console.log(courses);
    return courses.map(course => ({
        ...course.toJSON(),
        canTakeCourse: course.previous ? findCourseInPrevious(course, user.previousCourses) : true
    }));
};

function findCourseInPrevious(course, previousCourses) {
    return course.previous.every(c => previousCourses.findIndex(previous => previous === c) >= 0);
}

const createCourse = async (course) => {
    course = await validateCourse(course);
    const courseCreated = await Course.create(course);
    return courseCreated;
};

const updateCourse = async (course, courseId ) => {
    course = await validateCourse(course);
    const courseToUpdate = await Course.findOne({_id: courseId}).exec();
    courseToUpdate.name = course.name;
    courseToUpdate.lessons = course.lessons;
    await courseToUpdate.save();
    return courseToUpdate;
};

const findCourses = async (courses) => {
    for(const course of courses) {
        const found = await Course.findById(course).exec();
        if(!found) {
            return false;
        } 
    }
    return true; 
}

const validateCourse = async(course) => {
    course.lessons = course.lessons.map(lesson => mongoose.Types.ObjectId(lesson));
    if(!await findLessons(course.lessons))
        throw new Error("One or more lessons does not exist in the database. Please try again");

    if(course.previous) {
        course.previous = course.previous.map(previousCourse => mongoose.Types.ObjectId(previousCourse));
        if(!await findCourses(course.previous)) {
            exception = new GeneralException('One or more previous courses does not exist in the database. Please try again');
            throw exception;
        }
    }
    return course;
};

module.exports = {
    getCourses, 
    createCourse,
    updateCourse,
    getCoursesByStudent
};

