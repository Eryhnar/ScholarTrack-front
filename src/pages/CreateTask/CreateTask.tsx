import "./CreateTask.css"
import { useState } from "react"
import { CInput } from "../../common/CInput/CInput"
import { useNavigate, useParams } from "react-router-dom";
import { CButton } from "../../common/CButton/CButton";
import { useMutation } from "react-query";
import { createTaskService, CreateTaskProps } from "../../services/apicalls";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/slices/userSlice";
import { Toast } from "../../common/Toast/Toast";

export interface NewTask {
    name: string;
    description?: string;
    deadline?: string;
    groups: string[];
    weight: string;
    optional: boolean;
}

export const CreateTask: React.FC = (): JSX.Element => {
    const token = useSelector(selectUser).credentials.token;
    const navigate = useNavigate()
    const group = useParams<{ groupId: string }>().groupId
    const [newTask, setNewTask] = useState<NewTask>({
        name: "",
        description: "",
        deadline: "",
        groups: [group!],
        weight: "",
        optional: false,
    })
    const [errorMsg, setErrorMsg] = useState({
        serverError: { message: "", success: false }
    })

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setNewTask({
            ...newTask,
            [e.target.name]: value,
        })
    }

    const mutation = useMutation(createTaskService, {
        onSuccess: () => {
            navigate(-1)
        },
        onError: (error: any) => {
            setErrorMsg({
                serverError: { message: error.message, success: false }
            })
        }
    })

    const createTask = async () => {
        mutation.mutate({token, group, newTask} as CreateTaskProps)
    }

    return (
        <div className="create-task-design">
            <Toast 
                message={errorMsg.serverError.message}
                success={errorMsg.serverError.success}
                time={4000}
                resetServerError={() => setErrorMsg({serverError: {message: "", success: false}})}
            />
            <div className="create-task-wrapper">
                <h1>Create Task</h1>
                <div className="create-task-row">
                    <CInput
                        type="text"
                        placeholder="Task Name"
                        name="name"
                        value={newTask.name || ""}
                        onChangeFunction={(e) => inputHandler(e)}
                    />
                    <p>*</p>
                </div>
                <CInput
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={newTask.description || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                />
                <CInput
                    type="date"
                    placeholder="Deadline"
                    name="deadline"
                    value={newTask.deadline || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                />
                <div className="create-task-row">
                    <CInput
                        type="text"
                        placeholder="Value of the task over 100"
                        name="weight"
                        value={newTask.weight || ""}
                        onChangeFunction={(e) => inputHandler(e)}
                    />
                    <p>*</p>
                </div>
                <div className="create-task-row-2">
                    <p>Optional?</p>
                    <CInput
                        type="checkbox"
                        placeholder="Optional"
                        name="optional"
                        value={newTask.optional ? "true" : "false"}
                        onChangeFunction={(e) => inputHandler(e)}
                    />
                </div>
                    <p>All fields marked with * are required</p>
                    <CButton
                        title="Create Task"
                        onClickFunction={createTask}
                    />
            </div>
        </div>
    )
}