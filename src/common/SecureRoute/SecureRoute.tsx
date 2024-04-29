import { useSelector } from "react-redux";
import { selectUser } from "../../app/slices/userSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const enum ProtMode {
    allowLoggedIn = 'allow-logged-in',
    allowLoggedOut = 'allow-logged-out',
    allowLoggedInAdmin = 'allow-logged-in-admin'
}

interface SecureRouteProps {
    protMode: ProtMode;
}

export const SecureRoute: React.FC<SecureRouteProps> = ({ protMode }: SecureRouteProps): JSX.Element => {
    const { credentials: { token, user } } = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        switch (protMode) {
            case ProtMode.allowLoggedIn:
                if (!token) {
                    navigate('/');
                }
                break;
            case ProtMode.allowLoggedOut:
                if (token) {
                    navigate('/');
                }
                break;
            case ProtMode.allowLoggedInAdmin:
                if (!token || !user.role.includes('admin')) {
                    navigate('/');
                }
                break;
        }
    }, [protMode, user, token]);

    return <Outlet />;
}