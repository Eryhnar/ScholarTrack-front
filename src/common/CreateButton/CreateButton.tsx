import "./CreateButton.css"

interface CreateButtonProps {
    className?: string;
    text?: string;
    id?: string;
    action: () => void;
}

export const CreateButton: React.FC<CreateButtonProps> = ({className = "default-create-button", text="+", id, action}): JSX.Element => {
    return (
        <div className={className} id={id} onClick={action}>
            {text}
        </div>
    )
}