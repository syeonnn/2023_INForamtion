import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

function MyPage() {

    const user = useSelector(state => state.user);    
    const [ UserInfo, setUserInfo ] = useState([]);

    useEffect(() => {
        if (user.userData?.isAuth) {
            console.log("로그인 한 상태")
            axios.post("/api/users/getUser", {
                email: user.userData.email
            })
            .then((res) => {
                if (res.data.success) {
                    console.log("back 에서 가져온 사용자 정보: ", res.data.user);
                    setUserInfo(res.data.user);
                } else {
                    alert('Failed to get User Info');
                }
            })
            .catch((err) => {
                console.error(err);
            });
        } else {
            console.log("로그인 하지 않음");
        }
    }, [user]);

    const itemList = item => <li>{item}</li>
    // <Link to={'/learning/'+item}></Link>


    if (user.userData && user.userData?.isAuth) {
        return (
            <div className='mp-space'>
                <h1 style={{margin: "20px 0 30px 0"}}>마이 페이지</h1>
                <div className='mp-columns'>
                <div className='profile-column'>
                    <i className="fa-solid fa-circle-user fa-4x" style={{color:"#f4623a"}} ></i>
                    <div className='profileName'>
                    <p className='fw-bolder'>{UserInfo.name}</p>
                    <p style={{fontSize:"small"}}>{UserInfo.email}</p>
                    </div>
                </div>
                <div className='v-line'></div>
                
                <div className='history-column'>
                    <h5 style={{fontWeight:"bold"}}>학습 이력</h5>
                    <p>{UserInfo.name} 님이 학습하신 단어들입니다.</p>
                    
                    <div className='historyList'>
                        { 
                            ( UserInfo.studyList !== undefined && UserInfo.studyList.length > 0 ) ?
                            ( 
                                UserInfo.studyList.map(itemList) 
                            ):
                            (   
                                <p>아직 학습하지 않았네요!</p>
                            )

                        //     (UserInfo.studyList !== undefined) ? (
                        //     (UserInfo.studyList).length !== 0 ? (
                        //     UserInfo.studyList.map(itemList)
                        // ):(
                        //     <p>아직 학습하지 않았네요!</p>
                        // )):(console.log("No studyList"))
                        }
                        
                    </div>
                </div>
                </div>
            </div >
        )
    } else {
        <div>Is Loading...</div>
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps)(MyPage);



