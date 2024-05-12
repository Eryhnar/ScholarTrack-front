import "./Header.css"
import { useDispatch, useSelector } from "react-redux"
import { logout, selectUser } from "../../app/slices/userSlice"
import { NavButton } from "../NavButton/NavButton"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { selectGroup, selectGroups } from "../../app/slices/groupDetailSlice"
import { CDropdown } from "../CDropdown/CDropdown"
import { selectTasks } from "../../app/slices/groupTasksSlice"

export const Header: React.FC = (): JSX.Element => {
    // const userName = useSelector(selectUser).credentials.user.name
    // const menuRef = useRef<HTMLDivElement | null>(null);
    // const buttonRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate()
    const group = useSelector(selectGroup)
    const groups = useSelector(selectGroups)
    const { token, user } = useSelector(selectUser).credentials
    const dispatch = useDispatch()
    const location = useLocation()
    let renderContent = null
    const [isOpenNavMenu, setIsOpenNavMenu] = useState(false)
    const [isOpenProfileMenu, setIsOpenProfileMenu] = useState(false)

    // const currentGroup = useParams<{ id: string }>().id!;

    // const path = matchPath(location.pathname, {
    //     path: "/groups/:groupId",
    //     exact: true,
    //     strict: false
    // })
    const profileRef = useRef<HTMLDivElement | null>(null);
    const navMenuRef = useRef<HTMLDivElement | null>(null);

    const tasks = useSelector(selectTasks);
    // console.log(currentGroup);
    

//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//       if (!groups || !group) {
//         setIsLoading(true);
//       } else {
//         setIsLoading(false);
//       }
//     }, [groups, group]);

// if (isLoading) {
//     return <div>Loading...</div>;
// }

    // useEffect(() => {
    //     const closeMenu = (event: MouseEvent) => {
    //         // if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
    //         //     return;
    //         // }
    //         if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
    //             // setIsOpenNavMenu(false);
    //             setIsOpenProfileMenu(false);
    //         }
    //         // setIsOpenNavMenu(false);
    //     };

    //     document.addEventListener('mousedown', closeMenu);

    //     return () => {
    //         document.removeEventListener('mousedown', closeMenu);
    //     };
    // }, []);

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
        // const newGroupId = e.target.value;
        // console.log(e.target.value);
        navigate(`/groups/${e.target.value}`, { state: { path: "/groups/:groupId" } });
    }

    // const [currentGroup, setCurrentGroup] = location;
    const currentGroup = location.pathname.split('/')[2];
    // console.log(location);
    

    // useEffect(() => {
    //     if (tasks && tasks.length > 0) {
    //         navigate(`/groups/${group._id}/${tasks[0]._id}/marks`, { state: { path: "/groups/:groupId/:taskId/marks" } });
    //     }
    // }, [tasks, group]);

    // const changeTask = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     if (!tasks) {
    //         navigate(`/groups/${group._id}/marks`, { state: { path: "/groups/:groupId/marks" } });
    //     }
    //     navigate(`/groups/${group._id}/${e.target.value}/marks`, { state: { path: "/groups/:groupId/:taskId/marks" } });
    // }

    if (location.state) {
        switch (location.state.path) {
            // case "/groups":
            //     renderContent =
            //         <NavButton title="This is a future searchbar" path="/groups" />
            //     break;
            case "/groups/:groupId":
                renderContent =
                    <>
                        <CDropdown
                            title={group.name}
                            items={groups || []}
                            selectedValue={currentGroup}
                            onChangeFunction={changeGroup}
                        />
                        <NavButton title= "Tasks" path={`/groups/${group._id}/tasks`} />
                        {/* <NavButton title="Marks" path={`/groups/${group._id}/marks`} state={{path: '/groups/:groupId/marks'}} /> */}
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
                        {/* <NavButton title="not groups" path={"/groups"} /> */}
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
            {/* <div className="burguer-button" onClick={toggleBurguerMenu}>
                <span className="material-symbols-outlined">
                {isOpenNavMenu ? "close" : "menu"}
                </span>
            </div> */}

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
                    {/* <div>{user.name}</div> */}
                    <div className="nav-profile-button" onClick={toggleprofileMenu}>{user.name[0]}</div>

                    {/* <div onClick={() => dispatch(logout())}>Logout</div> */}
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