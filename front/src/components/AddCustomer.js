
import React from 'react';
import { post } from 'axios';

class AddCustomer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }


    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();

        formData.append('name', this.state.userName);
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);
        formData.append('cpassword', this.state.cpassword);
        const config = {
            headers: {
                'content-type': 'mutipart/form-data'
            }
        } // config
        return post(url, formData, config);
    } // addCustomer


    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    render() {
        return (

            <>
                <h1>회원가입</h1>
                <form onSubmit={this.handleFormSubmit}
                    method="post" action="./join_submit">
                    이름 <input type="text" name="name" value={this.state.name} onChange={this.handleValueChange} /><br />
                    Email <input type="text" name="email" value={this.state.email} onChange={this.handleValueChange} /><br />
                    비밀번호 <input type="text" name="password" value={this.state.pw} onChange={this.handleValueChange} /><br />
                    비밀번호 확인 <input type="text" name="cpassword" value={this.state.cpw} onChange={this.handleValueChange} /><br />
                    <input type="submit" value="회원가입" />
                </form>
                <p class="margin">이미 계정을 갖고 계신가요?
                    <a href="./login">로그인하기</a></p>

            </>
        )
    }
}