import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import {useSelector} from 'react-redux';

//=========================
// 코맨트 wrapper.js 
//=========================
function Comment(props) {

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
            content: CommentValue,
            //redux에서 유저 데이터 가져오기 (localStorage 대용) : 기존 세션의 역활 수행
            writer: userInfo.userData._id,
            videoId: props.videoId 
        }
        
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                }
                else{
                    alert('댓글을 저장 하지 못했습니다.')
                }
            })


    }

    return (
        <div>
            <p>댓글</p><hr/>
            {/* 댓글 리스트 */}

            {/* 1단계 댓글 형태 폼 */}
            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width:'100%',borderRadius:'5px'}}
                    onChange={handleChange}
                    value={CommentValue}
                    placeholder="댓글을 작성해 주세요."
                />
                <br/>
                <button style={{height:'52px', width:'150px'}} onClick={onSubmit}>
                    등록
                </button>
            </form>
        </div>
    )
}

export default Comment
