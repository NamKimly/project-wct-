import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
	return (
		<>
			<div className="flex flex-col h-screen">
				<Header />
				<Outlet />
				<Footer />
			</div>
		</>
	);
}
