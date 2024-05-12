import { useSelector } from "react-redux"
import { selectStudent } from "../../app/slices/studentDetailSlice"
import { CreateButton } from "../../common/CreateButton/CreateButton"
import { useNavigate, useParams } from "react-router-dom"
import { selectGroup } from "../../app/slices/groupDetailSlice"

export const StudentDetail: React.FC = (): JSX.Element => {
    const student = useSelector(selectStudent)
    const groupId = useParams<{ groupId: string }>().groupId
    const navigate = useNavigate()
    const group = useSelector(selectGroup)
    // console.log(group);
    

    // const group = useQuery<Group>("group", () => getGroupService({ token, groupId }), {
    //     onSuccess: (data) => {
    //         dispatch(setGroup(data));
    //     },
    // });

    return (
        <div className="student-detail-design">
            {/* <CreateButton action={() => navigate(`/groups/${groupId}/${taskId}/${student?._id}/create`)} /> */}
            <CreateButton action={() => navigate(`/groups/${groupId}/${student?._id}/create`)} />
            {student ?
            <>
                <h1>{`${student.name} ${student?.surname}`}</h1>
                <p>{student.age}</p>
                <p>{student.totalMarks}</p>
                <p>{student.totalAttendance}</p>
                {/* <div>
                    <h2>Attendance</h2>
                    {student.attendances.map((day) => (
                        <div key={day._id}>
                            <p>{day.date}</p>
                            <p>{day.present ? "Present" : "Absent"}</p>
                        </div>
                    ))}
                </div> */}
                <div>
                    <h2>Marks</h2>
                    {student.marks.map((mark) => (
                        <div key={mark._id} className="student-task-row">
                            <p>{mark.task[0].name}</p>
                            <p>{mark.value}</p>
                        </div>
                    ))}
                </div>
            </>
            : <h1>Student not found</h1>
            }   

        </div>
    )
}