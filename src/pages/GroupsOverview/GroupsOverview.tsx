import { CreateButton } from "../../common/CreateButton/CreateButton"
import "./GroupsOverview.css"

export const GroupsOverview: React.FC = (): JSX.Element => {
    return (
        <div className="groups-overview-design">
            <CreateButton />
            {/* <h1>Groups Overview</h1> */}
            <div className="groups-overview-wrapper">
                <div className="groups-overview-group ">
                    <h2>Group 1</h2>
                    <p>Group 1 Description</p>
                </div>
                <div className="groups-overview-group ">
                    <h2>Group 2</h2>
                    <p>Group 2 Description</p>
                </div>
                <div className="groups-overview-group ">
                    <h2>Group 3</h2>
                    <p>Group 3 Description</p>
                </div>
                <div className="groups-overview-group ">
                    <h2>Group 4</h2>
                    <p>Group 4 Description</p>
                </div>
                <div className="groups-overview-group ">
                    <h2>Group 3</h2>
                    <p>Group 3 Description</p>
                </div>
                <div className="groups-overview-group ">
                    <h2>Group 4</h2>
                    <p>Group 4 Description</p>
                </div>
                <div className="groups-overview-group ">
                    <h2>Group 3</h2>
                    <p>Group 3 Description</p>
                </div>
                <div className="groups-overview-group ">
                    <h2>Group 4</h2>
                    <p>Group 4 Description</p>
                </div>
            </div>
        </div>
    )
}