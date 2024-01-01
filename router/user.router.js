import express from 'express';

import {postRegister,postlogin, logout, getScope, getCallback, getFailure, welcome } from '../controller/user.controller.js'


const router = express.Router();

router.post('/register', postRegister);

router.post('/login', postlogin);

router.get("/logout", logout);

router.get("/auth/google", getScope);


router.get("/google/callback",getCallback);
router.get("/google/failure",getFailure);
router.get("/welcome", welcome);
export default router;