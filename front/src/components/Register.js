import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Register() {

    const navigate = useNavigate();
    const [hidePassword, setHidePassword] = useState(true);
    
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
            const name = e.target.name.value;
            const email = e.target.email.value;
            const password = e.target.password.value;
            const cpassword = e.target.cpassword.value;

            await axios.post("http://localhost:4000/api/register", {
                "name": name,
                "email": email,
                "password": password,
                "cpassword": cpassword
            });

            alert("회원가입이 완료되었습니다.");
            navigate("/login");
        
    }



    return (
        <section className="register">
            <div className="signup">
                <h2 className="signup_title">회원가입</h2>
                <div className="signup_main">
                    <form className="signup_form" onSubmit={onSubmitHandler}>
                        <div className="form_block">
                            <label for="name" className="form_label">이름</label><br />
                            <input
                                name="name"
                                placeholder="이름"
                                type="text"
                                className="form_input"
                            /><br />
                        </div>
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
                        <div className="form_block">
                            <label for="cpassword" className="form_label">비밀번호 확인</label><br />
                            <input
                                name="cpassword"  //위에서 nickname의 값을 가져와 타겟을 가져온다.
                                placeholder="비밀번호 확인"
                                type={hidePassword ? "password":"text"}
                                className="form_input"
                            /><br />
                        </div>
                        <input value="회원가입" type="submit" className="signup_btn form_button " />
                    </form>
                </div>

            </div>
        </section>
    )
}
