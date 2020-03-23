# Backend Test.

## Project Architecture.
The backend is in node.js 10.16.3.
The Database is in mongodb 4.2.

I chose Mongodb because it's a nosql database scalable and it's useful with javascript. MongoDB stores documents and with that we can store all the data without make any transformations.
## Dependencies.
Here's the dependencies list of the project and its use.
|Dependency|Use in the project  |
|--|--|
|express| Used for the server creation.  |
|body-parser|Parse the body requests. |
|jwt/ express-jwt|Handle role-based authorization |
|mongoose|Schema validator in mongodb|

## Database tables.
This project uses 3 tables in the database. These are:

Questions:

     {
	    "questionType": "One_Choice" | "All_Choice" | "Mul_Choice" | "Boolean",
	    "_id": ObjectID,
	    "question": String,
	    "score": Number,
	    "isActive": Boolean
	    "updatedAt": Date,
	    "answer": {
		    "choices": Array<String>,
		    "answer": String
	    } || {
		    "choices": Array<String>,
		    "answer": Array<String>
	    } || Boolean
    }

 Lessons: 

     {
    	    "_id": ObjectID,
    	    "name": String,
    	    "isActive": Boolean
    	    "questions": Array<ObjectID>
     }
 Courses: 

     {
    	    "_id": ObjectID,
    	    "name": String,
    	    "previous": Array<ObjectID>,
	    	"lessons": Array<ObjectID>

     }

## Requests
### Courses
#### Get CoursesBy Student.
Route: /courses/student
Request: GET
Params: `No params`
Response: 
`{"success": true, data: [...courses, canTakeCourse: Boolean]}`

#### Get Course Detail.
Route: /courses/:courseId
Request: GET
Params: `No params`
Response: 
`{"success": true, data: [...courses, canTakeCourse: Boolean]}`


#### Create Course:
Route: /courses
Request: POST
Params: `{"name": String, "previous"?: [ObjectId], "lessons": [ObjectId]}`
Response: `{Course}`

#### Update Course:
Route: /courses/:courseId
Request: PUT
Note: If you modify the isActive property, you're going to "delete" this Course
Params: `{"name": String, "previous"?: [ObjectId], "lessons": [ObjectId], "isActive": Boolean}`
Response: `{Course}`

### Lessons
#### Create Lesson
Route: /lessons
Request: POST
Params: Params: `{"name": String, "questions": [ObjectId], "lessons": [ObjectId]}`
Response: 
`{"success": true, data: Lesson}`

#### Update Lesson
Route: /lessons/:lessonId
Request: PUT
Params: Params: `{"name": String, "questions": [ObjectId], "lessons": [ObjectId], "isActive": Boolean}`
Note: If you set the isActive property to false, you're going to "delete" this Lesson
Response: 
`{"success": true, data: Lesson}`

#### Get Lessons.
Route: /lessons
Request: GET
Params: `No params`
Response: 
`{"success": true, data: [...Lessons]}`

#### Get Lesson Details
Route: /lessons/:lessonId
Request: GET
Params: `No params`
Response: 
`{"success": true, data: {...Lesson, questionDetails: [Question]}}`

#### Answer Questions
Route: /lessons/answer/:lessonId
Request: PUT
Params: 
`{
	"answers": [
		{
			"_id": "ObjectID",
			"answer": answer
		}
	]}`
Response: `{success: true, "data": {"success": Boolean, "scoreUser: Number, "lessonScore": Number "}}`

### Questions.
#### Create Question
Route: /questions
Request: POST
Params: `{
	    "questionType": "One_Choice" | "All_Choice" | "Mul_Choice" | "Boolean",
	    "_id": ObjectID,
	    "question": String,
	    "score": Number,
	    "updatedAt": Date,
	    "answer": {
		    "choices": Array<String>,
		    "answer": String
	    } || {
		    "choices": Array<String>,
		    "answer": Array<String>
	    } || Boolean
    }`
Response: 
`{"success": true, data: Question}`


#### Update Question
Route: /questions/:questionId
Request: PUT
Params: `{
	    "questionType": "One_Choice" | "All_Choice" | "Mul_Choice" | "Boolean",
	    "question": String,
	    "score": Number,
	    "isActive": Boolean,
	    "updatedAt": Date,
	    "answer": {
		    "choices": Array<String>,
		    "answer": String
	    } || {
		    "choices": Array<String>,
		    "answer": Array<String>
	    } || Boolean
    }`
    Note: If you set isActive property to false, you're going to "delete" the element
Response: 
`{"success": true, data: Question}`

#### Get Questions.
Route: /questions
Request: GET
Params: `No params`
Response: 
`{"success": true, data: [...Questions]}`


## Run the project.
For start the service the only thing you need to do is type first `npm install ` and then `node server.js` in the terminal. Make sure you have mongodb in your computer.

### Authorization.

For testing purpose, the users available are harcoded in ./users/user.service.js. There are one proffesor and two students for the moment.

If you want an access token you need to do a POST request in /users/authenticate with the following params: 

    {"user": String, "password": String}
If the Login is successfull, you'll recieve the token for the requests.


