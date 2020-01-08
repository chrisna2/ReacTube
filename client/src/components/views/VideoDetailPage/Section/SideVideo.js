import React, {useState, useEffect} from 'react'
import Axios from 'axios';


function SideVideo() {

    const [sideVideo, setSideVideo] = useState([]);

    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(res => {
                if(res.data.success){
                    console.log(res.data)
                    setSideVideo(res.data.video);
                }
                else{
                    alert('비디오목록 가져오기에 실패했습니다.')
                }
            })
    }, []);

    const renderSideVideo = sideVideo.map((video, idx) => {

        var minutes = Math.floor(video.duration/60)
        var seconds = Math.floor(video.duration - (minutes*60))

        return (
            <div key={idx} style={{display:"flex", marginBottom:"1rem", padding:"0 2rem"}}>
                <div style={{width:'40%', marginRight:'1rem'}}>
                    <a href={`/video/${video._id}`}>
                        <img style={{width:'100%', height:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail"/>
                    </a>
                </div>
                <div style={{width:'50%'}}>
                    <a href={`/video/${video._id}`} style={{color:'grey'}}>
                        <span style={{fontSize:"1rem", color:'black'}}>{video.title}</span><br/>
                        <span>{video.writer.name}</span><br/>
                        <span>{video.views} views</span><br/>
                        <span>{minutes} : {seconds}</span>
                    </a>
                </div>
            </div>
        )
    });

    return (
        <React.Fragment>
            <div style={{marginTop:'3rem'}}/>
            {renderSideVideo}
        </React.Fragment>
    )
}

export default SideVideo
