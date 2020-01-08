import React, {useEffect, useState} from 'react';
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avatar, Col, Typography, Row} from 'antd'
import moment from 'moment';
import Axios from 'axios';


const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {

    const [Video, setVideo] = useState([]);

    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(res => {
                if(res.data.success){
                    console.log(res.data)
                    setVideo(res.data.video);
                }
                else{
                    alert('비디오 가져오기에 실패했습니다.')
                }
            })
    }, [])

    const renderCards = Video.map((video, index) => {

        var minutes = Math.floor(video.duration/60)
        var seconds = Math.floor(video.duration - (minutes*60))

        return (
        <Col lg={6} md={8} xs={24} key={index}>
            <a href={`/video/${video._id}`}> 
                <div style={{position:'relative'}}>
                <img style={{width : '100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                    <div className="duration">
                        {<span>{minutes} : {seconds}</span>}
                    </div>
                </div>
            </a>
            <br/>
            <Meta 
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
                description=""
            />
            <span>{video.writer.name}</span><br/>
            <span style={{marginLeft: '3rem'}}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
        </Col>
        )
    })

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={3}>구독 동영상 목록</Title>
            <hr/>
            <Row gutter={[32,16]}>
                {renderCards} 
            </Row>
        </div>
    )
}

export default SubscriptionPage
