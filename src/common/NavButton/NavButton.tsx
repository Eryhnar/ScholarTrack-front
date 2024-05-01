import { useNavigate } from "react-router-dom"

interface NavButtonProps {
    className?: string,
    title: string,
    path: string
}

export const NavButton: React.FC<NavButtonProps> = ({
    className= "default-nav-button", 
    title="Button", 
    path="/"
}): JSX.Element => {
    const navigate = useNavigate()
    return (
        <div className={className} onClick={() => navigate(path)}>
            {title}
        </div>
    )
}