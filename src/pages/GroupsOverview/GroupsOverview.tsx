import { useState } from "react"
import { CreateButton } from "../../common/CreateButton/CreateButton"
import "./GroupsOverview.css"
import { QueryClient, UseInfiniteQueryResult, useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { Virtuoso } from "react-virtuoso";
import { selectUser } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { CreateGroupResponse, createGroupService, getOwnGroupsService, CreateGroupProps } from "../../services/apicalls";
import { CButton } from "../../common/CButton/CButton";
import { CInput } from "../../common/CInput/CInput";

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

export const GroupsOverview: React.FC = (): JSX.Element => {
    const queryClient = useQueryClient();
    const token = useSelector(selectUser).credentials.token;
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [errorMsg, setErrorMsg] = useState({
        serverError: { message: "", success: false }
    })
    const [newGroup, setNewGroup] = useState({
        name: "",
        level: ""
    })

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

    const newGroupInputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewGroup({
            ...newGroup,
            [e.target.name]: e.target.value
        })
    }

    const mutation = useMutation(createGroupService,  {
        onSuccess: (response: CreateGroupResponse) => {
            // TODO implement optimistic update
            // queryClient.setQueryData<Group[]>('groups', (old = []) => [...old, response.data]);
            // queryClient.setQueryData<Group[][]>('groups', (old = []) => {
            //     let newPage;
            //     if (!Array.isArray(old) || old.length === 0) {
            //         newPage = [response.data];
            //     } else {
            //         newPage = [...old[old.length - 1], response.data];
            //     }
            //     return [...old.slice(0, -1), newPage];
            // });
            setErrorMsg({
                serverError: { message: response.message, success: true }
            });
            setIsOpenCreate(false)
        },
        onError: (error: any) => {
            setErrorMsg({
                serverError: { message: error.message, success: false }
            });
        }
    })

    const saveNewGroup = async () => {
        mutation.mutate({token, newGroup});
    }

    return (
        <div className="groups-overview-design">
            {/* <h1>Groups Overview</h1> */}
            <CreateButton action={() => setIsOpenCreate(true)} />
            <div className="groups-overview-wrapper">
                {isOpenCreate ?
                    <div className="groups-overview-create">
                        <div className="groups-overview-create-form">
                            {/* <input type="text" placeholder="Group Name" /> */}
                            {/* <input type="text" placeholder="Group Level" /> */}
                            <CInput
                                type="text"
                                placeholder="Group Name"
                                name="name"
                                value={newGroup.name || ""}
                                onChangeFunction={newGroupInputHandler}
                            />
                            <CInput
                                type="text"
                                placeholder="Group Level"
                                name="level"
                                value={newGroup.level || ""}
                                onChangeFunction={newGroupInputHandler}
                            />
                            <CButton
                                title="Create"
                                onClickFunction={saveNewGroup}
                            />
                            <button onClick={() => setIsOpenCreate(false)}>Cancel</button>
                        </div>
                    </div>
                    :
                    <>

                        {/* <Virtuoso
                            data={groups}
                            itemContent={(_, group: Group) => {
                                return (
                                    <div className="groups-overview-group" key={group._id}>
                                        <h2>{group.name}</h2>
                                        <p>{group.level}</p>
                                    </div>
                                );
                            }}
                            style={{ height: "85vh" }}
                            endReached={() => {
                                if (hasNextPage) fetchNextPage()
                            }}
                        /> */}
                        {groups.map((group: Group) => {
                            return (
                                <div className="groups-overview-group" key={group._id}>
                                    <h2>{group.name}</h2>
                                    <p>{group.level}</p>
                                </div>
                            )
                        })}

                        {/* <div className="groups-overview-group ">
                            <h2>Group 1</h2>
                            <p>Group 1 Description</p>
                        </div>
                        <div className="groups-overview-group ">
                            <h2>Group 2</h2>
                            <p>Group 2 Description</p>
                        </div>
                        <div className="groups-overview-group ">
                            <h2>Group 3</h2>
                            <p>Group 3 Description</p>
                        </div>
                        <div className="groups-overview-group ">
                            <h2>Group 4</h2>
                            <p>Group 4 Description</p>
                        </div>
                        <div className="groups-overview-group ">
                            <h2>Group 3</h2>
                            <p>Group 3 Description</p>
                        </div>
                        <div className="groups-overview-group ">
                            <h2>Group 4</h2>
                            <p>Group 4 Description</p>
                        </div>
                        <div className="groups-overview-group ">
                            <h2>Group 3</h2>
                            <p>Group 3 Description</p>
                        </div>
                        <div className="groups-overview-group ">
                            <h2>Group 4</h2>
                            <p>Group 4 Description</p>
                        </div> */}
                    </>
                }
            </div>
        </div>
    )
}