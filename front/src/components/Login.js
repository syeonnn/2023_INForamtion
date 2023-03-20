import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux 추가
import { loginUser } from "../_actions/user_actions";
import { connect } from "react-redux";

function Login(props) {

    const [hidePassword, setHidePassword] = useState(true);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const dataToSubmit = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        
        props.dispatch(loginUser(dataToSubmit))
            .then(response => {
                if (response.payload.loginSuccess) {
                    alert("로그인에 성공했습니다.");
                    navigate("/");
                } else {
                    alert("Failed to Log in, you can check your Email or Password");
                }
        })
    }


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