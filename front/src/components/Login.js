import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux 추가
import { loginUser } from "../_actions/user_actions";
import { connect } from "react-redux";

function Login(props) {

    const [hidePassword, setHidePassword] = useState(true);
    const navigate = useNavigate();

    const isValid = (e) => {
        if (!e.target.email.value) {
            alert("이메일을 입력해주세요.");
            return false;
        }
        if (!e.target.password.value) {
            alert("비밀번호를 입력해주세요.");
            return false;
        }

        return true;
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (isValid(e)) {
            const dataToSubmit = {
                email: e.target.email.value,
                password: e.target.password.value
            };
    
            
            props.dispatch(loginUser(dataToSubmit))
                .then(response => {
                    if (response.payload.loginSuccess) {
                        alert("로그인에 성공했습니다.");
                        navigate("/");
                    } else {
                        alert("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요. ");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        e.target.reset();
    };


    return (
        <section className="login">
            <div className="signin">
                <h2 className="signin_title">로그인</h2>
                <div className="signin_main">
                    <form className="signin_form" onSubmit={onSubmitHandler}>
                        <div className="form_block">
                            <label htmlFor="email" className="form_label">이메일</label><br />
                            <input
                                name="email"
                                placeholder="example@gmail.com"
                                id="email"
                                type="email"
                                className="form_input"
                                //autocomplete ="off"
                            /><br />
                        </div>

                        <div className="form_block">
                            <label htmlFor="password" className="form_label">비밀번호</label><br />
                            <input
                                name="password"
                                placeholder="비밀번호"
                                id="password"
                                type={hidePassword ? "password":"text"}
                                className="form_input"
                            /><br />
                        </div>
                        <input value="로그인" type="submit" className="signin_btn form_button " />
                    </form>
                </div>
            </div>
        </section>


    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Login);