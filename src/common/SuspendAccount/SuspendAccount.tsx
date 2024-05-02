import { useMutation } from "react-query"
import { CButton } from "../CButton/CButton"
import { suspendAccountService } from "../../services/apicalls"
import { logout, selectUser } from "../../app/slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

interface ErrorMsg {
    serverError: { message: string, success: boolean }
}

export const SuspendAccount: React.FC = (): JSX.Element => {
    const token = useSelector(selectUser).credentials.token
    const dispatch = useDispatch()

    const [errorMsg, setErrorMsg] = useState<ErrorMsg>({
        serverError: { message: "", success: false }
    })

    const mutation = useMutation(suspendAccountService, {
        onSuccess: (response: any) => {
            dispatch(logout())
            setErrorMsg({
                serverError: { message: response.message, success: true }
            })
        },
        onError: (error: any) => {
            setErrorMsg({
                serverError: { message: error.message, success: false }
            })
        }
    })

    const suspendAccount = () => {
        mutation.mutate({token: token})
    }

    return (
        <div className="suspend-account-settings">
            <h1>Suspend Account</h1>
            <div className="suspend-account-settings-container">
                <div className="suspend-account-settings-item">
                    {/* <label htmlFor="reason">Reason</label>
                    <input type="text" id="reason" /> */}
                </div>
            </div>
            <CButton title="Suspend" onClickFunction={suspendAccount} />
        </div>
    )
}