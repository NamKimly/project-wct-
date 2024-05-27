import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./../app/slice";
import { useState, useEffect } from "react";
import DisplayLoading from "../components/DisplayLoading";

export function ProtectedRouteAdmin({ isLogIn }) {
	const [getUser, setGetUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();
	const currentUserRole = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		const fetchUser = async () => {
			if (!currentUserRole) {
				await dispatch(getCurrentUser());
			}
			setLoading(false);
		};
		fetchUser();
	}, [dispatch, currentUserRole]);

	useEffect(() => {
		if (currentUserRole) {
			setGetUser(currentUserRole.role);
		} else {
			setGetUser(null);
		}
	}, [currentUserRole]);

	console.log(getUser);

	if (loading) {
		return <DisplayLoading />;
	}

	return (
		<>
			{isLogIn && getUser === "admin" ? (
				<Outlet />
			) : (
				<Navigate to="/protected" />
			)}
		</>
	);
}
export function ProtectedRouteUser({ isLogIn }) {
	return <>{isLogIn ? <Outlet /> : <Navigate to={"/login"} />}</>;
}
