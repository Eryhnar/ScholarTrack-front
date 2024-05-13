import "./CreateMark.css"
import { useNavigate, useParams } from "react-router-dom"
import { Task, createMarkService, getTasksService } from "../../services/apicalls"
import { useSelector } from "react-redux"
import { selectUser } from "../../app/slices/userSlice"
import { useMutation, useQuery } from "react-query"
import { CDropdown } from "../../common/CDropdown/CDropdown"
import { CInput } from "../../common/CInput/CInput"
import { useState } from "react"
import { CButton } from "../../common/CButton/CButton"

export const CreateMark: React.FC = (): JSX.Element => {
    const navigate = useNavigate()
    const token = useSelector(selectUser).credentials.token
    const groupId = useParams<{ groupId: string }>().groupId!
    const studentId = useParams<{ studentId: string }>().studentId!
    const [newMark, setNewMark] = useState({
        value: "",
    })

    const { data: tasks, isLoading, isError } = useQuery<Task[]>("tasks", () => getTasksService({token, groupId}));
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (isError || !tasks) {
        return <div>Error loading tasks</div>;
    }

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMark({
            ...newMark,
            [e.target.name]: e.target.value,
        })
    }

    const [selectedTask, setSelectedTask] = useState<string>("")

    const handleTaskChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTask(e.target.value)
    }

    const mutation = useMutation(createMarkService, {
        onSuccess: (response: any) => {
            navigate(-1)
        },
        onError: (error: any) => {
            console.log(error)
        }
    })

    const createMark = async () => {
        mutation.mutate({token, groupId, taskId: selectedTask, studentId, newMark})
    }

    return (
        <div className="create-mark-design">
            <div className="create-mark-wrapper">
                <h1>CreateMark</h1>
                <CDropdown title="Task" items={tasks} selectedValue={selectedTask} onChangeFunction={(e) => handleTaskChange(e)} />
                <CInput type="text" name="value" value={newMark.value || ""} onChangeFunction={inputHandler} placeholder="Mark" />
                <CButton
                    title="Create"
                    onClickFunction={() => createMark()}
                />
            </div>
        </div>
    )
}