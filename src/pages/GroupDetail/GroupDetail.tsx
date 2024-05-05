import { useSelector } from "react-redux"
import { selectGroup } from "../../app/slices/groupDetailSlice"

export const GroupDetail: React.FC = (): JSX.Element => {
    const group = useSelector(selectGroup)
    return (
        <div className="group-detail">
            <h1>{group.name}</h1>
            <h2>{group.level}</h2>
        </div>
    )
}