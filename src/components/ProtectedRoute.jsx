import { Navigate, Outlet } from "react-router-dom";
import { obtenerToken } from "../api/auth";

function ProtectedRoute() {
	const token = obtenerToken();

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
}

export default ProtectedRoute;
