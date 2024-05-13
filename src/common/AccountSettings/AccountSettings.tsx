import "./AccountSettings.css";
import { useState } from "react";
import { CButton } from "../CButton/CButton"
import { CInput } from "../CInput/CInput"
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserResponseData, updateUserService } from "../../services/apicalls.js";
import { useMutation } from "react-query";
import { selectUser, updateUser } from "../../app/slices/userSlice.js";

interface AccountSettingsProps {
    errorMsg: {
        nameError: string;
        emailError: string;
        serverError: { message: string, success: boolean } | null;
    };
    setErrorMsg: React.Dispatch<React.SetStateAction<{
        nameError: string;
        emailError: string;
        serverError: { message: string; success: boolean; } | null;
    }> >;
}

interface NewUser {
    name: string;
    email: string;
}

export const AccountSettings: React.FC<AccountSettingsProps> = ({ errorMsg, setErrorMsg }) => {
    const token = useSelector(selectUser).credentials.token;
    const user = useSelector(selectUser).credentials.user;
    const dispatch = useDispatch();
    const [newUser, setNewUser] = useState<NewUser>({
        name: user.name,
        email: "",
    });

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        });
    };

    const mutation = useMutation(updateUserService, {
        onSuccess: (response: UpdateUserResponseData) => {
            dispatch(updateUser(response.data));
            
            setErrorMsg({
                ...errorMsg,
                serverError: { message: response.message, success: response.success }
            });
        },
        onError: (error: any) => {
            setErrorMsg({
                ...errorMsg,
                serverError: { message: error.message, success: false }
            });
        }
    
    })

    const saveAccountSettings = (): void => {
        mutation.mutate({token, newUser});
    }

    return (
        <div className="account-settings-design">
            {/* <h1>Account Settings</h1> */}
            <div className="account-settings-container">
            <h1>Account Settings</h1>
                <div className="account-settings-item">
                    {/* <label htmlFor="account-name">Name</label> */}
                    <CInput
                        // className={"account-name-field"}
                        id="account-name"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={newUser.name || ""}
                        onChangeFunction={inputHandler}
                    />
                </div>
                {/* <div className="account-settings-item">
                    <label htmlFor="account-email">Email</label>
                    <CInput
                        className={"account-email-field"}
                        id="account-email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={newUser.email || ""}
                        onChangeFunction={inputHandler}
                    />
                </div> */}
            <CButton title="Save" onClickFunction={saveAccountSettings} />
            </div>
        </div>
    )
}