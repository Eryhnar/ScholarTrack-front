import "./Header.css"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../app/slices/userSlice"
import { NavButton } from "../NavButton/NavButton"
import { useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

export const Header: React.FC = (): JSX.Element => {
    // const userName = useSelector(selectUser).credentials.user.name
    // const menuRef = useRef<HTMLDivElement | null>(null);
    // const buttonRef = useRef<HTMLDivElement | null>(null);
    const { token, user } = useSelector(selectUser).credentials
    const dispatch = useDispatch()
    const location = useLocation()
    let renderContent = null
    const [isOpenNavMenu, setIsOpenNavMenu] = useState(false)
    const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false)
    // const path = matchPath(location.pathname, {
    //     path: "/groups/:groupId",
    //     exact: true,
    //     strict: false
    // })

    // useEffect(() => {
    //     const closeMenu = (event: MouseEvent) => {
    //         if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
    //             return;
    //         }
    //         if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
    //             setIsOpenNavMenu(false);
    //         }
    //     };

    //     document.addEventListener('mousedown', closeMenu);

    //     return () => {
    //         document.removeEventListener('mousedown', closeMenu);
    //     };
    // }, []);

    const toggleBurguerMenu = () => {
        // event.stopPropagation();
        setIsOpenNavMenu(!isOpenNavMenu);
    }

    const toggleprofileMenu = () => {
        setIsOpenProfileMenu(!isOpenProfileMenu);
    }

    if (location.state) {
        switch (location.state.path) {
            // case "/groups":
            //     renderContent =
            //         <NavButton title="This is a future searchbar" path="/groups" />
            //     break;
            case "/groups/:groupId":
                renderContent =
                    <>
                        <NavButton title="Hi" path="/groups/create" />
                    </>
                break;
            default:
                renderContent =
                    <>
                        <NavButton title="not groups" path="/groups" />
                    </>
                break;
        }
    }
    // useEffect(() => {
    //     console.log(location);
    // })

    // const routes = [
    //     { path: "/groups/create", layout: <NavButton title="Hi" path="/groups/create" /> },
    //     { path: "/groups/:groupId", layout: <NavButton title="Hi" path="/groups/:groupId" /> },
    //     { path: "/home", layout: <NavButton title="Hi" path="/home" /> },
    //     // Add more routes here
    // ];

    // const matchedRoute = routes.find(route => matchPath(location.pathname, route.path));
    // const renderContent = matchedRoute ? matchedRoute.layout : <NavButton title="not groups" path="/groups" />;

    return (
        <div className="header-design">
            {isOpenNavMenu &&
                <div className="nav-menu">
                    <NavButton title="Home" path="/" />
                    <NavButton title="Groups" path="/groups" />
                    <NavButton title="Settings" path="/settings" />
                </div>
            }
            {isOpenProfileMenu &&
                <div className="nav-profile-menu">
                    <h3>{user.name}</h3>
                    <NavButton title="Settings" path="/settings" />
                    <div onClick={() => dispatch(logout())}>Logout</div>
                    <div onClick={() => setIsOpenProfileMenu(false)}><span className="material-symbols-outlined">close</span></div>
                </div>
            }
            <div className="burguer-button" onClick={toggleBurguerMenu}>
                <span className="material-symbols-outlined">
                    {isOpenNavMenu ? "close" : "menu"}
                </span>
            </div>

            {token ?
                <>
                    {renderContent}
                    {/* <div>{user.name}</div> */}
                    <div className="nav-profile-button" onClick={toggleprofileMenu}>{user.name[0]}</div>

                    {/* <div onClick={() => dispatch(logout())}>Logout</div> */}
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