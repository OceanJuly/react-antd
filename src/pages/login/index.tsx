import React, { ChangeEventHandler } from 'react'
import { FocusEvent } from "react"
import './style/index.less'
import { useNavigate } from "react-router-dom"

function Login() {
    const loginInfo = React.useRef({
        user: '',
        password: ''
    })
    const navigate = useNavigate()
    function handleFocus(e: FocusEvent) {
        const tar: EventTarget & Element = e.target
        if (!tar) return
        tar.classList.add('focus-style')
    }
    function handleBlur(e: FocusEvent, type: number) {
        const tar: EventTarget & Element = e.target
        const { user, password } = loginInfo.current
        const flag = !!(type === 1 ? user : password)
        if (!tar || flag) return
        tar.classList.remove('focus-style')
    }
    function login() {
        navigate('/dashboard')
    }
    function handleChange(e: any, type: number) {
        const val = e.target.value
        if (type === 1) loginInfo.current.user = val
        else loginInfo.current.password = val
    }

    return (
        <div className="login-wrap">
            <div className="login">
                <div className="form-item">
                    <input
                        type="email"
                        onFocus={handleFocus}
                        onBlur={(e) => handleBlur(e, 1)}
                        onChange={(e) => handleChange(e, 1)}
                    />
                    <span data-placeholder="user name"></span>
                </div>
                <div className="form-item">
                    <input type="password"
                        onFocus={handleFocus}
                        onBlur={(e) => handleBlur(e, 2)}
                        onChange={(e) => handleChange(e, 2)}
                    />
                    <span data-placeholder="password"></span>
                </div>
                <div className="login-button-wrap">
                    <button className="login-button" onClick={login}>登录</button>
                </div>
            </div>
        </div>
    )
}

export default Login