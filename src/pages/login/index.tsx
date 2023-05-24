import { FocusEvent } from "react"
import './style/index.less'

function Login() {
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
                    <button className="login-button">登录</button>
                </div>
            </div>
        </div>
    )
}

export default Login