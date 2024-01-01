import express from 'express';

import {uploadvideo , searchResult, deleteVideo, getownVideo, getvideo, updateVideo} from "../controller/vedio.controller.js"
import {ensureAuthenticated} from '../middleware/auth.middleware.js'
import {uploadvideoFile} from '../middleware/multer.js'

const router= express.Router();

router.post('/upload',ensureAuthenticated,uploadvideoFile.single('file'),  uploadvideo);
router.get('/search', searchResult);
router.delete('/delete/:id',ensureAuthenticated,  deleteVideo);

router.get('/getvideo', getvideo);

router.get('/getownvideo',ensureAuthenticated,  getownVideo);

router.put('/updatevideo/:id',ensureAuthenticated, updateVideo);
export default router;