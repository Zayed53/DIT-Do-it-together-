import express from 'express';

import {postQuestion, searchResult, getownquestion, getquestion, deleteQuestion, updatequestion} from '../controller/question.controller.js';
import {ensureAuthenticated} from '../middleware/auth.middleware.js'

const router= express.Router();

router.post('/upload',ensureAuthenticated, postQuestion);

router.get('/search', searchResult);

router.get('/getquestion', getquestion);

router.get('/getownquestion',ensureAuthenticated,  getownquestion);


router.delete('/deletequestion/:id',ensureAuthenticated,  deleteQuestion);

router.put('/updatequestion/:id',ensureAuthenticated, updatequestion);

export default router;