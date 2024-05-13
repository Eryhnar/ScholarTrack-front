import "./ChooseCreate.css"
import { ReactNode, useEffect, useRef } from "react"

export interface ChooseCreateProps {
    className?: string
    closeFunction: () => void
    children: ReactNode;
}

export const ChooseCreate: React.FC<ChooseCreateProps> = (
    {
        className = "default-choose-create",
        closeFunction,
        children
    }
): JSX.Element => {
    const menuRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const closeMenu = (event: MouseEvent) => {
            if (event.target instanceof HTMLElement && event.target.id === "GroupDetail-create-button") {
                return;
            }

            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeFunction()
            }
        }

        window.addEventListener('click', closeMenu)

        return () => {
            window.removeEventListener('click', closeMenu)
        }
    }, [])

    return (
        <div className={className} ref={menuRef}>

            <div className="create-button-menu">
                {children}
                <div onClick={closeFunction}><span className="material-symbols-outlined default-nav-button">
                    close
                </span></div>
            </div>
        </div>
    )
}