 import React, {useState} from 'react'
 import { Typography, Button, Form, message, Input, Icon} from 'antd'
 import Dropzone from 'react-dropzone'
 import Axios from 'axios';
 import {useSelector} from 'react-redux';


 const { Title } = Typography;
 const { TextArea } = Input;

 const PrivateOptions = [
     {value : 0 , label:"비공개"},
     {value : 1 , label:"공개"}
 ]
 const CategoryOptions = [
     {value : 0 , label:"일상"},
     {value : 1 , label:"자동차"},
     {value : 2 , label:"음악"},
     {value : 3 , label:"뉴스"},
     {value : 4 , label:"요리"},
     {value : 5 , label:"코메디"},
 ]

 function VideoUploadPage(props) {

    //유저 정보 설정 
    const user = useSelector(state => state.user);

    //ctrl + space + "useState"
     const [VideoTitle, setVideoTitle] = useState("")
     const [VideoDescription, setVideoDescription] = useState("")

     const [Private, setPrivate] = useState(0)
     const [Category, setCategory] = useState("Film & Animation")

     const [FilePath, setFilePath] = useState("")
     const [Duration, setDuration] = useState("")
     const [ThumbnailPath, setThumbnailPath] = useState("")

     const onVideoTitleChange = (e) => {
        // e 는 이벤트를 지칭 한다.
        //console.log(e.currentTarget.value)
        setVideoTitle(e.currentTarget.value)
     }

     const onVideoDescriptionChange = (e) => {
        setVideoDescription(e.currentTarget.value)
     }

     const onPrivateChage = (e) => {
         console.log(e.currentTarget.value)
        setPrivate(e.currentTarget.value)
     }

     const onCategoryChage = (e) => {
         console.log(e.currentTarget.value)
        setCategory(e.currentTarget.value)
     }

     const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header : {'content-type' : 'multipart/form-data'}
        }
        formData.append("file", files[0])
        //console.log(files)
        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if(response.data.success){
                    //성공
                    console.log(response.data)

                    let variable = {
                        url : response.data.url,
                        fileName : response.data.fileName
                    }

                    setFilePath(response.data.url)

                    //썸네일 생성
                    Axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if(response.data.success){
                                console.log(response.data);
                                setDuration(response.data.fileDuration)
                                setThumbnailPath(response.data.url)
                            }
                            else{
                                alert("썸네일 생성에 실패 했습니다.");
                            }
                        })
                }
                else{
                    alert('비디오 업로드에 실패 했습니다.')
                }
            })
    }
    //일반화된 함수 형태 참고!
    const onSubmit = (e) =>{
        //뭔가를 방지 한다고 한다. 필수
        e.preventDefault();

        const variable = {
            writer : user.userData._id,
            title : VideoTitle,
            description : VideoDescription,
            privacy : Private,
            filePath : FilePath,
            category : Category,
            duration : Duration,
            thumbnail : ThumbnailPath
        }

        Axios.post('/api/video/uploadVideo', variable)
            .then(res => {
                if(res.data.success){
                    console.log(res.data);
                    message.success('성공적으로 업로드 했습니다');
                    //3초 후에 라우트 이동
                    setTimeout(() => {
                        props.history.push('/')
                    }, 3000)
                    
                }
                else{
                    alert("비디오 업로드에 실패 했습니다.")
                }
            })

    }
    // on submit 구성

    //화면 구성
     return (
         <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
             <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                 <Title level={2}>비디오 업로드</Title>
             </div>
             <Form onSubmit={onSubmit}>
                 <div style={{ display:'flex', justifyContent:'space-between' }}>
                    {/* Drop zone */}
                        <Dropzone
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={1000000000}>
                            {
                                ({getRootProps, getInputProps}) => (
                                    <div style={{ width:'300px', height:'240px', border:'1px solid lightgray', alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <label style={{ fontSize : '1rem'}}>
                                            동영상 파일을 올려 주세요!
                                        </label>
                                    </div>
                                )
                            }
                        </Dropzone>
                    {/* Thumbnail.. 랜더링 사이트에서 만약 스크립트 코드가 들어 갈경우 이렇게 중괄호{}로 묶으면 된다.*/}
                    {/* 다음과 같은 조건이다 : ThumbnailPath의 값이 있는경우 아래의 화면을 랜더링 하라는 뜻이다.*/
                    ThumbnailPath &&
                    <div>
                        <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                    </div>
                    }
                 </div>
                <br/>
                <br/>
                
                <label>제목</label>
                <Input
                    onChange={onVideoTitleChange}
                    value={VideoTitle}
                />
                <br/>
                <br/>

                <label>설명</label>
                <TextArea
                     onChange={onVideoDescriptionChange} 
                     value={VideoDescription}
                />
                <br/>
                <br/>

                <select onChange={onPrivateChage}>
                    {
                        PrivateOptions.map((item, index) => (
                            <option key={index} value={item.value}>{item.label}</option>
                        ))
                    }
                </select>                
                <br/>
                <br/>

                <select onChange={onCategoryChage}>
                    {
                        CategoryOptions.map((item, index) => (
                            <option key={index} value={item.value}>{item.label}</option>
                        ))
                    }
                </select>
                <br/>
                <br/>

                <Button type="primary" size="large" onClick={onSubmit}>
                    업로드
                </Button>

             </Form>
         </div>
     )
 }
 
 export default VideoUploadPage
 