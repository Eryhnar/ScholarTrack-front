import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../app/slices/userSlice"
import "./Header.css"
import { NavButton } from "../NavButton/NavButton"

export const Header: React.FC = (): JSX.Element => {
    // const userName = useSelector(selectUser).credentials.user.name
    const {token, user} = useSelector(selectUser).credentials
    const dispatch = useDispatch()

    return (
        <div className="header-design">
            <div>Header</div>

            {token ? 
                <>
                    <div>{user.name}</div>
                    <div onClick={() => dispatch(logout())}>Logout</div>
                </>
            
            :
                <>
                    <NavButton title="Register" path="/register" />
                    <NavButton title="Login" path="/login" />
                </>
            }
        </div>
    )
}