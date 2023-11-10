import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'


import Header from "../component/Header";

export default function Login() {
    
    const [userId, setUserId] = useState('')    // id state
    const [userPw, setUserPw] = useState('')    // pw state
    const navigate = useNavigate();

    const InputId = e => {  // 아이디 입력시
        setUserId(e.target.value)
    }
    const InputPw = e => {  // 비밀번호 입력시
        setUserPw(e.target.value)
    }

    const Signin = e => {   // 로그인 
        e.preventDefault()
        console.log(1)
        const UserInfo = {}
        UserInfo['userId'] = userId // 입력받은 아이디를 userinfo의 userid에 넣기
        UserInfo['password'] = userPw   // 입력받은 아이디를 userinfo의 password에 넣기
        axios({
            method : 'post',    // post방식으로 통신
            url : '//localhost:8080/user/login',    
            data : UserInfo 
        })
        .then(res => {  // 가져온 데이터들 셋업
            window.localStorage.setItem('token', res.data.token)
            window.localStorage.setItem('id', res.data.id)
            window.localStorage.setItem('userid', res.data.userId)
            window.localStorage.setItem('name', res.data.name)
            navigate('/')
        })
        .catch(err => {
            console.log(err)
            alert('로그인 실패')
        })
    }

    const SignUp = e => {   // 회원가입 페이지로 이동
        navigate('/findid') 
    }

    return (
        <>
        <div className="Loginpage">
            <Header/>
            <div className="Loginpage-loginbox">
                <h1 className="Loginpage-loginbox__title">login</h1>
            </div>
            <div className="Loginpage-loginform">
                
                <div className="Loginpage-loginform__body">
                    <div className="Loginpage-loginform__body--box">
                        <h3 className="loginpage-loginform__idlabel">아이디</h3>
                        <div className="logininfobox">
                            <input type="text" className="loginuserinfo Loginpage-loginfrom__inputid" onChange={InputId}/>
                        </div>
                    </div>
                    <div className="Loginpage-loginform__body--box">
                        <h3 className="loginpage-loginform__pwlabel">비밀번호</h3>
                        <div className="logininfobox">
                            <input type="password" className="loginuserinfo Loginpage-loginfrom__inputpw" onChange={InputPw}/>
                        </div>
                    </div>
                </div>
                <input type="submit" className="signinbtn" onClick={Signin} value={'로그인'}/>
                <input type="button" className="signupbtn" onClick={SignUp} value={'회원가입'}/>
            </div>
        </div>
        </>
    )
}