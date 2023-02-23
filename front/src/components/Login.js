import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {

    const [hidePassword, setHidePassword] = useState(true);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        
        await axios.post("http://localhost:4000/api/users/login", {
            "email": email,
            "password": password
        }).then((res) => {
            console.log(res.data);

            if (res.data.success) {
                alert("로그인에 성공했습니다.");
                return navigate("/");
            } else {
                alert(res.data.msg);
                return navigate("/login");
            }
        }).catch((err) => {
            console.error(err);
            alert(err);
        })
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