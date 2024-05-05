import { useDispatch, useSelector } from "react-redux"
import { selectGroup, setGroup } from "../../app/slices/groupDetailSlice"
import { useParams } from "react-router-dom"
import { selectUser } from "../../app/slices/userSlice";
import { getGroupService } from "../../services/apicalls";
import { useQuery } from "react-query";
import { useState } from "react";

export const GroupDetail: React.FC = (): JSX.Element => {
    const token = useSelector(selectUser).credentials.token;
    const groupId = useParams<{ id: string }>().id!;
    const group = useSelector(selectGroup);
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState({
        serverError: { message: "", success: false }
    })

    const { data: fetchedGroup, isLoading, isError } = useQuery(['group', groupId], () => getGroupService({ token, groupId }), {
        enabled: !group || group._id !== groupId,
        onSuccess: (data) => {
            dispatch(setGroup(data));
        },
        onError: (error: any) => {
            setErrorMsg({
                serverError: { message: error.message, success: false }
            })
        }
    });

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div className="group-detail-error-screen">Error: {errorMsg.serverError.message}</div>

    return (
        <>
            {group && group._id === groupId ?
                <div className="group-detail">
                    <h1>{group.name}</h1>
                    <h2>{group.level}</h2>
                </div>
                // : <div className="group-detail">Loading...</div>
                : (fetchedGroup &&
                    <div className="group-detail">
                        <h1>{fetchedGroup.name}</h1>
                        <h2>{fetchedGroup.level}</h2>
                    </div>
                )
            }
        </>
    )
}