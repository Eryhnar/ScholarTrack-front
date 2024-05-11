import { useState } from "react"
import { CInput } from "../../common/CInput/CInput"
import { CDropdown } from "../../common/CDropdown/CDropdown";
import { useParams } from "react-router-dom";
import { CButton } from "../../common/CButton/CButton";

interface Task {
    name: string;
    description: string;
    deadline: string;
    groups: string[];
    weight: string;
    optional: boolean;
}

export const CreateTask: React.FC = (): JSX.Element => {
    const group = useParams<{ groupId: string }>()
    const [newTask, setNewTask] = useState<Task>({
        name: "",
        description: "",
        deadline: "",
        groups: [group.groupId!],
        weight: "",
        optional: false,
    })

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setNewTask({
            ...newTask,
            [e.target.name]: value,
        })
    }

    return (
        <div>
            <h1>Create Task</h1>
            <CInput
                type="text"
                placeholder="Task Name"
                name="name"
                value={newTask.name || ""}
                onChangeFunction={(e) => inputHandler(e)}
            />
            <p>*</p>
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
            {/* <CInput
                type="text"
                placeholder="Groups"
                name="groups"
                value={newTask.groups || ""}
                onChangeFunction={(e) => inputHandler(e)}
            /> */}
            <div>
                <CInput
                    type="text"
                    placeholder="Value of the task over 100"
                    name="weight"
                    value={newTask.weight || ""}
                    onChangeFunction={(e) => inputHandler(e)}
                />
                <p>*</p>
            </div>
            <div>
                <p>Optional?</p>
                <CInput
                    type="checkbox"
                    placeholder="Optional"
                    name="optional"
                    value={newTask.optional ? "true" : "false"}
                    onChangeFunction={(e) => inputHandler(e)}
                />
            </div>
            {/* <CDropdown
                title="Groups"
                items={["group1", "group2", "group3"]}
                selectedValue={newTask.groups[0]}
                onChangeFunction={(e) => inputHandler(e)} */}
                <p>All fields marked with * are required</p>
                <CButton 
                    title="Create Task"
                    onClickFunction={() => console.log(newTask)}
                />
        </div>
    )
}