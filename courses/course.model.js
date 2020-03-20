var mongoose  = require('mongoose');

var Schema = mongoose.Schema,
ObjectId = Schema.Types.ObjectId;

var courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    previous: {
        type: [ObjectId],
    },
    lessons: {
        type: [ObjectId],
        required: true,
        validate: [minArray, '{PATH} has to have at least one lesson']
    }
});

function minArray(val) {
    return val.length > 0;
}

const Course = mongoose.model('course', courseSchema);

module.exports = {
    Course
}