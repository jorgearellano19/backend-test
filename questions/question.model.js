var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var questionSchema = new Schema({
    questionType: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return v === 'Boolean' | v === 'One_Choice' | v === 'Mul_Choice' | v === 'All_Choice'
            },
            message: props => `${props.value} is not a valid type`
        }
    },
    question: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
}, {discriminatorKey: 'questionType'});




var oneChoiceSchema = new Schema({
    answer: {
        type: String,
        required: true
    },
    choices: {
        type: [String],
        required: true
    }
});

var multipleAnswerSchema = new Schema({
    answer: {
        type: [String],
        required: true
    },
    choices: {
        type: [String],
        required: true
    }
});

const Question = mongoose.model('question', questionSchema);
const SingleChoice = mongoose.model('singleChoiceAnswer', oneChoiceSchema);
const MultipleChoice = mongoose.model('multipleChoiceAnswer', multipleAnswerSchema);

Question.discriminator('Boolean', new Schema({
    answer: {
        type: Boolean,
        required: true
    }
}));

Question.discriminator('One_Choice', new Schema({
    answer: {
        type: oneChoiceSchema,
        required: true
    }
}));

Question.discriminator('Mul_Choice', new Schema({
    answer: {
        type: multipleAnswerSchema,
        required: true
    }}));
    
Question.discriminator('All_Choice', new Schema({
    answer: {
        type: multipleAnswerSchema,
        required: true
    }}));

module.exports = { Question, SingleChoice, MultipleChoice };