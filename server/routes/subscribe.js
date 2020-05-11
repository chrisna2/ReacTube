const express = require('express');
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");//server > models > Video
//=================================
//        subscribe get Number
//=================================
router.post('/subscribeNumber',(req,res) => {
    //비디오를 DB에서 가져와서 클라이언트에 보낸다.
    Subscriber.find({'userTo':req.body.userTo})
        .exec((err, subscribe) => {
            if(err){
                return res.status(400).send(err);
            }
            return res.status(200).json({success:true, subscribeNumber:subscribe.length });
        })
})

//=================================
//       구독여부 확인
//=================================
router.post('/subscribed',(req,res) => {
    //비디오를 DB에서 가져와서 클라이언트에 보낸다.
    Subscriber.find({
                        'userTo':req.body.userTo,
                        'userFrom':req.body.userFrom
                    })
        .exec((err, subscribe) => {
            if(err){
                return res.status(400).send(err);
            }

            let result = false;
            if(subscribe.length!=0){
                    result = true;
            }
            return res.status(200).json({success:true, subscribed:result });
        })
})

//=================================
//       구독 취소
//=================================
router.post('/unSubscribe',(req,res) => {
    //findOneAndDelete : 한개의 데이터를 찾아서 삭제 한다.
    Subscriber.findOneAndDelete({
                        'userTo':req.body.userTo,
                        'userFrom':req.body.userFrom
                    })
        .exec((err, doc) => {
            if(err){
                return res.status(400).send(err);
            }
            return res.status(200).json({success:true, doc});
        })
})

//=================================
//       구독 등록
//=================================
router.post('/onSubscribe',(req,res) => {
    const subscribe = new Subscriber(req.body)

    subscribe.save((err,doc) => {
        if (err){
            return res.json({success:false, err})
        }
        return res.json({success:true, doc})
    })
})

module.exports = router;
