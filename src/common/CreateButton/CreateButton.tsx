
interface CreateButtonProps {
    className: string;
    text: string;
    action: () => void;
}

export const CreateButton: React.FC<CreateButtonProps> = ({className = "default-create-button", text="+", action}): JSX.Element => {
    return (
        <div className={className} onClick={action}>
            {text}
        </div>
    )
}