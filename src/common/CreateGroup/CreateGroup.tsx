import "./CreateGroup.css"
import { useMutation } from "react-query"
import { CButton } from "../CButton/CButton"
import { CInput } from "../CInput/CInput"
import { CreateGroupResponse, createGroupService } from "../../services/apicalls"
import { useState } from "react"
import { Displayed } from "../../pages/GroupsOverview/GroupsOverview"

interface CreateGroupComponentProps {
    token: string;
    setDisplayed: (displayed: Displayed) => void;
    setErrorMsg: (errorMsg: { serverError: { message: string, success: boolean } }) => void;
}

export const CreateGroup: React.FC<CreateGroupComponentProps> = ({token, setDisplayed, setErrorMsg}): JSX.Element => {

    const [newGroup, setNewGroup] = useState({
        name: "",
        level: ""
    })

    const newGroupInputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewGroup({
            ...newGroup,
            [e.target.name]: e.target.value
        })
    }

    const mutation = useMutation(createGroupService,  {
        onSuccess: (response: CreateGroupResponse) => {
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

    const saveNewGroup = async () => {
        mutation.mutate({token, newGroup});
    }

    return (
        <div className="groups-overview-create-design">
            <div className="groups-overview-create-wrapper">
                <h1>Create Group</h1>
                <CInput
                    type="text"
                    placeholder="Group Name"
                    name="name"
                    value={newGroup.name || ""}
                    onChangeFunction={newGroupInputHandler}
                />
                <CInput
                    type="text"
                    placeholder="Group Level"
                    name="level"
                    value={newGroup.level || ""}
                    onChangeFunction={newGroupInputHandler}
                />
                <CButton
                    title="Create"
                    onClickFunction={saveNewGroup}
                />
                <CButton
                    title="Cancel"
                    onClickFunction={() => setDisplayed("groups")}
                />
            </div>
        </div>
    )
}