import { useRef, useState } from "react"
import { CreateButton } from "../../common/CreateButton/CreateButton"
import "./GroupsOverview.css"
import { QueryClient, UseInfiniteQueryResult, useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { Virtuoso } from "react-virtuoso";
import { selectUser } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { CreateGroupResponse, createGroupService, getOwnGroupsService, CreateGroupProps } from "../../services/apicalls";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";
import { CreateGroup } from "../../common/CreateGroup/CreateGroup";
import { EditGroup } from "../../common/EditGroup/EditGroup";

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

type Displayed = "groups" | "createGroup" | "editGroup" | "deleteGroup"

export const GroupsOverview: React.FC = (): JSX.Element => {
    // const queryClient = useQueryClient();
    const token = useSelector(selectUser).credentials.token;
    // const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [errorMsg, setErrorMsg] = useState({
        serverError: { message: "", success: false }
    })
    // const [newGroup, setNewGroup] = useState({
    //     name: "",
    //     level: ""
    // })
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

    // if (isError) setErrorMsg({
    //     serverError: { message: data.message, success: false }
    // })

    const groups = data ? data.pages.flatMap(page => page) : [];
    // console.log("groups ",groups);

    // const newGroupInputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //     setNewGroup({
    //         ...newGroup,
    //         [e.target.name]: e.target.value
    //     })
    // }

    // const mutation = useMutation(createGroupService,  {
    //     onSuccess: (response: CreateGroupResponse) => {

    //         setErrorMsg({
    //             serverError: { message: response.message, success: true }
    //         });
    //         setIsOpenCreate(false)
    //     },
    //     onError: (error: any) => {
    //         setErrorMsg({
    //             serverError: { message: error.message, success: false }
    //         });
    //     }
    // })

    // const saveNewGroup = async () => {
    //     mutation.mutate({token, newGroup});
    // }

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
                            <div className="groups-overview-group" key={group._id}>
                                <h2>{group.name}</h2>
                                <p>{group.level}</p>
                                <CButton
                                    title="..."
                                    onClickFunction={() => {
                                        setDisplayed("editGroup")
                                        selectedGroup.current = group
                                    }}
                                />
                            </div>
                        )
                    })}
                </>
            )
            break;
        default:
            renderContent = null;
    }

    return (
        <div className="groups-overview-design">
            {/* <h1>Groups Overview</h1> */}
            <CreateButton action={() => setDisplayed("createGroup")} />
            <div className="groups-overview-wrapper">
                {renderContent}
            </div>
        </div>
    )
}