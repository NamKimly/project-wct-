import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLayout from "./views/applayout/AppLayout";
import Home from "./views/pages/Home";
import Shopping from "./views/pages/Shopping";
import PageNotFound from "./components/PageNotFound";
import Admin from "./views/pages/admin/Admin";
export default function App() {
	return (
		<Router>
			<Routes>
				<Route element={<AppLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="/shop" element={<Shopping />} />
					<Route path="*" element={<PageNotFound />} />
				</Route>

				<Route path="/admin" element={<Admin />} />
			</Routes>
		</Router>
	);
}
