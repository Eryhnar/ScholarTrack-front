import "./StudentDetail.css"
import { useSelector } from "react-redux"
import { selectStudent } from "../../app/slices/studentDetailSlice"
import { CreateButton } from "../../common/CreateButton/CreateButton"
import { useNavigate, useParams } from "react-router-dom"

export const StudentDetail: React.FC = (): JSX.Element => {
    const student = useSelector(selectStudent)
    const groupId = useParams<{ groupId: string }>().groupId
    const navigate = useNavigate()


    return (
        <div className="student-detail-design">
            <CreateButton action={() => navigate(`/groups/${groupId}/${student?._id}/create`)} />
            {student ?
                <div className="student-detail-wrapper">
                        <h1>{`${student.name} ${student?.surname}`}</h1>
                    <div className="student-detail-scrollable">
                        <div className="student-detail-row">
                            <p>Age: </p>
                            <p>{student.age}</p>
                        </div>
                        <div className="student-detail-row">
                            <p>Final Marks: </p>
                            <p>{student.totalMarks}</p>
                        </div>
                        <div className="student-detail-row">
                            <p>Total Attendance: </p>
                            <p>{student.totalAttendance}</p>
                        </div>

                        <div className="student-detail-marks-container">
                            <h2>Marks</h2>
                            {student.marks.map((mark) => (
                                <div key={mark._id} className="student-task-row">
                                    <p>{mark.task[0].name}</p>
                                    <p>{mark.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                : <h1>Student not found</h1>
            }

        </div>
    )
}