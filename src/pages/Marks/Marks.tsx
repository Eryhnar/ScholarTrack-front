import { useQuery } from "react-query";
import { Task, getTasksService } from "../../services/apicalls";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../app/slices/userSlice";
import { useParams } from "react-router-dom";
import { setTasks } from "../../app/slices/groupTasksSlice";

export const Marks: React.FC = (): JSX.Element => {
    const token = useSelector(selectUser).credentials.token;
    const groupId = useParams<{ groupId: string }>().groupId!;
    const dispatch = useDispatch();
    

    const tasks = useQuery<Task[]>("tasks", () => getTasksService({ token, groupId }), {
        onSuccess: (data) => {
            dispatch(setTasks(data));
        },
    });

    return (
        <div>
            <h1>Marks</h1>
        </div>
    )
}