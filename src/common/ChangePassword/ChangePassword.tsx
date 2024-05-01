import { useState } from "react"
import { CButton } from "../CButton/CButton"
import { CInput } from "../CInput/CInput"

interface NewCredentials {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export const ChangePassword: React.FC= (): JSX.Element => {
    const [newCredentials, setNewCredentials] = useState<NewCredentials>({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCredentials({
            ...newCredentials,
            [e.target.name]: e.target.value
        })
    }

    const saveNewPassword = () => {
        console.log("Save new password")
    }

    return (
        <div className="change-password-settings">
                            <h1>Change Password</h1>
                            <div className="change-password-settings-container">
                                <div className="change-password-settings-item">
                                    <label htmlFor="current-password">Current Password</label>
                                    <CInput 
                                        // className={"account-name-field"}
                                        id="settings-current-password"
                                        type="text"
                                        placeholder="Current Password"
                                        name="currentPassword"
                                        value={newCredentials.currentPassword || ""}
                                        onChangeFunction={inputHandler}
                                    />
                                </div>
                                <div className="change-password-settings-item">
                                    <label htmlFor="new-password">New Password</label>
                                    <CInput 
                                        // className={"account-name-field"}
                                        id="settings-new-password"
                                        type="text"
                                        placeholder="New Password"
                                        name="newPassword"
                                        value={newCredentials.newPassword || ""}
                                        onChangeFunction={inputHandler}
                                    />
                                </div>
                                <div className="change-password-settings-item">
                                    <label htmlFor="confirm-new-password">Confirm New Password</label>
                                    <CInput 
                                        // className={"account-name-field"}
                                        id="settings-confirm-new-password"
                                        type="text"
                                        placeholder="Confirm New Password"
                                        name="confirmNewPassword"
                                        value={newCredentials.confirmNewPassword || ""}
                                        onChangeFunction={inputHandler}
                                    />
                                </div>
                            </div>
                            <CButton title="Save" onClickFunction={saveNewPassword} />
                        </div>
    )
}