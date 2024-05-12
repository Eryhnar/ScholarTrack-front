import { Route, Routes } from "react-router"
import { Register } from "../Register/Register"
import { Login } from "../Login/Login"
import { Home } from "../Home/Home"
import { Settings } from "../Settings/Settings"
import { GroupsOverview } from "../GroupsOverview/GroupsOverview"
import { GroupDetail } from "../GroupDetail/GroupDetail"
import { CreateTask } from "../CreateTask/CreateTask"
import { CreateStudent } from "../CreateStudent/CreateStudent"
import { Tasks } from "../Tasks/Tasks"

export const Body: React.FC = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/groups" element={<GroupsOverview />} />
            <Route path="/groups/:id" element={<GroupDetail />} />
            <Route path="/groups/:groupId/create-task" element={<CreateTask />} />
            <Route path="/groups/:groupId/create-student" element={<CreateStudent />} />
            <Route path="/groups/:groupId/tasks" element={<Tasks />} />
            <Route path="*" element={<Home />} />
        </Routes>

    )
}