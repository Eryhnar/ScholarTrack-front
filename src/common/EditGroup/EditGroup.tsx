import { useState } from "react";
import { CButton } from "../CButton/CButton"
import { CInput } from "../CInput/CInput"
import { EditGroupResponse, Group, editGroupService } from "../../services/apicalls";
import { useMutation } from "react-query";
import { Displayed } from "../../pages/GroupsOverview/GroupsOverview";

interface EditGroupComponentProps {
    token: string;
    group: Group;
    setDisplayed: (displayed: Displayed) => void;
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

    const mutation = useMutation(editGroupService, {
        onSuccess: (response: EditGroupResponse) => {
            setErrorMsg({
                serverError: { message: response.message, success: true }
            });
            setDisplayed("groups");
        },
        onError: (error: any) => {
            setErrorMsg({
                serverError: { message: error.message, success: false }
            });
        }
    })

    const saveEditGroup = async () => {
        mutation.mutate({ token, groupId: group._id, editGroup });
    }

    return (
        <div className="groups-overview-create">
            <div className="groups-overview-create-form">
                <CInput
                    type="text"
                    placeholder={group.name}
                    name="name"
                    value={editGroup.name || ""}
                    onChangeFunction={editGroupInputHandler}
                />
                <CInput
                    type="text"
                    placeholder={group.level}
                    name="level"
                    value={editGroup.level || ""}
                    onChangeFunction={editGroupInputHandler}
                />
                <CButton
                    title="Save"
                    onClickFunction={saveEditGroup}
                />
                <CButton
                    title="Cancel"
                    onClickFunction={() => setDisplayed("groups")}
                />
            </div>
        </div>
    )
}