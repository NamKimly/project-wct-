import Header from "../../components/Header";
import HeaderLogin from "../../components/HeaderLogin";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./../../app/slice";

export default function AppLayout() {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user.currentUser); // Access currentUser from the auth slice
	console.log(currentUser);
	useEffect(() => {
		dispatch(getCurrentUser());
	}, [dispatch]);
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
