
import { NavButton } from "../../common/NavButton/NavButton";
import "./Home.css";

export const Home: React.FC = (): JSX.Element => {
    return (
        <div className="home-design">
            <div className="home-button-wrapper">
                <NavButton className="home-button" title="CALENDAR (Comming soon)" path={"/register"} />
                <NavButton className="home-button" title="GROUPS" path={"/groups"} />
                <NavButton className="home-button" title="CHAT (Comming soon)" path={"/register"} />
                <NavButton className="home-button" title="SETTINGS" path={"/settings"} />
            </div>
        </div>
    )
}