require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
const userController = require('./users/user.controller');
const questionController = require('./questions/question.controller');
const lessonController = require('./lessons/lesson.controller');
const courseController = require('./courses/courses.controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/dacodes_courses', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log(`DB Connection Error: ${err.message}`);
    });

app.use(jwt());

// api routes
app.use('/users', userController);
app.use('/questions', questionController);
app.use('/lessons', lessonController);
app.use('/courses', courseController);

app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});