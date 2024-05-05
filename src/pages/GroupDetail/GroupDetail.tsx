import { useSelector } from "react-redux"
import { selectGroup } from "../../app/slices/groupDetailSlice"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

export const GroupDetail: React.FC = (): JSX.Element => {
    const groupId = useParams<{id: string}>().id
    const group = useSelector(selectGroup);

    useEffect(() => {
        if (!group || group._id !== groupId) {
            console.log("fetching group");
            
        }
    },[groupId, group]);

    return (
        <>
            {group && group._id === groupId ?
            <div className="group-detail">
                <h1>{group.name}</h1>
                <h2>{group.level}</h2>
            </div>
            : <div className="group-detail">Loading...</div>
            }
        </>
    )
}