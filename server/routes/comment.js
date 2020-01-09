const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");//server > models > Video

//=================================
//       댓글 등록
//=================================
router.post('/saveComment',(req,res) => {
    //데이터 형태에 맞춰 입력값 셋팅
    const comment = new Comment(req.body)
    //mongoDb에 저장
    comment.save((err,comment) => {
        if (err){
            return res.json({success:false, err})
        }
        //코멘트에서 유저 정보 가져오기 세이브 상에서는 바로 populate가 불가능
        Comment.find({'_id':comment._id})
            //populate
            .populate('writer')
            .exec((err,result) => {
                if(err){
                    return res.json({success:false, err})
                }
                res.status(200).json({success: true, result})
            })
    })
})

module.exports = router;