const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//=================================
//      video model 만들기
//=================================

const videoSchema = mongoose.Schema({
    writer:{
        type : Schema.Types.ObjectId,
        //User 모델에서 가져온 아이디
        ref : 'User'
    },
    title : {
        type : String,
        maxlength : 50
    },
    description : {
        type : String
    },
    privacy : {
        type : Number
    },
    filePath : {
        type : String
    },
    category : {
        type : String
    },
    views : {
        type : Number,
        default : 0
    },
    duration : {
        type : String
    },
    thumbnail : {
        type : String
    }
}, {timestamps : true})

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }