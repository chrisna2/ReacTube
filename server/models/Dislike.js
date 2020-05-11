const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//=================================
//      dislike model 만들기
//=================================

const dislikeSchema = mongoose.Schema({
    userId:{
        type : Schema.Types.ObjectId,
        //User 모델에서 가져온 아이디
        ref : 'User'
    },
    commentId : {
        type : Schema.Types.ObjectId,
        ref : 'Comment'
    },
    videoId : {
        type : Schema.Types.ObjectId,
        ref : 'Video'
    }
}, {timestamps : true})

const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike }