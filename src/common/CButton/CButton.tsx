// import "./CButton.css"

interface CButtonProps {
    className?: string
    title: string
    onClickFunction: () => void
}

"default-custom-button"

export const CButton = ({
    className = "default-custom-button",
    title,
    onClickFunction,
}: CButtonProps) => {
    return (
        <div className={className} onClick={onClickFunction}>
            {title}
        </div>
    )
}