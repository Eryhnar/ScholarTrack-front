import { useState } from "react"
import { CreateButton } from "../../common/CreateButton/CreateButton"
import "./GroupsOverview.css"
import { UseInfiniteQueryResult, useInfiniteQuery } from "react-query";
import { Virtuoso } from "react-virtuoso";
import { selectUser } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import { getOwnGroupsService } from "../../services/apicalls";

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
    const token = useSelector(selectUser).credentials.token;
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [errorMsg, setErrorMsg] = useState({
        serverError: { message: "", success: false }
    })

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
    }: UseInfiniteQueryResult<Group[], Error> = useInfiniteQuery('groups', ({pageParam=1}) => getOwnGroupsService({token, pageParam}), {
        getNextPageParam: (lastPage, allPages) => lastPage.length > 0 ? allPages.length + 1 : undefined,
    });

    // if (isError) setErrorMsg({
    //     serverError: { message: data.message, success: false }
    // })

    const groups = data ? data.pages.flatMap(page => page) : [];
console.log("groups ",groups);
    
    return (
        <div className="groups-overview-design">
            <h1>Groups Overview</h1>
            <CreateButton action={() => setIsOpenCreate(true)} />
            <div className="groups-overview-wrapper">
                {isOpenCreate ?
                    <div className="groups-overview-create">
                        <div className="groups-overview-create-form">
                            <input type="text" placeholder="Group Name" />
                            <input type="text" placeholder="Group Description" />
                            <button>Create</button>
                            <button onClick={() => setIsOpenCreate(false)}>Cancel</button>
                        </div>
                    </div>
                    :
                    <>
                        {/* <Virtuoso
                            data={groups}
                            itemContent={(_, group: Group) => {
                                console.log("group",group);
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