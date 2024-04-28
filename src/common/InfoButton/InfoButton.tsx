import { useState } from "react";

interface InfoButtonProps {
    className?: string;
    title?: string;
    info: string;
}

export const InfoButton = ({
    className = "default-custom-button",
    title = "i",
    info,
}: InfoButtonProps) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className={className}>
            <div onClick={() => setShowInfo(!showInfo)} onMouseEnter={() => setShowInfo(true)} onMouseLeave={() => setShowInfo(false)}>{title}</div>
            {showInfo && <div>{info}</div>}
        </div>
    )
}