import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {

    const [hidePassword, setHidePassword] = useState(true);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
    }


    return (
        <section className="login">
            <div className="signin">
                <h2 className="signin_title">로그인</h2>
                <div className="signin_main">
                    <form className="signin_form" onSubmit={onSubmitHandler}>
                        
                        <div className="form_block">
                            <label for="email" className="form_label">이메일</label><br />
                            <input
                                name="email"
                                placeholder="example@gmail.com"
                                type="text"
                                className="form_input"
                            /><br />
                        </div>

                        <div className="form_block">
                            <label for="password" className="form_label">비밀번호</label><br />
                            <input
                                name="password"
                                placeholder="비밀번호"
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