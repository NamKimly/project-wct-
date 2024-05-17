import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLayout from "./views/applayout/AppLayout";
import Home from "./views/pages/Home";
import ProductDetail from "./views/pages/ProductDetail";
import Shopping from "./views/pages/Shopping";
import PageNotFound from "./components/PageNotFound";
import Contact from "./views/pages/Contact";
import Admin from "./views/pages/admin/Admin";
import SignUp from "./views/pages/auth/SignUp";
import SignIn from "./views/pages/auth/SignIn";
import Cart from "./components/Cart";
import Payment from "./views/pages/Payment";
import GoogleLogin from "./views/pages/auth/GoogleLogin";
import FacebookLogin from "./views/pages/auth/FacebookLogin";
import DashBoard from "./views/pages/admin/DashBoard";
import ApproveOrder from "./views/pages/admin/ApproveOrder";
import ProductCrud from "./views/pages/admin/ProductCrud";
import AdminProfile from "./views/pages/admin/AdminProfile";
import AddingCategory from "./views/pages/admin/AddingCategory";

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
				<Route path="/auth/google" element={<GoogleLogin />} />
				<Route path="/auth/facebook" element={<FacebookLogin />} />
				<Route path="/signup" element={<SignUp />} />

				<Route path="/cart" element={<Cart />} />
				<Route path="/admin" element={<Admin />}>
					<Route path="/admin/dashboard" element={<DashBoard />} />
					<Route path="/admin/approve_order" element={<ApproveOrder />} />
					<Route path="/admin/product_crud" element={<ProductCrud />} />
					<Route path="/admin/profile" element={<AdminProfile />} />
					<Route path="/admin/add_category" element={<AddingCategory />} />
				</Route>
			</Routes>
		</Router>
	);
}
