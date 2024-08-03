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
 |               └──| company.controller.js #logic building for comapny;
 |
 |                                                                        ☑️   company register; // at first register as an user of reqruiter. after that start the process of registering company name and further.
 |                                                                        |---Comapny name is required . building logic here. if not insert companyName return 400 status.
 |                                                                        |--- find out company name by findOne method during registering. if  does already exist with same name return a message and status.
 |                                                                        |---if doesnt exist the company name. then save it in database . having connection above to this line.
 |                                                                        |---
 |                                                                        ☑️   get all Companies here by user id.
 |                                                                        |---get all companies by Company id.
 |                                                                        ☑️get specific company then use userId of reqruiter...
 |                                                                        ☑️ update company by user id..
 |                                                                        |---first destructure the key of value which value need to update and req.body
 |                                                                        |---create a var where would include updateDate that we have destructure already above the line.
 |                                                                        |---then update the data into the findByIdAndUpdate() method
 |                                                                        |---During updating data , include req.params.id , updateDate, {new:true} inside the method above
 |
 |                      └──| Job.controller.js #logic building for job post;
 |                                                                       ☑️at first have to create job post logic by following the job models.
 |                                                                        |--- check if any fields are empty ? return missing something and bad request.
 |                                                                        |--- then create Job object and save it in database.
 |                                                                       ☑️   get all Jobs post for students .
 |                                                                        |---create query search bacise on title and description, include some query operation with regex;
 |                                                                       ☑️get admin jobs post while logged in admin.
 |                                                                        |---find the admin id, means created_by jobs?
 |                                                                       ☑️Get all jobs by id for students.
 |                                                                        |---find the jobs id
 |                                                                        |---
 |
 |                      └──| application.controller.js //buiding logic..
 |                                                                       ☑️find
 |                                                                        |---`const userId = req.id;      const jobId = req.params.id;`
 |                                                                        |---check with the userId and jobId , user already applied or not? then retrun message and request
 |                                                                        |---find job and check job exist or not by job id?
 |                                                                        |---now create new jobApplication object with job and application;
 |                                                                        ☑️get applications who applied the job
 |                                                                        |--- check with userId of the application. add job and company path;
 |                                                                        ☑️get all applications for admin who applied on that job.
 |                                                                        |---find jobId. populate applicants and applications;
 |                                                                        ☑️udate status
 |                                                                        |---request status to body
 |                                                                        |---find application id req.params.id
 |                                                                        |---
 |
 |---|routes
 |              └──|user.route.js // create route with method. // export it in the index.js file.//recive the route into index file.
 |              └──|company.route.js // create route with method. //recive the route into index file.
 |
 |---|middlewares
 |                       └──| isAuthenticates.js // check token valide or invalide with jwt and verify the user. export into routes file in the update route.and others

constuserId= req.id;

    constjobId= req.params.id;
