import { Route, Routes } from "react-router"
import { Register } from "../Register/Register"

export const Body: React.FC = (): JSX.Element => {
    return (
        <Routes>
            <Route path="/" element={<Register />} />
        </Routes>

    )
}