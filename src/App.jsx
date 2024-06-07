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
import CartDetail from "./components/CartDetail";
import HistoryOrder from "./views/pages/admin/HistoryOrder";
import Protected from "./utils/Protected";
import UserProfile from "./views/pages/UserProfle";
import ProductByBrand from "./views/pages/ProductByBrand";
import ProductByCategory from "./views/pages/ProductByCategory";
import PromotionDetail from "./views/pages/PromtionDetail";
import Promotion from "./views/pages/admin/Promotion";
import {
	ProtectedRouteAdmin,
	ProtectedRouteUser,
} from "./utils/ProtectedRoute";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./app/slice";

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	//* Get User
	const dispatch = useDispatch();
	const currentUserRole = useSelector((state) => state.user.currentUser);
	useEffect(() => {
		if (!currentUserRole) {
			dispatch(getCurrentUser());
		}
	}, [dispatch, currentUserRole]);

	useEffect(() => {
		if (currentUserRole) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, [currentUserRole]);

	return (
		<Router>
			<Routes>
				{/** Client View */}
				<Route element={<AppLayout />}>
					<Route path="*" element={<PageNotFound />} />
					<Route path="/" element={<Home />} />

					<Route path="/shop" element={<Shopping />} />

					<Route path="/product/brand_id" element={<ProductByBrand />}>
						<Route path=":brandID" element={<ProductByBrand />} />
					</Route>
					<Route path="/product/category_id" element={<ProductByCategory />}>
						<Route path=":categoryId" element={<ProductByCategory />} />
					</Route>

					<Route path="/productdetail" element={<ProductDetail />}>
						<Route path=":productID" element={<ProductDetail />} />
					</Route>

					<Route path="/promotion/detail" element={<PromotionDetail />}>
						<Route path=":promotionID" element={<PromotionDetail />} />
					</Route>

					<Route path="/contact" element={<Contact />} />
					<Route path="/protected" element={<Protected />} />

					<Route element={<ProtectedRouteUser isLogIn={isLoggedIn} />}>
						<Route path="/cart" element={<Cart />} />
						<Route path="/cart_detail" element={<CartDetail />} />
						<Route path="/payment" element={<Payment />} />
						<Route path="/history_order" element={<HistoryOrder />} />
						<Route path="/user_profile" element={<UserProfile />} />
					</Route>
				</Route>

				{/** Authentication */}
				<Route path="/login" element={<SignIn />} />
				<Route path="/auth/google" element={<GoogleLogin />} />
				<Route path="/auth/facebook" element={<FacebookLogin />} />
				<Route path="/signup" element={<SignUp />} />

				{/** Admin View  and route protected*/}
				<Route element={<ProtectedRouteAdmin isLogIn={isLoggedIn} />}>
					<Route path="/admin" element={<Admin />}>
						<Route path="/admin/dashboard" element={<DashBoard />} />
						<Route path="/admin/approve_order" element={<ApproveOrder />} />
						<Route path="/admin/product_crud" element={<ProductCrud />} />
						<Route path="/admin/profile" element={<AdminProfile />} />
						<Route path="/admin/add_category" element={<AddingCategory />} />
						<Route path="/admin/promotion" element={<Promotion />} />
					</Route>
				</Route>
			</Routes>
		</Router>
	);
}
