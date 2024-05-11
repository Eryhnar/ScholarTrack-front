import "./ChooseCreate.css"
// import { CButton } from "../CButton/CButton"
import { ReactNode, useEffect, useRef } from "react"

export interface ChooseCreateProps {
    className?: string
    // anchor: string
    // id: string
    // popover: "popover" | null
    closeFunction: () => void
    children: ReactNode;
}

export const ChooseCreate: React.FC<ChooseCreateProps> = (
    {
        className = "default-choose-create",
        // anchor,
        // id,
        // popover
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
            {/* <CButton
                title="Close"
                onClickFunction={() => closeFunction()}
            /> */}
            <div onClick={closeFunction}><span className="material-symbols-outlined">
                close
            </span></div>
            {/* <CButton
                title="Create Task"
                onClickFunction={() => console.log("Create Task")}
            />
            <CButton
                title="Create Attendance"
                onClickFunction={() => console.log("Create Attendance")}
            />
            <CButton
                title="Create Student"
                onClickFunction={() => console.log("Create Student")}
            /> */}
            {children}
        </div>
    )
}