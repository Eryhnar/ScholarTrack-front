import "./CButton.css"

interface CButtonProps {
    className?: string
    title: string
    onClickFunction: (event?: React.MouseEvent) => void
}

export const CButton: React.FC<CButtonProps> = ({
    className = "default-custom-button",
    title,
    onClickFunction,
}: CButtonProps): JSX.Element => {
    return (
        <div className={className} onClick={(event) => onClickFunction(event)}>
            {title}
        </div>
    )
}