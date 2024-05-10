import { useRef, useState } from "react"
import { CreateButton } from "../../common/CreateButton/CreateButton"
import "./GroupsOverview.css"
import { QueryClient, UseInfiniteQueryResult, useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { Virtuoso } from "react-virtuoso";
import { selectUser } from "../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { CreateGroupResponse, createGroupService, getOwnGroupsService, CreateGroupProps } from "../../services/apicalls";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { CreateGroup } from "../../common/CreateGroup/CreateGroup";
import { EditGroup } from "../../common/EditGroup/EditGroup";
import { Modal } from "../../common/Modal/Modal";
import { DeleteGroup } from "../../common/DeleteGroup/DeleteGroup";
import { useNavigate } from "react-router-dom";
import { setGroup } from "../../app/slices/groupDetailSlice";

interface gradingScale {
    grade: string;
    range: {
        min: number;
        max: number;
    }
}

interface Group {
    _id: string;
    name: string
    author: string;
    collaborators: string[];
    level: string
    students: string[];
    tasks: string[];
    status: "active" | "archived";
    gradingScale?: gradingScale,
    createdAt: Date;
    updatedAt: Date;
}

export type Displayed = "groups" | "createGroup" | "editGroup" | "deleteGroup"

export const GroupsOverview: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(selectUser).credentials.token;
    const [errorMsg, setErrorMsg] = useState({
        serverError: { message: "", success: false }
    })
    const [isOpenOptions, setIsOpenOptions] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)

    const [displayed, setDisplayed] = useState<Displayed>("groups")
    let selectedGroup = useRef<Group | null>(null)

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
    }: UseInfiniteQueryResult<Group[], Error> = useInfiniteQuery('groups', ({ pageParam = 1 }) => getOwnGroupsService({ token, pageParam }), {
        getNextPageParam: (lastPage, allPages) => lastPage.length > 0 ? allPages.length + 1 : undefined,
    });

    const groups = data ? data.pages.flatMap(page => page) : [];

    let renderContent: JSX.Element | null;
    switch (displayed) {
        case "createGroup":
            renderContent = <CreateGroup
                token={token}
                setDisplayed={setDisplayed}
                setErrorMsg={setErrorMsg}
            />
            break;
        case "editGroup":
            renderContent = selectedGroup.current ? (
                <EditGroup
                    token={token}
                    group={selectedGroup.current}
                    setDisplayed={setDisplayed}
                    setErrorMsg={setErrorMsg}
                />
            ) : <h1>Error loading the page, please try again</h1>;
            break;
        case "groups":
            renderContent = (
                <>
                    {groups.map((group: Group) => {
                        return (
                            <div className="groups-overview-group" key={group._id} onClick={() => {
                                navigate(`/groups/${group._id}`, { state: { path: '/groups/:groupId' } })
                                dispatch(setGroup(group))
                                }}>
                                <h2>{group.name}</h2>
                                <p>{group.level}</p>
                                <CButton
                                    title="..."
                                    onClickFunction={() => {
                                        setIsOpenOptions(true)
                                        selectedGroup.current = group
                                    }}
                                />
                            </div>
                        )
                    })}
                </>
            )
            break;
            case "deleteGroup":
            renderContent = selectedGroup.current ? (
                <DeleteGroup
                    token={token}
                    group={selectedGroup.current}
                    setDisplayed={setDisplayed}
                    setErrorMsg={setErrorMsg}
                />
            ) : <h1>Error loading the page, please try again</h1>;
            break;
        default:
            renderContent = null;
    }

    return (
        <div className="groups-overview-design">
            {/* {isOpenModal &&
                <Modal
                    title="Delete Group"
                    description="Are you sure you want to delete this group?"
                    action={() => console.log("delete")}
                    setIsOpenModal={setIsOpenModal}
                    setErrorMsg={setErrorMsg}
                />
            } */}
            {isOpenOptions &&
                <div className="groups-overview-options">
                    <CButton
                        title="Close"
                        onClickFunction={() => {setIsOpenOptions(false)}}
                    />
                    <CButton
                        title="Edit"
                        onClickFunction={() => {
                            setDisplayed("editGroup")
                            setIsOpenOptions(false)
                        }}
                    />
                    <CButton
                        title="Delete"
                        onClickFunction={() => {
                            setDisplayed("deleteGroup")
                            setIsOpenOptions(false)
                        }}
                    />
                </div>
            }
            <CreateButton action={() => setDisplayed("createGroup")} />
            <div className="groups-overview-wrapper">
                {renderContent}
            </div>
        </div>
    )
}