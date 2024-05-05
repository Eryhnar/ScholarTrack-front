import { CButton } from "../CButton/CButton";

interface ModalProps {
  title?: string;
  description: string;
  action: () => void;
  setIsOpenModal: (isOpen: boolean) => void;
  setErrorMsg: (errorMsg: { serverError: { message: string, success: boolean } }) => void;
}

export const Modal: React.FC<ModalProps> = ({ title="", description, action, setIsOpenModal, setErrorMsg }): JSX.Element => {
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
                        onClickFunction={() => setIsOpenModal(false)}
                    />
                </div>
            </div>
        </div>
    )
}

