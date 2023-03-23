import axios from 'axios';
import React, { useEffect, useState } from 'react';
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

    // const LevelList = level => {
    //     <ul className='custom-list'>
    //     <li>{level}</li>;
    //     </ul>
    // }

    // {UserInfo.level.map(LevelList)}

    if (user.userData && user.userData?.isAuth) {
        return (
            <div className='mp-space'>
                <div className='profileBox'>
                    <i className="fa-solid fa-circle-user fa-4x" style={{color:"#f4623a"}} ></i>
                    <div className='profileName'>
                    <p className='fw-bolder'>{UserInfo.name}</p>
                    <p style={{fontSize:"small"}}>{UserInfo.email}</p>
                    </div>
                </div>
                <div className='v-line'></div>
                <div className='historyBox'>
                    <h5>학습 이력</h5>
                    <div className='historyList'>
                        {UserInfo.level !== undefined ? (
                            <p>{UserInfo.level}</p>
                        ) : (
                            <p>아직 학습하지 않았네요!</p>
                        )}
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



