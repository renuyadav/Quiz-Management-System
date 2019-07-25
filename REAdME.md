#Quiz Management System

Features:

• Client should be able to register himself
• Details about client like Name, Address, username, password etc
• Client should be able to create question bank. A question can belong to many question bank
• Answers can be single or multiple choice
• Complexity can be assigned with question
• Candidate can register with quiz
• Questions are presented to the candidate.

I have used below Tech stack:
1.	React JS, Redux, Redux saga 
2.	Web pack for bundling
3.	Express and mongoose – For routing, middleware and connectivity with MongoDB.
4.	MongoDB

Completed Tasks:

1.	I have created User login and registration screen. I have used bcrypt library to hash password.
2.	After login user will be redirected to question bank screen, where he can add multiple questions and answers.
3.	Edit/Delete the existing questions.
4.	Question can belong to many question banks(quizzes).
5.	Candidate can create multiple quizzes. Add/Delete/edit/search functionality  is implemented.
6.	Log out screen

Pending tasks:
1. Quiz for candidates
2. Sharing the Quiz with candidates
