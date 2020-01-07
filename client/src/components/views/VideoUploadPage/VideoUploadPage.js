 import React, {useState} from 'react'
 import { Typography, Button, Form, message, Input, Icon} from 'antd'
 import Dropzone from 'react-dropzone'

 const { Title } = Typography;
 const { TextArea } = Input;

 const PrivateOptions = [
     {value : 0 , label:"private"},
     {value : 1 , label:"public"}
 ]
 const CategoryOptions = [
     {value : 0 , label:"Film & Animation"},
     {value : 1 , label:"Autos & Vehicle"},
     {value : 2 , label:"Music"},
     {value : 3 , label:"News"},
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
     return (
         <div style={{ maxWidth:'700px', margin:'2rem auto'}}>
             <div style={{ textAlign:'center', marginBottom:'2rem' }}>
                 <Title level={2}>Upload Video</Title>
             </div>
             <Form onSubmit>
                 <div style={{ display:'flex', justifyContent:'space-between' }}>
                    {/* Drop zone */}
                        <Dropzone
                            onDrop
                            multiple
                            maxSize>
                            {
                                ({getRootProps, getInputProps}) => (
                                    <div style={{ width:'300px', height:'240px', border:'1px solid lightgray',
                                                  alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <Icon type='plus' style={{ fontSize : '3rem'}} />
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
                
                <label>Title</label>
                <Input
                    onChange={onVideoTitleChange}
                    value={VideoTitle}
                />
                <br/>
                <br/>

                <label>Description</label>
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
                    Submit
                </Button>

             </Form>
         </div>
     )
 }
 
 export default VideoUploadPage
 