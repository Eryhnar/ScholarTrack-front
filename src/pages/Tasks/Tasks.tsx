import { Task, getTasksResponse, getTasksService } from "../../services/apicalls"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../app/slices/userSlice"
import { useQuery } from "react-query"

export const Tasks: React.FC = (): JSX.Element => {
    const token = useSelector(selectUser).credentials.token
    const groupId = useParams<{ groupId: string }>().groupId!;

    const tasks = useQuery<Task[]>("tasks", () => getTasksService({ token, groupId }));
    return (
        <div>
            <h1>Tasks</h1>
            {tasks.data?.map(task => (
            <div className="tasks-task-container">
                <div key={task._id}>
                    <h2>{task.name}</h2>
                    {/* <p>{task.description}</p> */}
                    <p>{task.weight}</p>
                    <p>{task.deadline}</p>
                    <p>{task.optional ? "Yes" : "No"}</p>
                </div>
                <div>
                    <span className="material-symbols-outlined">
                        more_vert
                    </span>
                </div>
            </div>
            ))}
        </div>
    )
}