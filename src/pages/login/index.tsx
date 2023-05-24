import { FocusEvent } from "react"
import './style/index.less'
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()
    function handleFocus(e: FocusEvent) {
        const tar: EventTarget & Element = e.target
        if (!tar) return
        tar.classList.add('focus-style')
    }
    function handleBlur(e: FocusEvent) {
        const tar: EventTarget & Element = e.target
        if (!tar) return
        tar.classList.remove('focus-style')
    }
    function login() {
        navigate('/dashboard')
    }
    return (
        <div className="login-wrap">
            <div className="login">
                <div className="form-item">
                    <input type="email" onFocus={handleFocus} onBlur={handleBlur} />
                    <span data-placeholder="user name"></span>
                </div>
                <div className="form-item">
                    <input type="password" onFocus={handleFocus} onBlur={handleBlur} />
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