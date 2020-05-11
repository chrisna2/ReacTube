import React, {useState, useEffect} from 'react';
import {Tooltip, Icon} from 'antd';
import Axios from 'axios';

function LikeDislike(props) {

    const [LikeNumber, setLikeNumber] = useState(0);
    const [DislikeNumber, setDislikeNumber] = useState(0);

    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);

    let variable = {}

    if(props.video){
        variable = { videoId: props.videoId, userId: props.userId}
    }
    else{
        variable = { commentId: props.commentId , userId: props.userId}
    }

    useEffect(() => {
        //좋아요 조회
        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if(response.data.success){
                    // 얼마나 많은 좋아요를 받았는지
                    setLikeNumber(response.data.likes.length);

                    // 내가 좋아요를 눌렀는지
                    response.data.likes.map(like => {
                        if(like.userId === props.userId){
                            setLikeAction('liked')
                        }
                    })

                }
                else{
                    alert("Like 정보를 가져오지 못했습니다.")
                }
            })

        //싫어요 조회
        Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if(response.data.success){
                     // 얼마나 많은 좋아요를 받았는지
                     setDislikeNumber(response.data.dislikes.length);

                    // 내가 좋아요를 눌렀는지
                    response.data.dislikes.map(dislike => {
                        if(dislike.userId === props.userId){
                            setDislikeAction('disliked')
                        }
                    })

                }
                else{
                    alert("Dislike 정보를 가져오지 못했습니다.")
                }
            })
    }, [])

    // 좋아요 클릭
    const onLike = () => {

        if(LikeAction === null){
            Axios.post('/api/like/upLikes', variable)
                .then(response => {
                    if(response.data.success){
                        setLikeAction('liked')
                    }
                    else{
                        alert("Like 처리에 실패 했습니다.")
                    }
                })
        }
        else{
            Axios.post('/api/like/unLikes', variable)
                .then(response => {
                    if(response.data.success){
                        setLikeAction(null)
                    }
                    else{
                        alert("Like 처리에 실패 했습니다.")
                    }
                })
        }
    }

    // 싫어요 클릭
    const onDislike = () => {

        if(DislikeAction === null){
            Axios.post('/api/like/upDislikes', variable)
                .then(response => {
                    if(response.data.success){
                        setDislikeAction('disliked')
                    }
                    else{
                        alert("dislike 처리에 실패 했습니다.")
                    }
                })
        }
        else{
            Axios.post('/api/like/unDislikes', variable)
                .then(response => {
                    if(response.data.success){
                        setLikeAction(null)
                    }
                    else{
                        alert("dislike 처리에 실패 했습니다.")
                    }
                })
        }
    }    

    return (
        <div>
            <span key="coment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? "filled" : "outlined"}
                        onClick={onLike}/>
                </Tooltip>
                <span styl={{panddingLeft:'8px', cursor:'auto'}}>{LikeNumber}</span>
            </span>
            &nbsp;
            <span key="coment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DislikeAction === 'disliked' ? "filled" : "outlined"}
                        onClick={onDislike}/>
                </Tooltip>
                <span styl={{panddingLeft:'8px', cursor:'auto'}}>{DislikeNumber}</span>
            </span>
        </div>
    )
}

export default LikeDislike
