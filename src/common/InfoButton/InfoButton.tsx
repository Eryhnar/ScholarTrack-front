import { useState } from "react";
import "./InfoButton.css";

interface InfoButtonProps {
    className?: string;
    infoClassName?: string;
    title?: string;
    info: string;
}

export const InfoButton: React.FC<InfoButtonProps> = ({
    className = "default-custom-info-button",
    infoClassName = "default-custom-info",
    title = "i",
    info,
}: InfoButtonProps): JSX.Element => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className={className} onClick={() => setShowInfo(!showInfo)} onMouseEnter={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)}>
            <div >{title}</div>
            {showInfo && <div className={infoClassName}>{info}</div>}
        </div>
    )
}