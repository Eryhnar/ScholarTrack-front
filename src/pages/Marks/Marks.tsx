import { useQuery } from "react-query";
import { Task, getTasksService } from "../../services/apicalls";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../app/slices/userSlice";
import { useNavigate, useParams } from "react-router-dom";
import { setTasks } from "../../app/slices/groupTasksSlice";
import { CreateButton } from "../../common/CreateButton/CreateButton";

export const Marks: React.FC = (): JSX.Element => {
    const token = useSelector(selectUser).credentials.token;
    const groupId = useParams<{ groupId: string }>().groupId!;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const tasks = useQuery<Task[]>("tasks", () => getTasksService({ token, groupId }), {
        onSuccess: (data) => {
            dispatch(setTasks(data));
        },
    });

    return (
        <div className="marks-design">
            <CreateButton action={() => navigate(`/groups/${groupId}/create`)} /> 
            <h1>Marks</h1>
            <div className="marks">
                {tasks.data?.map((task) => (
                    <div key={task._id} className="mark">
                        <h2>{task.name}</h2>
                        <p>{task.description}</p>
                        <p>{task.deadline}</p>
                        <p>{task.weight}</p>
                        <p>{task.optional ? "Optional" : "Mandatory"}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}