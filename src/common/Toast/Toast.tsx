import { useEffect, useState } from "react";

interface ToastProps {
    message: string;
    success: boolean;
    time: number;
    resetServerError: () => void;
}

export const Toast: React.FC<ToastProps> = ({
    message,
    success,
    time,
    resetServerError,
}: ToastProps): JSX.Element | null => {

    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpen(false);
            resetServerError();
        }, time);

        return () => clearTimeout(timer);
    }, [time, resetServerError, message]);

    return (
        isOpen ? (
            <div className="default-toast">
                <p>{message}</p>
                <div className="default-toast-wrapper">
                    <div
                        className={success ? "toast-progress-success" : "toast-profress-failure"}
                        style={{ animationDuration: `${time || 4000}ms`}}>
                    </div>
                </div>
            </div>
        ) : null
    );
};