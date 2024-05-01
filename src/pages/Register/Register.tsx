import { useState } from "react";
import { useNavigate } from "react-router";
import { Toast } from "../../common/Toast/Toast";
import { CCard } from "../../common/CCard/CCard";
import { CButton } from "../../common/CButton/CButton";
import { InfoButton } from "../../common/InfoButton/InfoButton";
import { CInput } from "../../common/CInput/CInput";
import "./Register.css";
import { RegisterResponseData, registerService } from "../../services/apicalls";
import { useMutation } from "react-query";

interface NewUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface ErrorMsg {
    nameError: string;
    emailError: string;
    passwordError: string;
    confirmPasswordError: string;
    serverError: { message: string, success: boolean } | null;
}

export const Register: React.FC = (): JSX.Element => {
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState<NewUser>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errorMsg, setErrorMsg] = useState<ErrorMsg>({
        nameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
        serverError: null,
    });
    // const [errorCount, setErrorCount] = useState<number>(0);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    };

    // TODO validate inputs!!
    // const validateInput 

    // const registerUser = async (): Promise<void> => {
    //     try {
    //         const { confirmPassword, ...newUserWithoutConfirmPassword } = newUser;
    //         const response: RegisterResponseData = await registerService(newUserWithoutConfirmPassword);
    //         setErrorMsg({
    //             ...errorMsg,
    //             serverError: { message: response.message, success: response.success },
    //         });
    //         setErrorCount(errorCount + 1);
    //         // navigate("/login");
    //     } catch (error: RegisterResponseData | any) {
    //         setErrorMsg({
    //             ...errorMsg,
    //             serverError: { message: error.message, success: false },
    //         });
    //         setErrorCount(errorCount + 1);
    //     }
    // };
    const mutation = useMutation(registerService, {
        onSuccess: (response: RegisterResponseData) => {
            setErrorMsg({
                ...errorMsg,
                serverError: { message: response.message, success: response.success },
            });
            // setErrorCount(errorCount + 1);
            // navigate("/login");
        },
        onError: (error: any) => {
            setErrorMsg({
                ...errorMsg,
                serverError: { message: error.message, success: false },
            });
            // setErrorCount(errorCount + 1);
        }
    });
    
    const registerUser = (): void => {
        const { confirmPassword, ...newUserWithoutConfirmPassword } = newUser;
        mutation.mutate(newUserWithoutConfirmPassword);
    };
        

    return (
        <div className="register-design">
            {errorMsg.serverError && errorMsg.serverError.message !== "" && (
                <Toast
                    // key={errorCount}
                    message={errorMsg.serverError.message}
                    success={errorMsg.serverError.success}
                    time={4000}
                    resetServerError={() =>
                        setErrorMsg({
                            ...errorMsg,
                            serverError: null,
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
                                <label htmlFor="name">Name</label>
                                <CInput
                                    className={`register-name-field ${errorMsg.nameError ? "register-field-error" : ""}`}
                                    type="name"
                                    placeholder="John"
                                    name="name"
                                    value={newUser.name || ""}
                                    onChangeFunction={(e) => inputHandler(e)}
                                />
                                <div className="info-button-wrapper"><InfoButton info={"Handle must be between 3 and 20 characters. Can contain lower case letters and numbers. Can contain . _ and - but not consecutively. "} /></div>
                            </div>
                            <div className={errorMsg.nameError ? "register-field-error-msg" : "register-empty-error"}>{errorMsg.nameError}</div>

                        </div>
                        <div className="register-field">
                            <div className="register-input-area">
                                <label htmlFor="email">Email</label>
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
                                <label htmlFor="password">Password</label>
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
                                <label htmlFor="confirmPassword">Confirm Password</label>
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
