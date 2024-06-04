import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./../app/slice";
import { useState, useEffect } from "react";
import DisplayLoading from "../components/DisplayLoading";

function ProtectedRoute({ isLogIn, requiredRole, redirectPath }) {
	const [userRole, setUserRole] = useState(null);
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		const fetchUser = async () => {
			if (!currentUser) {
				await dispatch(getCurrentUser());
			}
			setLoading(false);
		};
		fetchUser();
	}, [dispatch, currentUser]);

	useEffect(() => {
		if (currentUser) {
			setUserRole(currentUser.role);
		} else {
			setUserRole(null);
		}
	}, [currentUser]);

	if (loading) {
		return <DisplayLoading />;
	}

	return (
		<>
			{isLogIn && userRole === requiredRole ? (
				<Outlet />
			) : (
				<Navigate to={redirectPath} />
			)}
		</>
	);
}

export function ProtectedRouteAdmin({ isLogIn }) {
	return (
		<ProtectedRoute
			isLogIn={isLogIn}
			requiredRole="admin"
			redirectPath="/protected"
		/>
	);
}

export function ProtectedRouteUser({ isLogIn }) {
	return (
		<ProtectedRoute
			isLogIn={isLogIn}
			requiredRole="customer"
			redirectPath="/login"
		/>
	);
}
