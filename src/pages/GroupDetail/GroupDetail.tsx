import "./GroupDetail.css"
import { useDispatch, useSelector } from "react-redux"
import { selectGroup, setGroup, setGroups } from "../../app/slices/groupDetailSlice"
import { useNavigate, useParams } from "react-router-dom"
import { UserState, selectUser } from "../../app/slices/userSlice";
import { Group, Student, getOwnGroupsService, getStudentOverviewService } from "../../services/apicalls";
import { useQuery } from "react-query";
import { useState } from "react";
import { CreateButton } from "../../common/CreateButton/CreateButton";
import { RootState } from "../../app/store";
import { ChooseCreate } from "../../common/ChooseCreate/ChooseCreate";

export const GroupDetail: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.user.credentials.token);
    const groupId = useParams<{ id: string }>().id!;
    const group = useSelector(selectGroup); // add type
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState({
        serverError: { message: "", success: false }
    })
    const [isOpenCreate, setIsOpenCreate] = useState(false);

    const { data: groups, isLoading: groupsLoading, isError: groupsError } = useQuery<Group[]>('groups', ({ pageParam = 1 }) => getOwnGroupsService({ token, pageParam }), {
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
        // enabled: !group || group._id !== groupId,
        // forceFetchOnMount: true,
        refetchOnWindowFocus: false,
        // onSuccess: (data) => {
            // dispatch(setGroup(data));
        // },
        onError: (error: any) => {
            setErrorMsg({
                serverError: { message: error.message, success: false }
            })
        }
    });

    if (isLoading || groupsLoading) return <div>Loading...</div>
    if (isError || groupsError) return <div className="group-detail-error-screen">Error: {errorMsg.serverError.message}</div>
    // const openMenu = () => {
    //     // const event = window.event as MouseEvent // todo URGENT change this. Possibly adding id
    //     event.stopPropagation()
    //     setIsOpenCreate(!isOpenCreate)
    // }


    return (
        <>
        {isOpenCreate && <ChooseCreate closeFunction={() => setIsOpenCreate(false)}/>}
            {fetchedGroup &&
                <>
                    <CreateButton
                        // popovertarget="GroupDetail-create-menu"
                        id="GroupDetail-create-button"
                        action={() => setIsOpenCreate(!isOpenCreate)}
                    />
                    <div className="group-detail">
                        <div className="group-detail-row">
                            <p>name</p>
                            <p>surname</p>
                            <p>attendance %</p>
                            <p>marks</p>
                        </div>
                        {fetchedGroup.map((student: any) => {
                            return (
                                <div className="group-detail-row" key={student._id}>
                                    <p>{student.name}</p>
                                    <p>{student.surname}</p>
                                    <p>{student.totalAttendance}</p>
                                    <p>{student.totalMarks}</p>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
        </>
    )
}