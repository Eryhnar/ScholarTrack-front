
import { useState } from "react"
import { CButton } from "../../common/CButton/CButton"
import "./Settings.css"
import { AccountSettings } from "../../common/AccountSettings/AccountSettings"
import { ChangePassword } from "../../common/ChangePassword/ChangePassword"
import { SuspendAccount } from "../../common/SuspendAccount/SuspendAccount"

interface ErrorMsg {
    nameError: string,
    emailError: string,
    serverError: { message: string, success: boolean } | null
}

export const Settings: React.FC = (): JSX.Element => {
    const [selectedSetting, setSelectedSetting] = useState<string>("Account")
    const [errorMsg, setErrorMsg] = useState<ErrorMsg>({
        nameError: "",
        emailError: "",
        serverError: { message: "", success: false }
    })
    return (
        <div className="settings-design">
            <div className="settings-container">
                <div className="setting-selector-container">
                    <CButton
                        className="setting-selector-button" 
                        title="Account"
                        onClickFunction={() => setSelectedSetting("Account")}
                    />
                    <CButton
                        className="setting-selector-button" 
                        title="Change Password"
                        onClickFunction={() => setSelectedSetting("Change Password")}
                    />
                    <CButton
                        className="setting-selector-button" 
                        title="Suspend Account"
                        onClickFunction={() => setSelectedSetting("Suspend Account")}
                    />
                </div>
                <div className="setting-display">
                    {selectedSetting === "Account" && (
                        // <div className="account-settings">
                        //     <h1>Account Settings</h1>
                        //     <div className="account-settings-container">
                        //         <div className="account-settings-item">
                        //             <label htmlFor="name">Name</label>
                        //             <input type="text" id="name" />
                        //         </div>
                        //         <div className="account-settings-item">
                        //             <label htmlFor="email">Email</label>
                        //             <input type="email" id="email" />
                        //         </div>
                        //     </div>
                        //     <CButton title="Save" onClickFunction={() => {}} />
                        // </div>
                        <AccountSettings errorMsg={errorMsg} setErrorMsg={setErrorMsg}/>
                    )}
                    {selectedSetting === "Change Password" && (
                        <ChangePassword/>
                    )}
                    {selectedSetting === "Suspend Account" && (
                        <SuspendAccount/>
                    )}
                </div>
            </div>
        </div>
    )
}