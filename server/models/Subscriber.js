const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//=================================
//      subscriber model 만들기
//=================================

const subscriberSchema = mongoose.Schema({
    userTo:{
        type : Schema.Types.ObjectId,
        //User 모델에서 가져온 아이디
        ref : 'User'
    },
    userFrom : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
}, {timestamps : true})

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = { Subscriber }