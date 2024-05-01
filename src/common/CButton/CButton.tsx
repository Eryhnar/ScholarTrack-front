import "./CButton.css"

interface CButtonProps {
    className?: string
    title: string
    onClickFunction: () => void
}

export const CButton: React.FC<CButtonProps> = ({
    className = "default-custom-button",
    title,
    onClickFunction,
}: CButtonProps): JSX.Element => {
    return (
        <div className={className} onClick={onClickFunction}>
            {title}
        </div>
    )
}