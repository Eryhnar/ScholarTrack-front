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
import { SecureRoute } from "../../common/SecureRoute/SecureRoute"
import { selectUser } from "../../app/slices/userSlice"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
// import { EditTask } from "../EditTask/EditTask"

export const Body: React.FC = (): JSX.Element => {
    const token = useSelector(selectUser).credentials.token
    return (
        <Routes>
            {/* {<SecureRoute protMode="allow-logged-out" />} */}
            <Route path="/" element={<SecureRoute protMode="allow-logged-in" />} >
                <Route index element={<Home />} />
            </Route>
            <Route path="/register" element={<SecureRoute protMode="allow-logged-out" />} >
                <Route index element={<Register />} />
            </Route>
            <Route path="/login" element={<SecureRoute protMode="allow-logged-out" />} >
                <Route index element={<Login />} />
            </Route>
            <Route path="/settings" element={<SecureRoute protMode="allow-logged-in" />} >
                <Route index element={<Settings />} />
            </Route>
            <Route path="/groups" element={<SecureRoute protMode="allow-logged-in" />} >
                <Route index element={<GroupsOverview />} />
            </Route>
            <Route path="/groups/:id" element={<SecureRoute protMode="allow-logged-in" />} >
                <Route index element={<GroupDetail />} />
            </Route>
            <Route path="/groups/:groupId/create-task" element={<SecureRoute protMode="allow-logged-in" />} >
                <Route index element={<CreateTask />} />
            </Route>
            <Route path="/groups/:groupId/create-student" element={<SecureRoute protMode="allow-logged-in" />} >
                <Route index element={<CreateStudent />} />
            </Route>
            <Route path="/groups/:groupId/tasks" element={<SecureRoute protMode="allow-logged-in" />} >
                <Route index element={<Tasks />} />
            </Route>
            {/* <Route path="/groups/:groupId/edit-task" element={<EditTask />} /> */}
            <Route path="/groups/:groupId/marks" element={<SecureRoute protMode="allow-logged-in" />} >
                <Route index element={<Marks />} />
            </Route>
            {/* <Route path="/groups/:groupId/:taskId/:studentId/create" element={<CreateMark />} /> */}
            <Route path="/groups/:groupId/:studentId/create" element={<SecureRoute protMode="allow-logged-in" />} >
                <Route index element={<CreateMark />} />
            </Route>
            <Route path="/groups/:groupId/:studentId" element={<SecureRoute protMode="allow-logged-in" />} >
                <Route index element={<StudentDetail />} />
            </Route>
            <Route path="*" element={<Navigate to={token ? "/" : "/login"} replace/>} />
        </Routes>

    )
}