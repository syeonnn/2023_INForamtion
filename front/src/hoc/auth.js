import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_actions';

import { useNavigate } from 'react-router-dom';

function withNavigation (Component) {
    return props => <Component {...props} navigate={useNavigate()} />;
}


/**
 * 
 * @param option 
 * null => 아무나 출입 가능 페이지
 * true => 로그인 유저만 출입가능 페이지
 * false => 로그인 유저는 출입 불가능 페이지 
 * @returns 컴포넌트
 */
export default function(SpecificComponent, option, adminRoute=null){
    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        const navigate = useNavigate();

        console.log("hoc Auth 실행");

        useEffect(() => {
            dispatch(auth())
            .then(response => {

                if (!response.payload.isAuth) {
                    console.log("상태: 로그인 X")
                    if (option) { // 페이지: 로그인 필요 O
                        navigate("/login");
                    }
                } else {
                    console.log("상태: 로그인 O")
                    if (adminRoute && !response.payload.isAdmin) { // 페이지: 관리자만 접근 가능, 관리자 아닌 사용자
                        navigate("/");
                    } else {
                        if (option === false) {
                            navigate("/");
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent/>
        )
    }

    return AuthenticationCheck
}