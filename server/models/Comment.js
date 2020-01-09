const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//=================================
//      Comment model 만들기
//=================================

const commentSchema = mongoose.Schema({
    //이렇게 DB 컬랙션을 지칭하게 되면 ObjectId 기준으로 해당 데이터를 찾아간다.
    //.populate('writer') 이 뜻은 그냥 입력한 아이디만 출력하라는게 아니라 write의 정보를 'User'컬랙션에서 찾아 오라는 뜻이다.
    //해당 기능은 mongoDB를 사용하고 mongoose라는 라이브러리를 같이 등록해 주어야 같이 사용 할 수 있다.
    writer : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    videoId : {
        type : Schema.Types.ObjectId,
        ref : 'Video'
    },
    responseTo : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    content : {
        type : String
    }
}, {timestamps : true})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment }