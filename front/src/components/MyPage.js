import React, { useEffect, useState } from 'react'

export default function MyPage() {

    const [hlist, setHlist] = useState();

    // 백에서 사용자 정보 받아오기 

    return (
        <div className='mp-space'>
            <div className='profileBox'>
                <i className="fa-solid fa-circle-user fa-4x" style={{color:"#f4623a"}} ></i>
                <div className='profileName'>
                <p>사용자 이름</p>
                <p style={{fontSize:"small"}}>사용자 이메일</p>
                </div>
            </div>
            <div className='v-line'></div>
            <div className='historyBox'>
                <h5>학습 이력</h5>
                <div className='historyList'>
                    hlist.map(a,i){
                        <HistoryCard></HistoryCard>
                    }
                </div>
            </div>
        </div >
    )
}

function HistoryCard(props){

}