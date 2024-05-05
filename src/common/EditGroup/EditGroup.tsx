import { useState } from "react";
import { CButton } from "../CButton/CButton"
import { CInput } from "../CInput/CInput"
import { Group } from "../../services/apicalls";

interface EditGroupComponentProps {
    token: string;
    group: Group;
    setDisplayed: (displayed: "groups" | "createGroup" | "editGroup" | "deleteGroup") => void;
    setErrorMsg: (errorMsg: { serverError: { message: string, success: boolean } }) => void;
}

export const EditGroup: React.FC<EditGroupComponentProps> = ({ token, group, setDisplayed, setErrorMsg }): JSX.Element => {
    const [editGroup, setEditGroup] = useState({
        name: "",
        level: ""
    })

    const editGroupInputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEditGroup({
            ...editGroup,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="groups-overview-create">
            <div className="groups-overview-create-form">
                <CInput
                    type="text"
                    placeholder="Group Name"
                    name="name"
                    value={editGroup.name || ""}
                    onChangeFunction={editGroupInputHandler}
                />
                <CInput
                    type="text"
                    placeholder="Group Level"
                    name="level"
                    value={editGroup.level || ""}
                    onChangeFunction={editGroupInputHandler}
                />
                <CButton
                    title="Save"
                    onClickFunction={() => console.log("Save")}
                />
                <CButton
                    title="Cancel"
                    onClickFunction={() => setDisplayed("groups")}
                />
            </div>
        </div>
    )
}