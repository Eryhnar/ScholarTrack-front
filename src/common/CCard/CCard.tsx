
interface CCardProps {
    className?: string
    title: string
    content: any
    image?: string
}

export const CCard: React.FC<CCardProps> = ({
    className = "default-custom-card",
    title,
    content,
    image
}: CCardProps): JSX.Element => {
    return (
        <div className={className}>
            <h2>{title}</h2>
            {image && <img src={image} alt="image not found" />}
            <div>{content}</div>
        </div>
    )
}