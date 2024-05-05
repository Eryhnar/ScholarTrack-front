import { CButton } from "../CButton/CButton";

interface ModalProps {
  title?: string;
  description: string;
  action: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

export const Modal: React.FC<ModalProps> = ({ title="", description, action, setIsOpen }): JSX.Element => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h1>{title}</h1>
                <p>{description}</p>
                <div className="modal-buttons">
                    <CButton 
                        title="Yes" 
                        onClickFunction={action} 
                    />
                    <CButton 
                        title="No" 
                        onClickFunction={() => setIsOpen(false)}
                    />
                </div>
            </div>
        </div>
    )
}

