import "./SuspendAccount.css"
import { useMutation } from "react-query"
import { CButton } from "../CButton/CButton"
import { suspendAccountService } from "../../services/apicalls"
import { logout, selectUser } from "../../app/slices/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { Toast } from "../Toast/Toast"

interface ErrorMsg {
    serverError: { message: string, success: boolean }
}

export const SuspendAccount: React.FC = (): JSX.Element => {
    const token = useSelector(selectUser).credentials.token
    const dispatch = useDispatch()

    const [errorMsg, setErrorMsg] = useState<ErrorMsg>({
        serverError: { message: "", success: false }
    })
    const [isOpenConfirmation, setIsOpenConfirmation] = useState<boolean>(false)

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
        mutation.mutate({ token: token })
    }

    return (
        <>
            {errorMsg &&
                <Toast
                    message={errorMsg.serverError.message}
                    success={errorMsg.serverError.success}
                    time={4000}
                    resetServerError={() => setErrorMsg({
                        serverError: { message: "", success: false }
                    })}

                />
            }
            <div className="suspend-account-settings">
                {isOpenConfirmation ?
                    <div className="suspend-account-confirmation">
                        <h1>Are you sure you want to suspend your account?</h1>
                        <CButton title="Yes" onClickFunction={suspendAccount} />
                        <CButton title="No" onClickFunction={() => setIsOpenConfirmation(false)} />
                    </div>
                    :
                    <>
                        <h1>Suspend Account</h1>
                        <div className="suspend-account-settings-container">
                            <CButton title="Suspend" onClickFunction={() => setIsOpenConfirmation(true)} />
                        </div>
                    </>
                }
            </div>
        </>
    )
}