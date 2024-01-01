import express from 'express';

import {postAnswer, getanswer, getownanswer, deleteAnswer, updateanswer} from '../controller/answer.controller.js';
import {ensureAuthenticated} from '../middleware/auth.middleware.js'

const router= express.Router();

router.post('/upload/:id',ensureAuthenticated, postAnswer);

router.get('/getanswer/:id', getanswer);

router.get('/getownanswer/',ensureAuthenticated,  getownanswer);

router.delete('/deleteanswer/:id',ensureAuthenticated,  deleteAnswer);

router.put('/updateanswer/:id',ensureAuthenticated, updateanswer);


export default router;