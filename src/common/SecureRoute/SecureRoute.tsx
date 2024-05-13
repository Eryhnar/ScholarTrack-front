import { useSelector } from "react-redux";
import { selectUser } from "../../app/slices/userSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// const enum ProtMode {
//     allowLoggedIn = 'allow-logged-in',
//     allowLoggedOut = 'allow-logged-out',
//     allowLoggedInAdmin = 'allow-logged-in-admin'
// }

// interface SecureRouteProps {
//     protMode: ProtMode;
// }

type ProtMode = 'allow-logged-in' | 'allow-logged-out' | 'allow-logged-in-admin';

interface SecureRouteProps {
    protMode: ProtMode;
}

export const SecureRoute: React.FC<SecureRouteProps> = ({ protMode }: SecureRouteProps): JSX.Element => {
    const { credentials: { token, user } } = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        switch (protMode) {
            case 'allow-logged-in':
                if (!token) {
                    navigate('/login');
                }
                break;
            case 'allow-logged-out':
                if (token) {
                    navigate('/');
                }
                break;
            case 'allow-logged-in-admin':
                if (!token || !user.role.includes('admin')) {
                    navigate('/');
                }
                break;
        }
    }, [protMode, user, token]);

    return <Outlet />;
}