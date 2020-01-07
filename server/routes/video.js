const express = require('express');
const router = express.Router();
const { auth } = require("../middleware/auth");
const { Video } = require("../models/Video");//server > models > Video
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");

//=================================
//             Video
//=================================
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

//비디오 파일 경로에 저장
router.post('/uploadfiles',(req,res) => {
    //비디오를 서버에 저장한다.
    upload(req, res, err => {
        if(err){
            return res.json({ success : false, err})
        }
        return res.json({ success : true, url: res.req.file.path, fileName: res.req.file.filename})
    })
})

//=================================
//             Thumbnail
//=================================
//비디오 파일 썸네일 생성
router.post('/thumbnail',(req,res) => {
    //썸네일 생성 하고 비디오 러닝 타임 가져오기

    //파일 경로 , 길이 변수 설정
    let filePath = "";
    let fileDuration = "";

    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.log(metadata);
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    });

    //썸네일 생성
    ffmpeg(req.body.url)
    .on('filenames', function(filenames){
        console.log("will generate " + filenames.join(', '))
        console.log(filenames)

        filePath = "uploads/thumbnails/"+filenames[0]
    })
    .on('end', function(){
        console.log("Screenshots taken");
        return res.json({success:true, url: filePath, fileDuration: fileDuration})
    })
    .on('error', function(err){
        console.log(err)
        return res.json({success:false, err});
    })
    //스크린샷 옵션 3개의 스크린 샷을 찍고 저장경로, 파일이름, 크기 설정
    .screenshots({
        count: 3,
        folder: 'uploads/thumbnails',
        size: "320x240",
        //'%b' : input basename (filename w/o extension)
        filename: 'thumbnail-%b.png'
    })
})

//=================================
//             uploadVideo
//=================================
router.post('/uploadVideo',(req,res) => {
    //비디오 정보 DB 저장
    const video = new Video(req.body)

    video.save((err,doc) => {
        if(err){
            return res.json({success:false, err})
        }
        res.status(200).json({success: true})
    })
})

//=================================
//             videoList
//=================================
router.get('/getVideos',(req,res) => {
    //비디오를 DB에서 가져와서 클라이언트에 보낸다.
    Video.find()
        //아래 것을 해줘야 모든 DB 정보를 가져온다.
        .populate('writer')
        .exec((err, video) => {
            if(err){
                return res.status(400).send(err);
            }
            res.status(200).json({success:true, video})
        })

})


module.exports = router;
