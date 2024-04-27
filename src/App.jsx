import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLayout from "./views/applayout/AppLayout";
import Home from "./views/pages/Home";
import ProductDetail from "./views/pages/ProductDetail";
import Shopping from "./views/pages/Shopping";
import PageNotFound from "./components/PageNotFound";
import Contact from "./views/pages/Contact";
import Admin from "./views/pages/admin/Admin";
import SignUp from "./views/pages/SignUp";
import SignIn from "./views/pages/SignIn";
import Cart from "./components/Cart";
import Payment from "./views/pages/Payment";

export default function App() {
	return (
		<Router>
			<Routes>
				<Route element={<AppLayout />}>
					<Route path="/" element={<Home />} />
					<Route path="*" element={<PageNotFound />} />
					<Route path="/shop" element={<Shopping />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/payment" element={<Payment />} />
					<Route path="/productdetail" element={<ProductDetail />} />
				</Route>

				<Route path="/login" element={<SignIn />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>
		</Router>
	);
}
