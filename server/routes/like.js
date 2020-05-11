const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

// 라우터.js 를 통해 db와 접속하여 데이터를 가져온다.

//=================================
//       like 숫자 조회 
//=================================
router.post("/getLikes", (req,res) => {

    let variable = {}

    if(req.body.videoId){
        variable = { videoId: req.body.videoId }
    }
    else{
        variable = { commentId:req.body.commentId }
    }
    Like.find(variable)
        .exec((err, likes) => {
            if(err) {
                return res.status(400).send(err)
            }
            res.status(200).json({success:true, likes})
        })
});

//=================================
//       dislike 숫자 조회 
//=================================
router.post("/getDislikes", (req,res) => {

    let variable = {}

    if(req.body.videoId){
        variable = { videoId: req.body.videoId }
    }
    else{
        variable = { commentId:req.body.commentId }
    }
    Dislike.find(variable)
        .exec((err, dislikes) => {
            if(err) {
                return res.status(400).send(err)
            }
            res.status(200).json({success:true, dislikes})
        })
});

//=================================
//       uplike 처리 
//=================================
router.post("/upLikes", (req,res) => {

    let variable = {}

    if(req.body.videoId){
        variable = { videoId: req.body.videoId }
    }
    else{
        variable = { commentId:req.body.commentId }
    }

    //Like Collection 클릭 처리, 데이터 입력 처리
    const like = new Like(variable)

    like.save((err, likeResult) => {
        if(err){
            return res.status(400).json({success:false, err})
        }

        //만약에 DisLike가 이미 클릭된 경우 
        Dislike.findOneAndDelete(variable)
            .exec((err,dislikeResult) => {
                if(err){
                    return res.status(400).json({success:false, err})
                }
                res.status(200).json({success:true})
            })
    })    
});

//=================================
//       unlike 처리 
//=================================
router.post("/unLikes", (req,res) => {

    let variable = {}

    if(req.body.videoId){
        variable = { videoId: req.body.videoId }
    }
    else{
        variable = { commentId:req.body.commentId }
    }
    Like.findOneAndDelete(variable)
        .exec((err, likeResult) => {
            if(err){
                return res.status(400).json({success:false, err})
            }
            res.status(200).json({success:true})
        })
});    


//=================================
//       updislike 처리 
//=================================
router.post("/upDislikes", (req,res) => {

    let variable = {}

    if(req.body.videoId){
        variable = { videoId: req.body.videoId }
    }
    else{
        variable = { commentId:req.body.commentId }
    }

    //Like Collection 클릭 처리, 데이터 입력 처리
    const dislike = new Dislike(variable)

    dislike.save((err, dislikeResult) => {
        if(err){
            return res.status(400).json({success:false, err})
        }

        //만약에 DisLike가 이미 클릭된 경우 
        Like.findOneAndDelete(variable)
            .exec((err,likeResult) => {
                if(err){
                    return res.status(400).json({success:false, err})
                }
                res.status(200).json({success:true})
            })
    })    
});

//=================================
//       undislike 처리 
//=================================
router.post("/unDislikes", (req,res) => {

    let variable = {}

    if(req.body.videoId){
        variable = { videoId: req.body.videoId }
    }
    else{
        variable = { commentId:req.body.commentId }
    }
    Dislike.findOneAndDelete(variable)
        .exec((err, dislikeResult) => {
            if(err){
                return res.status(400).json({success:false, err})
            }
            res.status(200).json({success:true})
        })
});    

module.exports = router;