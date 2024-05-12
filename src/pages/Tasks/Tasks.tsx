import { Task, getTasksResponse, getTasksService } from "../../services/apicalls"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "../../app/slices/userSlice"
import { useQuery } from "react-query"
import { CreateButton } from "../../common/CreateButton/CreateButton"
import { useEffect, useRef, useState } from "react"
import { CButton } from "../../common/CButton/CButton"
import { EditTask } from "../EditTask/EditTask"

export const Tasks: React.FC = (): JSX.Element => {
    const token = useSelector(selectUser).credentials.token
    const groupId = useParams<{ groupId: string }>().groupId!;
    const navigate = useNavigate();
    const [isOpenOptions, setIsOpenOptions] = useState(false)
    const optionsRef = useRef<HTMLDivElement | null>(null);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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
                    <CButton title="Delete" onClickFunction={() => { }} />
                </div>
            )}
            {isOpenEdit && (
                <EditTask 
                    token={token} 
                    group={groupId} 
                    task={selectedTask!}
                    close={() => setIsOpenEdit(false)} 
                />
            )}
            <CreateButton action={() => navigate(`/groups/${groupId}/create-task`)} />
            <h1>Tasks</h1>
            {tasks.data?.map(task => (
                <div className="tasks-task-container" key={task._id}>
                    <div key={task._id}>
                        <h2>{task.name}</h2>
                        {/* <p>{task.description}</p> */}
                        <p>{task.weight}</p>
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