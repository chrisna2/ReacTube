 import React, {useState} from 'react'
 import { Typography, Button, Form, message, Input, Icon} from 'antd'
 import Dropzone from 'react-dropzone'
import Axios from 'axios';

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

 function VideoUploadPage() {
    //ctrl + space + "useState"
     const [VideoTitle, setVideoTitle] = useState("")
     const [VideoDescription, setVideoDescription] = useState("")

     const [Private, setPrivate] = useState(0)
     const [Category, setCategory] = useState("Film & Animation")

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
                    console.log(response.data)
                }
                else{
                    alert('비디오 업로드에 실패 했습니다.')
                }
            })
    }
     return (
         <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
             <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                 <Title level={2}>비디오 업로드</Title>
             </div>
             <Form onSubmit>
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
                    {/* Thumbnail */}
                    <div>
                        <img src alt />
                    </div>
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

                <Button type="primary" size="large" onClick>
                    업로드
                </Button>

             </Form>
         </div>
     )
 }
 
 export default VideoUploadPage
 