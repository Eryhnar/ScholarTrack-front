import { useState } from "react"
import { CInput } from "../../common/CInput/CInput"
import { NewTask } from "../CreateTask/CreateTask"
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/slices/userSlice";
import { CButton } from "../../common/CButton/CButton";
import { Task } from "../../services/apicalls";

interface EditTaskProps {
    token: string;
    group: string;
    task: Task;
    close: () => void;
}

export const EditTask: React.FC<EditTaskProps> = ({token, group, task, close}): JSX.Element => {
    // const token = useSelector(selectUser).credentials.token;
    // const navigate = useNavigate()
    // const group = useParams<{ groupId: string }>().groupId
    const [newTask, setNewTask] = useState<NewTask>({
        name: task.name,
        description: task.description,
        deadline: task.deadline,
        groups: [group],
        weight: task.weight,
        optional: task.optional,
    })

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setNewTask({
            ...newTask,
            [e.target.name]: value,
        })
    }

    return (
        <div className="edit-task-design">
            <h1>Edit Task</h1>
            <CInput
                    type="text"
                    placeholder="Task Name"
                    name="name"
                    value={newTask.name || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                />
                <CInput
                    type="text"
                    placeholder="Task Description"
                    name="description"
                    value={newTask.description || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                />
                {/* <CInput
                    type="date"
                    placeholder="Task Deadline"
                    name="deadline"
                    value={newTask.deadline || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                /> */}
                <CInput
                    type="text"
                    placeholder="Task Weight"
                    name="weight"
                    value={newTask.weight || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                />
                <CInput
                    type="checkbox"
                    placeholder="Task Optional"
                    name="optional"
                    value={newTask.optional ? "true" : "false"}
                    onChangeFunction={(e) => inputHandler(e)}
                />
                <CButton
                    title="Cancel"
                    onClickFunction={() => close}
                />
                <CButton
                    title="Save"
                    onClickFunction={() => {}}
                />

        </div>
    )
}