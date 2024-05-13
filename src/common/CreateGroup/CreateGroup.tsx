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
            // TODO implement optimistic update
            // queryClient.setQueryData<Group[]>('groups', (old = []) => [...old, response.data]);
            // queryClient.setQueryData<Group[][]>('groups', (old = []) => {
            //     let newPage;
            //     if (!Array.isArray(old) || old.length === 0) {
            //         newPage = [response.data];
            //     } else {
            //         newPage = [...old[old.length - 1], response.data];
            //     }
            //     return [...old.slice(0, -1), newPage];
            // });
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
                {/* <input type="text" placeholder="Group Name" /> */}
                {/* <input type="text" placeholder="Group Level" /> */}
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
                {/* <button onClick={() => setIsOpenCreate(false)}>Cancel</button> */}
                <CButton
                    title="Cancel"
                    onClickFunction={() => setDisplayed("groups")}
                />
            </div>
        </div>
    )
}