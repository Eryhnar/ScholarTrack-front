import { useState } from "react";
import { useNavigate } from "react-router";
import { Toast } from "../../common/Toast/Toast";

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
    serverError: {message: string, success: boolean};
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
        serverError: {message: "", success: false},
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
            <div>
                hi
            </div>
        </div>
    )
}
