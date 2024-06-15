import Cart from "./../components/Cart";
import Mailing from "../views/pages/Mailing";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { logout } from "./../app/slice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./../app/slice";
import authToken from "../utils/authToken";

export default function HeaderLogin() {
	//* Get JWT token
	const token = authToken();
	const localCartItems = JSON.parse(localStorage.getItem("cart_items")) || [];

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [openCart, setOpenCart] = useState(false);
	const [openMail, setOpenMail] = useState(false);

	const [isOpen, setIsOpen] = useState(false);
	const [cartQuantity, setCartQuantity] = useState(null);
	const [mail, setMail] = useState(null);
	const dispatch = useDispatch();

	//* Access currentUser from the auth slice via token
	const currentUser = useSelector((state) => state.user.currentUser);

	useEffect(() => {
		dispatch(getCurrentUser());
	}, [dispatch]);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleCart = () => {
		setOpenCart(!openCart);
	};
	const handleMail = () => {
		setOpenMail(!openMail);
	};

	//* Get the Cart quantity
	const fetchCart = useCallback(async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			setCartQuantity(response.data.cart.items.length);
		} catch (err) {
			console.log(err.message);
		}
	}, [token]);

	useEffect(() => {
		fetchCart();
	}, [fetchCart]);

	const fetchPedingOrder = useCallback(async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/orders/user/${currentUser?.id}`,
				{
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const getOrder = response.data.orders;
			const pendingOrders = getOrder.filter(
				(order) => order.status === "pending"
			);
			const numberOfPendingOrder = pendingOrders.length;
			setMail(numberOfPendingOrder);
		} catch (err) {
			console.log(err.message);
		}
	}, [token, currentUser?.id]);

	useEffect(() => {
		fetchPedingOrder();
	}, [fetchPedingOrder]);

	const handleCartUpdate = useCallback(() => {
		fetchCart();
	}, []);

	const handleMailUpdate = useCallback(() => {
		fetchPedingOrder();
	}, []);

	return (
		<header className="navbar bg-white  mb-8">
			<nav
				className="mx-12 flex max-w-8xl items-center justify-between p-6 lg:px-5"
				aria-label="Global">
				<div className="flex lg:flex-1">
					<a href="#" className="-m-1.5 p-1.5">
						<div className="flex justify-center items-center h-1">
							<span className="text-red-600 font-extrabold text-3xl uppercase tracking-wider">
								Electronic
							</span>
						</div>
					</a>
				</div>

				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-black"
						onClick={() => setMobileMenuOpen(true)}>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>

				<Popover.Group className="hidden lg:flex lg:gap-x-12  justify-center items-center">
					<Link to={"/"} className="text-sm font-semibold leading-6 text-black">
						Home
					</Link>
					<Link
						to={"/shop"}
						className="text-sm font-semibold leading-6 text-black">
						Shop
					</Link>
					<a href="#" className="text-sm font-semibold leading-6 text-black">
						About
					</a>
					<Link
						to={"/contact"}
						className="text-sm font-semibold leading-6 text-black">
						Contact
					</Link>
					<div className="relative w-96">
						<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
							<svg
								className="w-4 h-4 text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 20 20">
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
								/>
							</svg>
						</div>
						<input
							type="search"
							id="default-search"
							className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search..."
							required
						/>
					</div>
					<div className="flex justify-center items-center gap-4">
						<a
							href="#"
							className="flex justify-center items-center text-sm font-semibold leading-6 text-black">
							<div className="text-center bg-red-500 w-4 text-white text-xs rounded-full">
								{cartQuantity > 0 ? (
									<p> {cartQuantity}</p>
								) : (
									<p> {localCartItems.length}</p>
								)}
							</div>
							<i
								onClick={handleCart}
								className={` ${
									currentUser?.role === "admin"
										? "fa-solid fa-cart-shopping text-lg cursor-not-allowed"
										: "fa-solid fa-cart-shopping text-lg"
								}`}></i>
						</a>
						{openCart && currentUser?.role !== "admin" && (
							<Cart onCartUpdate={handleCartUpdate} />
						)}
					</div>
					<div className="flex justify-center items-center">
						<div className="text-center bg-red-500 w-4 text-white text-xs rounded-full">
							{mail > 0 && <p>{mail}</p>}
						</div>
						<i
							onClick={handleMail}
							className="fa-solid fa-envelope text-lg cursor-pointer"></i>
						{openMail && currentUser?.role !== "admin" && (
							<Mailing onMailUpdate={handleMailUpdate} />
						)}
					</div>
					<div className="flex justify-center items-center">
						<div className="relative">
							<img
								className="h-8 w-8 rounded-full object-cover cursor-pointer"
								src={
									currentUser.avatar
										? currentUser.avatar
										: "https://static-00.iconduck.com/assets.00/user-avatar-icon-512x512-vufpcmdn.png"
								}
								alt="*"
								onClick={toggleDropdown}
							/>
							{isOpen && <DropdownIcons isOpen={isOpen} />}
							<div className="absolute  rounded-full shadow-inner"></div>
						</div>
						<div className="ml-4">
							<h2 className="font-bold text-gray-800 text-sm">
								{currentUser.name}
							</h2>
							<p className="text-sm text-gray-600 uppercase">
								{currentUser.role}
							</p>
						</div>
					</div>
				</Popover.Group>
			</nav>

			{/* Mobile View  */}

			<Dialog
				as="div"
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<a href="#" className="-m-1.5 p-1.5">
							<div className="flex justify-center items-center h-1 bg-black">
								<span className="text-red-600 font-extrabold text-3xl uppercase tracking-wider">
									Electronic
								</span>
							</div>
						</a>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-white"
							onClick={() => setMobileMenuOpen(false)}>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								<div className="flex justify-start items-start gap-4">
									<i className="fa-solid fa-magnifying-glass text-white absolute p-2.5"></i>
									<input
										type="search"
										id="default-search"
										className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="Search..."
										required
									/>
								</div>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white ">
									Home
								</a>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white ">
									Brand
								</a>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white ">
									About
								</a>
								<a
									href="#"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white ">
									Contact
								</a>
							</div>
							<div className=" flex justify-start items-start gap-8">
								<button
									type="button"
									className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
									Log Out
								</button>
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	);
}

function DropdownIcons({ isOpen }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogOut = () => {
		dispatch(logout());
		localStorage.clear();
		navigate("/");
		console.log("logout");
	};

	return (
		<div className="absolute z-50 flex items-center justify-center">
			<div className="w-52">
				<div
					id="dropdown-menu"
					className={`absolute flex  justify-start items-start  flex-col mt-2.5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1 ${
						isOpen ? "" : "hidden"
					}`}>
					{/* Dropdown content goes here */}
					<Link
						to="/user_profile"
						className="block w-full text-sm mt-2 px-5 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
						My Profile
					</Link>
					<Link
						to="/cart_detail"
						className="block w-full text-sm px-5 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
						Shopping Cart
					</Link>

					<Link
						to="/history_order"
						className="block w-full text-sm px-5 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
						History Order
					</Link>

					<div className="flex justify-center items-center p-2">
						<button
							onClick={handleLogOut}
							type="button"
							className="flex justify-center items-center gap-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
							<i className="fa-solid fa-arrow-right-from-bracket"></i>
							Log Out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
