import "./NavButton.css"
import { useNavigate } from "react-router-dom"

interface NavButtonProps {
    className?: string,
    title: string,
    path: string,
    state?: any
}

export const NavButton: React.FC<NavButtonProps> = ({
    className= "default-nav-button", 
    title="Button", 
    path,
    state
}): JSX.Element => {
    const navigate = useNavigate()
    return (
        <div className={className} onClick={() => navigate(path, { state })}>
            {title}
        </div>
    )
}