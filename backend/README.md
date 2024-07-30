✅Job portals web application.

☑️Introduction of this project.

this is a job portal real web project. Where included multiple API managing user data......

☑️installation.

clone the repository into backend folder. strat your code

run: npm init     //Initialization with package.json

run: npm i  express bcryptjs mongoose cookie-parser nodemon dotenv jsonwebtoken cors

☑️ file structure during code manually created backend file as i needed.
......../backend/

 |──| index.js  # first, write core code part of backend inside index.js file
 |──| .env  #store secure credentials. Can be API keys, mongodb string, port further.
 |
 |──| utils
 |──      └──| db.js    #mongose configeration to mongodb.
 |──
 |──| models     # there are existing 4 type Schemas 1.user-model 2.job-model 3.company-model  4.application-model
 |──           └──| user.model.js   { fullname, email, phoneNumber, password, role, profile} timestamps: true
 |──           └──| job.model.js    { title, description, requirments, salary, localtion, jobType, position, company, created_by, applications,  }
 |──           └──| company.model.js   { name, description, website, location, logo, userId}
 |──           └──| application.model.js    { job, applicant, status}
 |──
 |──| controller
 |                    └──| user.controller.js    #build logic according to models //following the structure below.
 |                                                                       ☑️ register part // before registering puting some check post;
 |                                                                        |--- check if input fields are empty
 |                                                                        |---check if already exist user
 |                                                                        |--- generate hash password before creating new user.
 |                                                                        |---if not exist user. create and save into database.
 |
 |                                                                        ☑️ Login part.
 |                                                                         |---check if input fields are empty
 |                                                                         |---check user credentials if insert wrong. both email ,password  and role
 |                                                                         |---have to generate jwt token for secuirity of the application.
 |                                                                        ☑️ Logout part.
 |                                                                         |---return status 200, cookie would be empty, maxAge:0 . return a message , success true.
 |                                                                        ☑️ Update Profile.
 |                                                                         |---add and destructure which fields are need to upgrade;
 |                                                                         |---check if empty any fields before submiting. return 400 // bad status;
 |                                                                         |---first check user exist or not? return bad request; find userId from middleware seding data to upgrade user info into database.
 |                                                                         |---user exist . then upgrade providing credentials by user.
 |                                                                         |--- there one thing is important, Skills are stored in database string of array formate. i need to splite them.
 |                                                                         |---- after that i have to structured an object of user to return in client
