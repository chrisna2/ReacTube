import React, {useState, useEffect} from 'react';
import Axios from 'axios';
/**
 * 구독 버튼 제작
 */
function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        let variable = {userTo : props.userTo}

        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if(response.data.success){
                    setSubscribeNumber(response.data.subscribeNumber);
                }
                else{
                    alert("구독자 수를 받아오지 못했습니다.");
                }
            })

        let variable2 = {
                            userTo : props.userTo,
                            userFrom : localStorage.getItem("userId")//로컬 스토리지에 저장된 로그인 정보 가져오기
                        }
                    
        Axios.post('/api/subscribe/subscribed', variable2)
            .then(reponse => {
                if (reponse.data.success){
                    //console.log(reponse.data.subscribed)
                    setSubscribed(reponse.data.subscribed)
                }
                else {
                    alert("구독 여부를 확인 할 수가 없습니다.")
                }
            })

    }, [])

    const onSubscribe = () => {

        let subscribedValue = {
            userTo : props.userTo,
            userFrom : localStorage.getItem("userId")//로컬 스토리지에 저장된 로그인 정보 가져오기
        }

        //이미 구독중이면
        if(Subscribed){
            Axios.post('/api/subscribe/unSubscribe',subscribedValue)
                .then(response => {
                    if(response.data.success){
                        setSubscribeNumber(SubscribeNumber-1);
                        setSubscribed(false);
                    }
                    else{
                        alert("구독 취소를 실패 했습니다.")
                    }
                })
        }
        //구독하지 않았다면
        else{
            Axios.post('/api/subscribe/onSubscribe',subscribedValue)
                .then(response => {
                    if(response.data.success){
                        setSubscribeNumber(SubscribeNumber+1);
                        setSubscribed(true);
                    }
                    else{
                        alert("구독을 실패 했습니다.")
                    }
                })
        }
    }

    return (
        <div>
            <button style={{backgroundColor:`${Subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius:'4px', color:'white', padding:'10px 16px',
                            fontWeight:'500', fontSize:'1rem', textTransform:'uppercase'}}
                    onClick={onSubscribe}>
             {Subscribed ? SubscribeNumber+'명 구독중' : '구독자 '+SubscribeNumber+"명"}
            </button>
        </div>
    )
}

export default Subscribe
