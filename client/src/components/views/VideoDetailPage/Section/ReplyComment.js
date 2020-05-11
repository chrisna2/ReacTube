import React , {useState, useEffect} from 'react';
import SingleComment from './SingleComment';


function ReplyComment(props) {

    const [ChildCommentNumber,  setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);
    
    useEffect(() => {
        let CommentNumber = 0;

        props.commentLists.map((reply) => {

            console.log(reply.responseTo +'//'+props.parentCommentId)
                if(reply.responseTo === props.parentCommentId){
                    CommentNumber ++;
                }
            })
        console.log(CommentNumber);
        setChildCommentNumber(CommentNumber);
    }
    //아래해당 값이 숫자가 바뀔때마다. 실행되도록 설정한다.
    ,[props.commentLists,props.parentCommentId]); 
    

    const renderReplyComment = (parentCommentId) => (
        props.commentLists.map((comment, idx) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId &&
                <div style={{width:'88%', marginLeft:'40px'}}>
                    <SingleComment refreshComment={props.refreshComment} singleComment={comment} videoId={props.videoId}/>
                    <ReplyComment commentLists={props.commentLists} parentCommentId={comment._id} videoId={props.videoId} refreshComment={props.refreshComment}/>
                </div>
                }
            </React.Fragment>
        ))
    )
    
    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    //탬플릿
    return (
        <div>
            {ChildCommentNumber > 0 &&
                <p style={{ fontSize:'14px', margin:0, color:'grey'}} onClick={onHandleChange}>
                    답글 {ChildCommentNumber} 개
                </p>
            }
            {OpenReplyComments &&
                renderReplyComment(props.parentCommentId)
            }
        </div>
    )
}

export default ReplyComment
