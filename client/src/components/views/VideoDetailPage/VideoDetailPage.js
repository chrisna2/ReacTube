import React, {useState, useEffect} from 'react';
import { Row, Col, List, Avatar} from 'antd';
import Axios from 'axios';
import SideVideo from './Section/SideVideo.js';
import Subscribe from './Section/Subscribe.js';
import Comment from './Section/Comment.js';
import LikeDislike from './Section/LikeDislike.js';


function VideoDetailPage(props) {
    
    const videoId = props.match.params.videoId;
    const variable = {videoId : videoId};

    const [VideoDetail, setVideoDetail] = useState([]);
    const [Comments, setComments] = useState([])

    useEffect(() => {
        //[1] 비디오 정보
        Axios.post('/api/video/getVideoDetail',variable)
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                    setVideoDetail(response.data.videoDetail);
                }
                else{
                    alert("동영상 데이터 가져오기에 실패했습니다.");
                }
            })

        //[2] 댓글 정보
        Axios.post('/api/comment/getCommentList', variable)
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                    setComments(response.data.comments)
                }
                else{
                    alert("댓글 목록이 출력되지 않았습니다.")
                }
            })
    }, [])

    //아래 컴포넌트가 서븜밋을 수행시 부모 컴포넌트에 수행 결과를 업데이트 해줘야한다. 일종에 콜백
    const refreshComment = (newComment) =>{
        console.log(newComment);
        setComments(Comments.concat(newComment));
    }
   //화면 구성
    //writer 정보가 있는경우
    if(VideoDetail.writer){
        return (
            <Row gutter={[16,16]}>
                <Col lg={18} md={24}>
                    <div style={{width:'100%',padding:'3rem 4rem'}}>
                        <video style={{width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
                        <List.Item
                            actions={[<LikeDislike video videoId={videoId} userId={localStorage.getItem("userId")}/>,  
                                      <Subscribe userTo={VideoDetail.writer._id} />]}>
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image}/>}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}>
                            </List.Item.Meta>
                        </List.Item>
                        {/* comment 섹션 */}
                        <Comment videoId={videoId} comments={Comments}  refreshComment={refreshComment}/>
                    </div>
                </Col>
                {/*side video 섹션 */}
                <Col lg={6} xs={24}>
                    <SideVideo  />
                </Col>
            </Row>
        )
    }
    //writer 없는경우
    else{
        return (
            <div>...로딩중입니다 잠시만 기다려 주세요</div>
        )
    }
}

export default VideoDetailPage
