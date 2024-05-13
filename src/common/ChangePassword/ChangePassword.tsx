import "./ChangePassword.css"
import { useState } from "react"
import { CButton } from "../CButton/CButton"
import { CInput } from "../CInput/CInput"
import { useMutation } from "react-query";
import { ChangePasswordResponse, changePasswordService } from "../../services/apicalls";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/slices/userSlice";

interface NewCredentials {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

interface errorMsg {
    currentPasswordError: string;
    newPasswordError: string;
    confirmNewPasswordError: string;
    serverError: { message: string, success: boolean };
}

export const ChangePassword: React.FC = (): JSX.Element => {
    const token = useSelector(selectUser).credentials.token;
    const [newCredentials, setNewCredentials] = useState<NewCredentials>({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })
    const [errorMsg, setErrorMsg] = useState<errorMsg>({
        currentPasswordError: "",
        newPasswordError: "",
        confirmNewPasswordError: "",
        serverError: { message: "", success: false }
    })

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCredentials({
            ...newCredentials,
            [e.target.name]: e.target.value
        })
    }

    const mutation = useMutation(changePasswordService, {
        onSuccess: (response: ChangePasswordResponse) => {
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

    const saveNewPassword = () => {
        mutation.mutate({token, newCredentials});
    }

    return (
        <div className="change-password-settings">
            <div className="change-password-settings-container">
            <h1>Change Password</h1>
                <div className="change-password-settings-item">
                    <CInput
                        id="settings-current-password"
                        type="text"
                        placeholder="Current Password"
                        name="currentPassword"
                        value={newCredentials.currentPassword || ""}
                        onChangeFunction={inputHandler}
                    />
                </div>
                <div className="change-password-settings-item">
                    <CInput
                        id="settings-new-password"
                        type="text"
                        placeholder="New Password"
                        name="newPassword"
                        value={newCredentials.newPassword || ""}
                        onChangeFunction={inputHandler}
                    />
                </div>
                <div className="change-password-settings-item">
                    <CInput
                        id="settings-confirm-new-password"
                        type="text"
                        placeholder="Confirm New Password"
                        name="confirmNewPassword"
                        value={newCredentials.confirmNewPassword || ""}
                        onChangeFunction={inputHandler}
                    />
                </div>
            <CButton title="Save" onClickFunction={saveNewPassword} />
            </div>
        </div>
    )
}