import { useState } from "react"
import axios from "axios"

export default function Register() {
    
    // const [inputs, setInputs] = useState({  
    //     name: '',
    //     email: '',
    //     password: '',
    //     cpassword: ''
    // })
     
    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        const name=e.target.name.value;
        const email=e.target.email.value;
        const password=e.target.password.value;
        const cpassword=e.target.cpassword.value;
        
        await axios.post("http://localhost:4000/join/join_submit", {
            "name": name,
            "email": email,
            "password": password,
            "cpassword": cpassword
        });
      }
    

    const onReset = () => {
        const resetInputs = {       
            name: '',
            email: '',
            password: '',
            cpassword: ''
        }
        setInputs(resetInputs)      
    }

    return (
<section className="register">
            <div className ="signup">
            <h2 className="signup_title">회원가입</h2>
            <div className="signup_main">
            <form className="signup_form" onSubmit={onSubmitHandler}>
            <div className="form_block">
            <label for="name" className="form_label">이름</label>
            <input         
                name="name"   
                placeholder="이름"   
                type="text"
            /><br />
            </div>
            <div className="form_block">
            <label for="email" className="form_label">이메일</label>
            <input
                name="email"  
                placeholder="Your "
                type="text"
            /><br />
            </div>
            <div className="form_block">
            <label for="password" className="form_label">비밀번호</label>
            <input
                name="password" 
                placeholder="비밀번호"
                type="text"
            /><br />
            </div>
            <div className="form_block">
            <label for="cpassword" className="form_label">비밀번호 확인</label>
            <input
                name="cpassword"  //위에서 nickname의 값을 가져와 타겟을 가져온다.
                placeholder="비밀번호 확인"
                type="text"
            /><br />
            </div>
            <input value="회원가입" type="submit"/>
            </form>
            </div>
            <button onClick={onReset}>초기화</button>
            </div>
        </section>
    )
}
