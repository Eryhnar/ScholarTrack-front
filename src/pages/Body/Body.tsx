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
import { Marks } from "../Marks/Marks"
import { CreateMark } from "../CreateMark/CreateMark"
import { StudentDetail } from "../StudentDetail/StudentDetail"
// import { EditTask } from "../EditTask/EditTask"

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
            {/* <Route path="/groups/:groupId/edit-task" element={<EditTask />} /> */}
            <Route path="/groups/:groupId/marks" element={<Marks />} />
            {/* <Route path="/groups/:groupId/:taskId/:studentId/create" element={<CreateMark />} /> */}
            <Route path="/groups/:groupId/:studentId/create" element={<CreateMark />} />
            <Route path="/groups/:groupId/:studentId" element={<StudentDetail />} />
            <Route path="*" element={<Home />} />
        </Routes>

    )
}