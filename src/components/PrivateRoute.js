import { Navigate } from 'react-router-dom';
import service from '../api/service';

export default function PrivateRoute({ children, roles }) {
    const user = service.auth.getCurrentUser();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/" />;
    }

    return children;
}
