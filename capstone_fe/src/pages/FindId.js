import axios from "axios";
import React from "react";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import Header from "../component/Header";

export default function FindId(){
    
    const [userName, setUserName] = useState('')    // 사용자이름 state
    const [userPhone, setUserPhone] = useState('')  // 폰번호 state

    const InputName = e => {    // 이름 입력시
        setUserName(e.target.value)
    }
    const InputPhone = e => {   // 폰번호 입력시
        setUserPhone(e.target.value)
    }

    const Findid = e => {   // 아이디 찾기 누를시
        e.preventDefault()
        console.log(1)
        const UserInfo = {}
        UserInfo['userName'] = userName // 입력받은 이름을 userinfo의 userName에 넣기
        UserInfo['userPhone'] = userPhone // 입력받은 폰번호를 userinfo의 userPhone에 넣기
        axios({
            method : '',    // 통신 방식
            url : '',   // api url
            data : UserInfo
        })
        .then(res => {  // 가져온 데이터 셋업
            window.localStorage.setItem('token', res.data.token)
            window.localStorage.setItem('token', res.data.token)
            window.localStorage.setItem('token', res.data.token)
            window.localStorage.setItem('token', res.data.token)
            console.log(0)
            alert(`고객님의 아이디는 ${res.data.userId}입니다.` )
        })
        .catch(err => {
            console.log(err)
            alert('찾기 실패')
        })
    }
    return(
        <div className="findid-all">
            <Header/>
            <div className="findid-content">
                <div className="findid"><span>아이디 찾기</span></div>
                <div className="findid-text"><span>아이디를 잊으셨나요? 회원가입 시 등록한 정보를 입력해 주세요.</span></div>
                <div className="findid-namebox">
                    <div className="findid-namebox-name">
                        <span>이름</span>
                    </div>
                    <div className="findid-namebox-input">
                        <input type="text" placeholder="이름을 입력해주세요."></input>
                    </div>
                </div>
                <div className="findid-phonebox">
                    <div className="findid-phonebox-phone">
                        <span>휴대폰 번호</span>
                    </div>
                    <div className="findid-phonebox-input">
                        <input type="tel" placeholder="가입 시, 등록한 휴대폰 번호를 입력해주세요."></input>
                    </div>
                </div>
                <div className="findid-check">
                    <input type="submit" className="findid-check" onClick={Findid} value={'아이디 찾기'}/>
                </div>
            </div>
        </div>
    )
}