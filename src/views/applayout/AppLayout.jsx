import Header from "../../components/Header";
import HeaderLogin from "../../components/HeaderLogin";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./../../app/slice";

export default function AppLayout() {
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	const currentUser = useSelector((state) => state.user.currentUser);

	/**
	 **If the token is expired return to login page
	 ** On Consideration
	 * **/
	// useEffect(() => {
	// 	const user_token = localStorage.getItem("token");

	// 	if (!user_token) {
	// 		navigate("/login");
	// 	} else {
	// 		const tokenExpirationTimeout = setTimeout(() => {
	// 			localStorage.removeItem("token");
	// 		}, 3600000);

	// 		localStorage.setItem("tokenExpirationTimeout", tokenExpirationTimeout);
	// 	}
	// }, [navigate]);

	//* Access currentUser from the auth slice
	useEffect(() => {
		if (!currentUser) {
			dispatch(getCurrentUser());
		}
	}, [dispatch, currentUser]);
	return (
		<>
			<div className="flex flex-col h-screen">
				{currentUser ? <HeaderLogin /> : <Header />}
				<Outlet />
				<Footer />
			</div>
		</>
	);
}
