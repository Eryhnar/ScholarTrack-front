import "./GroupDetail.css"
import { useDispatch, useSelector } from "react-redux"
import { setGroups } from "../../app/slices/groupDetailSlice"
import { useNavigate, useParams } from "react-router-dom"
import { Group, Student, getOwnGroupsService, getStudentOverviewService } from "../../services/apicalls";
import { useQuery } from "react-query";
import { useState } from "react";
import { CreateButton } from "../../common/CreateButton/CreateButton";
import { RootState } from "../../app/store";
import { ChooseCreate } from "../../common/ChooseCreate/ChooseCreate";
import { setStudent } from "../../app/slices/studentDetailSlice";
import { NavButton } from "../../common/NavButton/NavButton";

export const GroupDetail: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.user.credentials.token);
    const groupId = useParams<{ id: string }>().id!;
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState({
        serverError: { message: "", success: false }
    })
    const [isOpenCreate, setIsOpenCreate] = useState(false);

    const { isLoading: groupsLoading, isError: groupsError } = useQuery<Group[]>('groups', ({ pageParam = 1 }) => getOwnGroupsService({ token, pageParam }), {
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            dispatch(setGroups(data));
        },
        onError: (error: any) => {
            setErrorMsg({
                serverError: { message: error.message, success: false }
            })
        }
    });

    const { data: fetchedGroup, isLoading, isError } = useQuery<Student[]>(['group', groupId], () => getStudentOverviewService({ token, groupId }), {
        refetchOnWindowFocus: false,
        onError: (error: any) => {
            setErrorMsg({
                serverError: { message: error.message, success: false }
            })
        }
    });

    if (isLoading || groupsLoading) return <div>Loading...</div>
    if (isError || groupsError) return <div className="group-detail-error-screen">Error: {errorMsg.serverError.message}</div>

    return (
        <div className="group-detail-design">
        {isOpenCreate && 
        <ChooseCreate 
        closeFunction={() => setIsOpenCreate(false)}
        children= {
            <>
                <NavButton title="Create Student" path={`/groups/${groupId}/create-student`}  state= {{ path: '/groups/:groupId/create-student'}} />
                <NavButton title="Create Task" path={`/groups/${groupId}/create-task`} state= {{ path: '/groups/:groupId/create-task'}} />
            </>
        }
        />}
            {fetchedGroup &&
                <div className="group-detail-wrapper">
                    <CreateButton
                        id="GroupDetail-create-button"
                        action={() => setIsOpenCreate(!isOpenCreate)}
                    />
                        <div className="group-detail">
                            <div className="group-detail-row">
                                <div className="group-detail-student">
                                    <p>name</p>
                                    <p>surname</p>
                                    <p>attendance %</p>
                                    <p>marks</p>
                                </div>
                            </div>
                            {fetchedGroup.map((student: any) => {
                                return (
                                    <div className="group-detail-row" key={student._id} onClick={() => {
                                        dispatch(setStudent(student));
                                        navigate(`/groups/${groupId}/${student._id}`, { state: { path: '/groups/:groupId/:studentId' } })
                                    }}>
                                        <div className="group-detail-student">
                                            <p>{student.name}</p>
                                            <p>{student.surname}</p>
                                            <p>{student.totalAttendance}</p>
                                            <p>{student.totalMarks}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                </div>
            }
        </div>
    )
}