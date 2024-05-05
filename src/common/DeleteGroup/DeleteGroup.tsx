import { useMutation } from "react-query";
import { Displayed } from "../../pages/GroupsOverview/GroupsOverview";
import { DeleteGroupResponse, Group, deleteGroupService } from "../../services/apicalls";
import { CButton } from "../CButton/CButton";

interface DeleteGroupComponentProps {
    token: string;
    group: Group;
    setDisplayed: (displayed: Displayed) => void;
    setErrorMsg: (errorMsg: { serverError: { message: string, success: boolean } }) => void;
}

export const DeleteGroup: React.FC<DeleteGroupComponentProps> = ({ token, group, setDisplayed, setErrorMsg }): JSX.Element => {
    const mutation = useMutation(deleteGroupService, {
        onSuccess: (response: DeleteGroupResponse) => {
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

    const deleteGroup = async () => {
        mutation.mutate({ token, groupId: group._id });
    }

    return (
        <div className="groups-overview-create">
            <div className="groups-overview-create-form">
                <h1>Are you sure you want to delete the group {group.name}?</h1>
                <div className="groups-overview-create-form-buttons">
                    <CButton
                        title="Yes"
                        onClickFunction={deleteGroup}
                    />
                    <CButton
                        title="No"
                        onClickFunction={() => setDisplayed("groups")}
                    />
                </div>
            </div>
        </div>
    )
}