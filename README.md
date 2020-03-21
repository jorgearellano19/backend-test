# Backend Test.

## Project Architecture.
The backend is in node.js 10.16.3.
The Database is in mongodb 4.2.
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

## Run the project.
For start the service the only thing you need to do is type `node server.js` in the terminal.
