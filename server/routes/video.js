const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
//const { Video } = require("../models/Video");
const multer = require("multer");


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);

    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        //허용가능한 확장자 관리
        if(ext !== '.mp4'){
            return cb(res.status(400).end("mp4확장자 만 업로드 가능합니다."),false);
        }
        cb(null, true);
    }
})

const upload = multer({ storage: storage }).single("file");
//=================================
//             Video
//=================================
router.post('/uploadfiles',(req,res) => {
    //비디오를 서버에 저장한다.
    upload(req, res, err => {
        if(err){
            return res.json({ success : false, err})
        }
        return res.json({ success : true, url: res.req.file.path, fileName: res.req.file.filename})
    })
})


module.exports = router;
