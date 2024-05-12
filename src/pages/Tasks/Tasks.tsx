import { DeleteTaskProps, Task, deleteTaskService, getTasksResponse, getTasksService } from "../../services/apicalls"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../app/slices/userSlice"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { CreateButton } from "../../common/CreateButton/CreateButton"
import { useEffect, useRef, useState } from "react"
import { CButton } from "../../common/CButton/CButton"
import { EditTask } from "../EditTask/EditTask"

export const Tasks: React.FC = (): JSX.Element => {
    const queryClient = useQueryClient()
    const token = useSelector(selectUser).credentials.token
    const groupId = useParams<{ groupId: string }>().groupId!;
    const navigate = useNavigate();
    const [isOpenOptions, setIsOpenOptions] = useState(false)
    const optionsRef = useRef<HTMLDivElement | null>(null);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [errorMsg, setErrorMsg] = useState({
        serverError: { message: "", success: false }
    })

    useEffect(() => {
        const closeMenu = (event: MouseEvent) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
                if (!isOpenEdit) {
                    setSelectedTask(null);
                }
                setIsOpenOptions(false);
            }
        };
    
        window.addEventListener('click', closeMenu);
    
        return () => {
            window.removeEventListener('click', closeMenu);
        };
    }, [isOpenEdit]);

    const tasks = useQuery<Task[]>("tasks", () => getTasksService({ token, groupId }));

const mutation = useMutation(deleteTaskService, {
    onMutate: async ({ taskId }: DeleteTaskProps) => {
        await queryClient.cancelQueries('tasks');
    
        const previousTasks = queryClient.getQueryData<Task[]>('tasks');
    
        queryClient.setQueryData<Task[]>('tasks', (old) =>
            old!.filter(task => task._id !== taskId)
        );
    
        return { previousTasks };
    },
    onError: (error: any, variables, context) => {
        if (context?.previousTasks) {
            queryClient.setQueryData<Task[]>('tasks', context.previousTasks);
        }

        setErrorMsg({
            serverError: { message: error.message, success: false }
        });
    },
    onSuccess: () => {
        queryClient.invalidateQueries('tasks');
    },
});

    const deleteTask = async () => {
        mutation.mutate({token, groupId, taskId: selectedTask!._id} as DeleteTaskProps)
    }

    return (
        <div className="tasks-design">
            {isOpenOptions && (
                <div ref={optionsRef} className="tasks-options">
                    <div onClick={() => {
                        setSelectedTask(null)
                        setIsOpenOptions(false)
                    }}>
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </div>
                    <CButton title="Edit" onClickFunction={() => { setIsOpenEdit(true) }} />
                    {/* <CButton title="Delete" onClickFunction={deleteTask} /> */}
                </div>
            )}
            {isOpenEdit && (
                <EditTask 
                    token={token} 
                    group={groupId} 
                    task={selectedTask!}
                    close={() => setIsOpenEdit(false)} 
                    setErrorMsg={() => setErrorMsg}
                />
            )}
            <CreateButton action={() => navigate(`/groups/${groupId}/create-task`)} />
            <h1>Tasks</h1>
            {tasks.data?.map(task => (
                <div className="tasks-task-container" key={task._id}>
                    <div key={task._id}>
                        <h2>{task.name}</h2>
                        {/* <p>{task.description}</p> */}
                        <p>{task.weight}%</p>
                        <p>{task.deadline}</p>
                        <p>{task.optional ? "Yes" : "No"}</p>
                    </div>
                    <div onClick={(event) => {
                        event.stopPropagation();
                        setSelectedTask(task);
                        setIsOpenOptions(true)
                    }}>
                        <span className="material-symbols-outlined">
                            more_vert
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}