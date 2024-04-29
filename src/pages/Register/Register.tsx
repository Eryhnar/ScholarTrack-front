import { useState } from "react";
import { useNavigate } from "react-router";
import { Toast } from "../../common/Toast/Toast";
import { CCard } from "../../common/CCard/CCard";
import { CButton } from "../../common/CButton/CButton";
import { InfoButton } from "../../common/InfoButton/InfoButton";
import { CInput } from "../../common/CInput/CInput";
import "./Register.css";

interface NewUser {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface ErrorMsg {
    userNameError: string;
    emailError: string;
    passwordError: string;
    confirmPasswordError: string;
    serverError: { message: string, success: boolean };
}

export const Register: React.FC = (): JSX.Element => {
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState<NewUser>({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errorMsg, setErrorMsg] = useState<ErrorMsg>({
        userNameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
        serverError: { message: "", success: false },
    });
    const [errorCount, setErrorCount] = useState<number>(0);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    };

    // TODO validate inputs!!
    // const validateInput 

    //register user
    const registerUser = async (): Promise<void> => {
        console.log("registering user");
    };
        

    return (
        <div className="register-design">
            {errorMsg.serverError.message !== "" && (
                <Toast
                    key={errorCount}
                    message={errorMsg.serverError.message}
                    success={errorMsg.serverError.success}
                    time={4000}
                    resetServerError={() =>
                        setErrorMsg({
                            ...errorMsg,
                            serverError: { message: "", success: false },
                        })
                    }
                />
            )}
            <CCard
                title="Register"
                content={
                    <div className="register-inputs">
                        <div className="register-field">
                            <div className="register-input-area">
                                <p>Name</p>
                                <CInput
                                    className={`register-handle-field ${errorMsg.userNameError ? "register-field-error" : ""}`}
                                    type="name"
                                    placeholder="John"
                                    name="userName"
                                    value={newUser.userName || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                                <div className="info-button-wrapper"><InfoButton info={"Handle must be between 3 and 20 characters. Can contain lower case letters and numbers. Can contain . _ and - but not consecutively. "} /></div>
                            </div>
                            <div className={errorMsg.userNameError ? "register-field-error-msg" : "register-empty-error"}>{errorMsg.userNameError}</div>

                        </div>
                        <div className="register-field">
                            <div className="register-input-area">
                                <p>Email</p>
                                <CInput
                                    className={`register-email-field ${errorMsg.emailError ? "register-field-error" : ""}`}
                                    type="email"
                                    placeholder="user@domain.com"
                                    name="email"
                                    value={newUser.email || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                            </div>
                            <div className={errorMsg.emailError ? "register-field-error-msg" : "register-empty-error"}>{errorMsg.emailError}</div>
                        </div>
                        <div className="register-field">
                            <div className="register-input-area">
                                <p>Password</p>
                                <CInput
                                    className={`register-password-field ${errorMsg.passwordError ? "register-field-error" : ""}`}
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    value={newUser.password || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                                <div className="info-button-wrapper"><InfoButton info={"Password must be between 8 and 16 character. Must contain a lower case letter, a capital letter and a number. Can contain . _ - but not consecutively."} /></div>
                            </div>
                            <div className={errorMsg.passwordError ? "register-field-error-msg" : "register-empty-error"}>{errorMsg.passwordError}</div>
                        </div>
                        <div className="register-field">
                            <div className="register-input-area">
                                <p>Confirm Password</p>
                                <CInput
                                    className={`register-confirm-password-field ${errorMsg.confirmPasswordError ? "register-field-error" : ""}`}
                                    type="password"
                                    placeholder="password"
                                    name="confirmPassword"
                                    value={newUser.confirmPassword || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                            </div>
                        </div>
                        <div className={errorMsg.confirmPasswordError ? "register-field-error-msg" : "register-empty-error"}>{errorMsg.confirmPasswordError}</div>
                        <CButton
                            className="register-button"
                            title="Register"
                            onClickFunction={registerUser}
                        />
                        <div className="register-redirect-text">

                            Already registered? Click&nbsp; <a href="/login" className="register-redirect-link">here</a> &nbsp;to log in!
                        </div>
                    </div>
                }
            />
        </div>
    )
}