import React , {useState, useEffect} from 'react';
import {Comment, Avatar, Button, Input} from 'antd';
import {useSelector} from 'react-redux';
import Axios from 'axios';
import LikeDislike from './LikeDislike.js';

const {TextArea} = Input;

function SingleComment(props) {

    const [OpenReply, setOpenReply] = useState(false)

    const [CommentValue, setCommentValue] = useState("")

    //redux에서 유저 데이터 가져오기 (localStorage 대용) : 세션의 역활 수행
    const userInfo = useSelector(state => state.user);

    const onClickOpenReply = () => {
        setOpenReply(!OpenReply);//! 토글 기능이다 이런게 tip 임
    }

    const secondHandleChange = (event) => {
        setCommentValue(event.currentTarget.value);
    }
    const onSubmit = (event) => {
        //preventDefault : 화면 전체의 이벤트가 새로고침이 되지 않도록 설정
        event.preventDefault();
        //답글과 관련한 모든 정보
        const variables = {
            content: CommentValue,
            //redux에서 유저 데이터 가져오기 (localStorage 대용) : 기존 세션의 역활 수행
            writer: userInfo.userData._id,
            videoId: props.videoId,
            responseTo: props.singleComment._id
        }
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
    
    const actions = [<LikeDislike comment commentId={props.singleComment._id} userId={localStorage.getItem("userId")}/>, 
                     <span onClick={onClickOpenReply} key="comment-basic-reply-to">&nbsp; 답글쓰기</span>]    
    
    //여기가 템플릿 부분이다. 화면의 구성
    return (
        <div>
            <Comment
                actions={actions}
                author={props.singleComment.writer.name}
                avatar={<Avatar src={props.singleComment.writer.image} alt="작성자이미지"/>}
                content={<p>{props.singleComment.content}</p>}
            />
            {/* 2단계 댓글 입력 형태 폼 */
                OpenReply &&
                <form style={{display:'flex' , padding:'3px'}} onSubmit={onSubmit}>
                    <textarea
                        style={{width:'100%',borderRadius:'5px'}}
                        onChange={secondHandleChange}
                        value={CommentValue}
                        placeholder="답글을 작성해 주세요."
                    />
                    <br/>
                    <button style={{height:'52px', width:'150px'}} onClick={onSubmit}>
                        답글등록
                    </button>
                </form>
            }
        </div>
    )
}

export default SingleComment
