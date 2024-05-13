import "./Header.css"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../app/slices/userSlice"
import { NavButton } from "../NavButton/NavButton"
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { selectGroup, selectGroups } from "../../app/slices/groupDetailSlice"
import { CDropdown } from "../CDropdown/CDropdown"
import { selectTasks } from "../../app/slices/groupTasksSlice"

export const Header: React.FC = (): JSX.Element => {
    const navigate = useNavigate()
    const group = useSelector(selectGroup)
    const groups = useSelector(selectGroups)
    const { token, user } = useSelector(selectUser).credentials
    const dispatch = useDispatch()
    const location = useLocation()
    let renderContent = null
    const [isOpenNavMenu, setIsOpenNavMenu] = useState(false)
    const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false)


    const profileRef = useRef<HTMLDivElement | null>(null);
    const navMenuRef = useRef<HTMLDivElement | null>(null);

    const tasks = useSelector(selectTasks);

    useEffect(() => {
        const closeMenu = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsOpenProfileMenu(false);
            }
            if (navMenuRef.current && !navMenuRef.current.contains(event.target as Node)) {
                setIsOpenNavMenu(false);
            }
        };

        window.addEventListener('click', closeMenu);

        return () => {
            window.removeEventListener('click', closeMenu);
        };
    }, []);

    const toggleBurguerMenu = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsOpenNavMenu(!isOpenNavMenu);
    }

    const toggleprofileMenu = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsOpenProfileMenu(!isOpenProfileMenu);
    }

    const changeGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
        navigate(`/groups/${e.target.value}`, { state: { path: "/groups/:groupId" } });
    }

    const currentGroup = location.pathname.split('/')[2];

    if (location.state) {
        switch (location.state.path) {
            case "/groups/:groupId":
                renderContent =
                    <>
                        <CDropdown
                            title={group.name}
                            items={groups || []}
                            selectedValue={currentGroup}
                            onChangeFunction={changeGroup}
                        />
                    </>
                break;
            case "/groups/:groupId/marks":
                renderContent =
                    <CDropdown 
                        title="Tasks" 
                        items={tasks || []}
                        selectedValue={"Task"}
                        onChangeFunction={() => { }}
                    />
                break;
            case "/groups/:groupId/:taskId/marks":
                renderContent =
                    <CDropdown 
                        title="Tasks" 
                        items={tasks || []}
                        selectedValue={"Task"}
                        onChangeFunction={() => { }}
                    />
                break;
            default:
                renderContent =
                    <>
                    </>
                break;
        }
    }

    return (
        <div className="header-design">

            {token ?
                <>
                {isOpenNavMenu &&
                    <div className="nav-menu" ref={navMenuRef}>
                        <NavButton title="Home" path={"/"} />
                        <NavButton title="Groups" path={"/groups"} />
                        <NavButton title="Settings" path={"/settings"} />
                    </div>
                }
                {isOpenProfileMenu &&
                    <div className="nav-profile-menu" ref={profileRef}>
                        <h3>{user.name}</h3>
                        <NavButton title="Settings" path={"/settings"} />
                        <div onClick={() => dispatch(logout())} className="default-nav-button">Logout</div>
                        <div onClick={() => setIsOpenProfileMenu(false)}><span className="material-symbols-outlined default-nav-button">close</span></div>
                    </div>
                }
                    <div className="burguer-button" onClick={toggleBurguerMenu}>
                        <span className="material-symbols-outlined">
                            {isOpenNavMenu ? "close" : "menu"}
                        </span>
                    </div>
                    {renderContent}
                    <div className="nav-profile-button" onClick={toggleprofileMenu}>{user.name[0]}</div>

                </>

                :
                <div className="no-token-header-wrapper">
                    <div className="no-token-header">
                        <div className="no-token-header-left">
                            <NavButton title="ScholarTrack" path={"/"} />
                        </div>
                        <div className="no-token-header-right">
                            <NavButton title="Register" path={"/register"} />
                            <NavButton title="Login" path={"/login"} />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}