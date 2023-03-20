import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux 추가
import { connect } from "react-redux";
import { registerUser } from "../_actions/user_actions";


function Register(props) {
    const navigate = useNavigate();
    const [hidePassword, setHidePassword] = useState(true);

    const isValid = (e) => {
        if (!e.target.name.value) {
            alert("이름을 입력해주세요.");
            return false;
        }
        if (!e.target.email.value) {
            alert("이메일을 입력해주세요.");
            return false;
        }
        if (!e.target.password.value) {
            alert("비밀번호를 입력해주세요.");
            return false;
        }
        if (!e.target.cpassword.value) {
            alert("확인용 비밀번호를 입력해주세요.");
            return false;
        }

        return true;
    }

    
    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (isValid(e)) {
            const dataToSubmit = {
                name : e.target.name.value,
                email : e.target.email.value,
                password : e.target.password.value,
                cpassword : e.target.cpassword.value
            }
    
            props.dispatch(registerUser(dataToSubmit))
                .then(response => {
                    if (response.payload.registerSuccess) {
                        alert("회원가입에 성공했습니다.");
                        navigate("/login");
                    } else {
                        alert(response.payload.msg)
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }

        e.target.reset();
    }

    // await axios.post("http://localhost:4000/api/register", {
    //     "name": name,
    //     "email": email,
    //     "password": password,
    //     "cpassword": cpassword
    // }).then((res) => {
    //     console.log(res.data);
    //     // 회원가입 성공
    //     if (res.data.success) {
    //         alert("회원가입이 완료되었습니다.");
    //         return navigate("/login");
    //     } else {
    //         alert(res.data.msg);
    //         return navigate("/register")
    //     }
    // }).catch((err) => {
    //     console.error(err);
    //     alert(err);
    // });

    // const onCahngeHandler = (e) => {
    //     const { value, name } = e.target;
    //     setInputs({
    //         ...inputs,
    //         [name]: value,
    //     });
    // };


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


function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Register);