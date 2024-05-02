import { useState } from "react"
import { CreateButton } from "../../common/CreateButton/CreateButton"
import "./GroupsOverview.css"

export const GroupsOverview: React.FC = (): JSX.Element => {
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    return (
        <div className="groups-overview-design">
            {/* <h1>Groups Overview</h1> */}
            <CreateButton action={() => setIsOpenCreate(true)} />
            <div className="groups-overview-wrapper">
                {isOpenCreate ?
                    <div className="groups-overview-create">
                        <div className="groups-overview-create-form">
                            <input type="text" placeholder="Group Name" />
                            <input type="text" placeholder="Group Description" />
                            <button>Create</button>
                            <button onClick={() => setIsOpenCreate(false)}>Cancel</button>
                        </div>
                    </div>
                    :
                    <>
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
                    </>
                }
            </div>
        </div>
    )
}