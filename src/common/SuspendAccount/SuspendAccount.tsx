import { CButton } from "../CButton/CButton"

export const SuspendAccount: React.FC = (): JSX.Element => {
    return (
        <div className="suspend-account-settings">
            <h1>Suspend Account</h1>
            <div className="suspend-account-settings-container">
                <div className="suspend-account-settings-item">
                    <label htmlFor="reason">Reason</label>
                    <input type="text" id="reason" />
                </div>
            </div>
            <CButton title="Suspend" onClickFunction={() => { }} />
        </div>
    )
}