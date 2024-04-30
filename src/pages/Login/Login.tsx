import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { Toast } from "../../common/Toast/Toast"
import { CCard } from "../../common/CCard/CCard"
import { CInput } from "../../common/CInput/CInput"
import { CButton } from "../../common/CButton/CButton"
import { login } from "../../app/slices/userSlice"
import { LoginResponseData, loginService } from "../../services/apicalls"
import { useMutation } from "react-query"
import "./Login.css"

interface ErrorMsg {
    emailError: string,
    passwordError: string,
    serverError: { message: string, success: boolean } | null
}

export const Login: React.FC = (): JSX.Element => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const [errorMsg, setErrorMsg] = useState<ErrorMsg>({
        emailError: "",
        passwordError: "",
        serverError: null
    })

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const mutation = useMutation(loginService, {
        onSuccess: (response: LoginResponseData) => {
          dispatch(login(response.data));
          navigate("/");
        },
        onError: (error: any) => {
          setErrorMsg({
            ...errorMsg,
            serverError: { message: error.message, success: false }
          });
        }
      });
      
      const loginUser = (): void => {
        mutation.mutate(credentials);
      };


    return (
        <div className="login-design">
            {errorMsg.serverError && errorMsg.serverError.message !== "" && (
                <Toast
                    message={errorMsg.serverError.message}
                    success={errorMsg.serverError.success}
                    time={4000}
                    resetServerError={() => setErrorMsg(prevState => ({
                        ...prevState, 
                        serverError: null
                    }))}
                />
            )}
            <CCard
                className={"login-card"}
                title="Login"
                content={
                    <div className="login-inputs">
                        <div className="login-field">
                            <div className="login-input-area">
                                <p>Email</p>
                                <CInput
                                    className={"login-email-field"}
                                    type="email"
                                    placeholder="user@domain.com"
                                    name="email"
                                    value={credentials.email || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className={errorMsg.emailError ? "login-field-error-msg" : "login-empty-error"}>{errorMsg.emailError}</div>
                        </div>
                        <div className="login-field">
                            <div className="login-input-area">
                                <p>Password</p>
                                <CInput
                                    className={"login-password-field"}
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    value={credentials.password || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className={errorMsg.passwordError ? "login-field-error-msg" : "login-empty-error"}>{errorMsg.passwordError}</div>
                        </div>
                        <CButton
                            className={"login-button"}
                            title={"Login"}
                            onClickFunction={loginUser}
                        />
                        <div className="login-redirect-text">
                            Not registered? Click&nbsp; <a href="/login" className="register-redirect-link">here</a> &nbsp;register!
                        </div>
                    </div>
                }
            />   
        </div>
    )
}