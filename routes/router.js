const { Router } = require('express');
const route = Router();
const userSignup = require('./userRoutes/userAuth/signup.js');
const userLogin = require('./userRoutes/userAuth/login.js');
const hrSignup = require('./hrRoutes/hrAuth/signup.js');
const hrLogin = require('./hrRoutes/hrAuth/login');
const createJobPost = require('./hrRoutes/jobPost.js');
const getPostedJobs = require('./hrRoutes/getPostedJobs.js');
const verifyUser = require('../controllers/verifyUser.js');
const fetchUser = require('../middlewares/fetchUserFromToken.js');
const userProfile = require('../routes/userRoutes/profile.js')
const cpUpload = require('./multer/multer.js');
const getAllJobsForUser = require('./userRoutes/getAllJobs.js');
const hrLogout = require('./hrRoutes/hrAuth/hrLogout.js');
const getJobDetail = require('./userRoutes/jobDetail.js');
const verifyHr = require('../controllers/verifyHr.js');
const upload = require('./multer/multer.js');


//  verification route
route.post('/verifyuser', fetchUser, verifyUser);
route.post('/verifyhr', fetchUser, verifyHr);

// user routes
route.post('/api/v1/user/login', userLogin);
route.post('/api/v1/user/signup', userSignup);
route.post('/api/v1/user/profile', fetchUser, upload.fields([{ name: 'avatar', maxCount: 1 },{ name: 'video', maxCount: 1 },]), userProfile);
route.get('/api/v1/user/getAllJobs', fetchUser, getAllJobsForUser);
route.get('/api/v1/user/job/detail/:id', fetchUser, getJobDetail);

// hr/company routes 

route.post('/api/v1/hr/login', hrLogin);
route.post('/api/v1/hr/signup', hrSignup);
route.get('/api/v1/hr/logout', hrLogout);
route.post('/api/v1/hr/jobpost', fetchUser, createJobPost);
route.get('/api/v1/hr/getPostedJobs', fetchUser, getPostedJobs);



module.exports = route;