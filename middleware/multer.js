import multer from 'multer';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const fileFilter = (req, file, cb) => {
    const allowedType = ["image/jpeg", "image/jpg", "image/png"];
    if (allowedType.includes(file.mimetype)) {
      cb(null, true);
    } else cb(null, false);
  };
  
  const profileImage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
    },
  });
  
  export const uploadProfileImage = multer({ storage: profileImage, fileFilter });

  const videofileFilter = (req, file, cb) => {
    const allowedType = ["video/mp4", "video/webm", "video/ogg"];
    if (allowedType.includes(file.mimetype)) {
      cb(null, true);
    } else cb(null, false);
  };
  
  const videostorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Storage/uploadVideo");
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4()+"-"+Date.now() + "-" + file.originalname );
    },
  });
  
  export const uploadvideoFile = multer({
    storage: videostorage,
    videofileFilter
  });