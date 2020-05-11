import React, {useState} from 'react'
import Axios from 'axios';
import {useSelector} from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

//=========================
// 코맨트 wrapper.js 
//=========================
function Comment(props) {
    //props : 해당 코맨트 컴포넌트를 설정한 화면에서 가져온 property value 값들.

    const [CommentValue, setCommentValue] = useState("");

    const handleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }
    //redux에서 유저 데이터 가져오기 (localStorage 대용) : 세션의 역활 수행
    const userInfo = useSelector(state => state.user);

    const onSubmit = (event) => {
        //preventDefault : 화면 전체의 이벤트가 새로고침이 되지 않도록 설정
        event.preventDefault();

        const variables = {
            //해당 데이터는 화면 컴포넌트 설정 값
            content: CommentValue,
            //redux에서 유저 데이터 가져오기 (localStorage 대용) : 기존 세션의 역활 수행
            writer: userInfo.userData._id,
            //
            videoId: props.videoId 
        }
        
        //json 통신 
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success){
                    console.log(response.data.result)
                    //부모 3스택에 이어지는 prop function
                    props.refreshComment(response.data.result)
                    setCommentValue("")
                }
                else{
                    alert('댓글을 저장 하지 못했습니다.')
                }
            })


    }

    return (
        <div>
            <p>댓글</p><hr/>
            {/* 1단계 댓글 입력 형태 폼 */}
                        <form style={{display:'flex', padding:'3px'}} onSubmit={onSubmit}>
                <textarea
                    style={{width:'100%',borderRadius:'5px'}}
                    onChange={handleChange}
                    value={CommentValue}
                    placeholder="댓글을 작성해 주세요."
                />
                <br/>
                <button style={{height:'52px', width:'150px'}} onClick={onSubmit}>
                    댓글등록
                </button>
            </form>
            {/* 댓글 리스트 */}
            {props.comments && props.comments.map((comment, idx) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment videoId={props.videoId} singleComment={comment} refreshComment={props.refreshComment}/>
                        <ReplyComment commentLists={props.comments} parentCommentId={comment._id} videoId={props.videoId} refreshComment={props.refreshComment}/>
                    </React.Fragment>
                )
            ))}
        </div>
    )
}

export default Comment
