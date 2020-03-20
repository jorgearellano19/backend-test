var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var lessonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    questions: {
        type: [ObjectId],
        required: true
    }
});

const Lesson = mongoose.model('lesson', lessonSchema);

module.exports = { Lesson };