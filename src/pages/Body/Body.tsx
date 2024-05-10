import { Route, Routes } from "react-router"
import { Register } from "../Register/Register"
import { Login } from "../Login/Login"
import { Home } from "../Home/Home"
import { Settings } from "../Settings/Settings"
import { GroupsOverview } from "../GroupsOverview/GroupsOverview"
import { GroupDetail } from "../GroupDetail/GroupDetail"

export const Body: React.FC = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="groups" element={<GroupsOverview />} />
            <Route path="groups/:id" element={<GroupDetail />} />
            <Route path="*" element={<Home />} />
        </Routes>

    )
}