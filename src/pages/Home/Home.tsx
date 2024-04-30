
import { NavButton } from "../../common/NavButton/NavButton";
import "./Home.css";

export const Home: React.FC = (): JSX.Element => {
    return (
        <div className="home-design">
            <div className="home-button-wrapper">
                <NavButton className="home-button" title="Register" path="/register" />
                <NavButton className="home-button" title="Register" path="/register" />
                <NavButton className="home-button" title="Register" path="/register" />
                <NavButton className="home-button" title="Settings" path="/settings" />
            </div>
        </div>
    )
}