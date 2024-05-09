import { useDispatch, useSelector } from "react-redux"
import { selectGroup, setGroup } from "../../app/slices/groupDetailSlice"
import { useNavigate, useParams } from "react-router-dom"
import { selectUser } from "../../app/slices/userSlice";
import { getGroupService, getOwnGroupsService, getStudentOverviewService } from "../../services/apicalls";
import { useQuery } from "react-query";
import { useState } from "react";
import { CDropdown } from "../../common/CDropdown/CDropdown";

export const GroupDetail: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const token = useSelector(selectUser).credentials.token;
    const groupId = useParams<{ id: string }>().id!;
    const group = useSelector(selectGroup);
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState({
        serverError: { message: "", success: false }
    })

    const { data: groups, isLoading: groupsLoading, isError: groupsError } = useQuery('groups', ({ pageParam = 1 }) => getOwnGroupsService({ token, pageParam }), {
        refetchOnWindowFocus: false,
        onError: (error: any) => {
            setErrorMsg({
                serverError: { message: error.message, success: false }
            })
        }
    });

    const { data: fetchedGroup, isLoading, isError } = useQuery(['group', groupId], () => getStudentOverviewService({ token, groupId }), {
        // enabled: !group || group._id !== groupId,
        // forceFetchOnMount: true,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            dispatch(setGroup(data));
            // console.log("hi");
            console.log(fetchedGroup);
            
        },
        onError: (error: any) => {
            setErrorMsg({
                serverError: { message: error.message, success: false }
            })
        }
    });

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div className="group-detail-error-screen">Error: {errorMsg.serverError.message}</div>

    // const groups = [{id: "1", name: "Group 1"}, {id: "2", name: "Group 2"}, {id: "3", name: "Group 3"}]
    const changeGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // const newGroupId = e.target.value;
        // console.log(e.target.value);
        navigate(`/groups/${e.target.value}`);
    }

    return (
        <>
            {group && group._id === groupId ?
            <>
            <CDropdown
                title={group.name}
                items={groups || []}
                selectedValue={group._id}
                onChangeFunction={changeGroup}
            />
                {/* <div className="group-detail">
                    <h1>{group.name}</h1>
                    <h2>{group.level}</h2>
                </div> */}
                <div className="group-detail">
                        {fetchedGroup.map((student: any) => {
                            return (
                                <div className="group-detail-student-card" key={student._id}>
                                    <p>{student.name}</p>
                                    <p>{student.surname}</p>
                                </div>
                            )
                        })}
                    </div>
            </>
                // : <div className="group-detail">Loading...</div>
                : (fetchedGroup &&
                    // <div className="group-detail">
                    //     <h1>{fetchedGroup.name}</h1>
                    //     <h2>{fetchedGroup.level}</h2>
                    // </div>
                    <div className="group-detail">
                        {fetchedGroup.map((student: any) => {
                            return (
                                <div className="group-detail-student-card" key={student._id}>
                                    <p>{student.name}</p>
                                    <p>{student.surname}</p>
                                </div>
                            )
                        })}
                    </div>
                )
                // <div className="group-detail-student-card">

                // </div>
            }
        </>
    )
}