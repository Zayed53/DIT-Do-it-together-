import express from 'express';

import {postRegister,postlogin, logout, getScope, getCallback, getFailure, welcome, getemail,  getpasswordUpdate, uploadimage, update_profile} from '../controller/user.controller.js'
import {uploadProfileImage} from '../middleware/multer.js'
import {ensureAuthenticated} from '../middleware/auth.middleware.js'

const router = express.Router();

router.post('/register', postRegister);

router.post('/login', postlogin);

router.get("/logout", logout);

router.get("/auth/google", getScope);


router.get("/google/callback",getCallback);
router.get("/google/failure",getFailure);
router.get("/welcome", welcome);
router.put("/forgetpassword", getemail);
router.post("/changepassword", getpasswordUpdate)
router.post("/updateimage", ensureAuthenticated, uploadProfileImage.single('file'), uploadimage);
router.put("/update_profile",ensureAuthenticated, update_profile );
export default router;