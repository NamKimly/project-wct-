/* eslint-disable no-mixed-spaces-and-tabs */
import authToken from "./../utils/authToken";
import getCurrentUser from "./../utils/getCurrentUser";
import axios from "axios";
import { Fragment, useState, useEffect, useCallback } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { finalPrice } from "./../utils/DiscountFunction";

export default function Cart({ onCartUpdate }) {
	let token = authToken();
	const currentUser = getCurrentUser();
	const [open, setOpen] = useState(true);

	//* Cart
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0); // Set initial state to 0

	//*Sum Items for guest users

	//* Fetching data from cart
	const fetchCart = useCallback(async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			setCartItems(response.data.cart.items);
			setTotalPrice(response.data.cart.totalCartPrice);
			onCartUpdate();
		} catch (err) {
			console.error("Error fetching cart:", err.message);
		}
	}, [token, onCartUpdate]);

	useEffect(() => {
		if (!currentUser) {
			const localCartItems =
				JSON.parse(localStorage.getItem("cart_items")) || [];
			setCartItems(localCartItems);

			// Calculate total price for local cart items
			const totalLocalPrice = localCartItems.reduce((total, item) => {
				const itemTotal = item.discount
					? item.price * item.quantity * (1 - item.discount.percentage / 100)
					: item.price * item.quantity;
				return total + itemTotal;
			}, 0);
			setTotalPrice(totalLocalPrice);
		}
	}, [currentUser]);

	useEffect(() => {
		fetchCart();
	}, [fetchCart]);

	useEffect(() => {
		const localCartItems = JSON.parse(localStorage.getItem("cart_items")) || [];

		//* Checking If the local storage exist or not
		const addFromStorageCart = async () => {
			try {
				for (const item of localCartItems) {
					const cartList = {
						product_id: item.id,
						quantity: item.quantity ? item.quantity : 1, //if there is no quantity set to 1 by default
					};
					const response = await axios.post(
						`${import.meta.env.VITE_API_URL}/cart/add`,
						cartList,
						{
							headers: {
								Accept: "application/json",
								Authorization: `Bearer ${token}`,
							},
						}
					);
					console.log(response.data);
				}
			} catch (err) {
				console.error(
					"Error adding items from local storage to cart:",
					err.message
				);
			}
		};

		//* Add product to cart if only the local Storage has items and user is logged in
		if (currentUser && currentUser.role === "customer") {
			if (localCartItems.length > 0) {
				addFromStorageCart();
			}
		} else {
			setCartItems(localCartItems);
		}
	}, [currentUser, token]);

	//* Updating Cart quantity
	const updateCartQuantity = async (productId, quantity) => {
		if (currentUser && currentUser.role === "customer") {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_API_URL}/cart/update-quantity`,
					{ product_id: productId, quantity: quantity },
					{
						headers: {
							Accept: "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log(response.data.message);

				//* Fetch the updated cart items from the server again to get the remain items in cart
				fetchCart();
			} catch (err) {
				console.error("Error updating item quantity in cart:", err.message);
			}
		} else {
			// Update the quantity in the local storage cart
			const currentCartItems =
				JSON.parse(localStorage.getItem("cart_items")) || [];
			console.log("Current cart items:", currentCartItems);
			console.log("Product ID to update:", productId);

			// Update the item quantity
			const updatedCartItems = currentCartItems.map((item) =>
				item.id === productId ? { ...item, quantity: quantity } : item
			);
			console.log(
				"Updated cart items after quantity change:",
				updatedCartItems
			);

			// Update the state and localStorage
			setCartItems(updatedCartItems);
			localStorage.setItem("cart_items", JSON.stringify(updatedCartItems));

			//Calculating Total of the product
			const totalLocalPrice = updatedCartItems.reduce((total, item) => {
				const itemTotal = item.discount
					? item.price * item.quantity * (1 - item.discount.percentage / 100)
					: item.price * item.quantity;
				return total + itemTotal;
			}, 0);
			setTotalPrice(totalLocalPrice);
		}
	};

	//* Removing Items from cart when u are guest or users
	const removeFromCart = async (productId) => {
		//* If the current user is logged in
		if (currentUser && currentUser.role === "customer") {
			try {
				// Remove the item from the cart on the server
				const response = await axios.delete(
					`${import.meta.env.VITE_API_URL}/cart/remove/${productId}`,
					{
						headers: {
							Accept: "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log(response.data.message);

				//* Fetch the updated cart items from the server again to get the remain items in cart
				const getCart = await axios.get(
					`${import.meta.env.VITE_API_URL}/cart`,
					{
						headers: {
							Accept: "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setCartItems(getCart.data.cart.items);
				onCartUpdate();
			} catch (err) {
				console.error("Error removing item from cart:", err.message);
			}
		} else {
			// Remove the item from the local storage cart
			const currentCartItems =
				JSON.parse(localStorage.getItem("cart_items")) || [];
			console.log("Current cart items:", currentCartItems);
			console.log("Product ID to remove:", productId);

			// Filter out the item to be removed
			const updatedCartItems = currentCartItems.filter(
				(item) => item.id !== productId
			);
			console.log("Updated cart items after removal:", updatedCartItems);

			// Update the state and localStorage
			setCartItems(updatedCartItems);
			localStorage.setItem("cart_items", JSON.stringify(updatedCartItems));

			// Recalculate the total price for local cart items
			const newTotalPrice = updatedCartItems.reduce((total, item) => {
				const itemTotal = item.discount
					? item.price * item.quantity * (1 - item.discount.percentage / 100)
					: item.price * item.quantity;
				return total + itemTotal;
			}, 0);
			setTotalPrice(newTotalPrice);
		}
	};
	console.log(totalPrice);

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full">
								<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
									<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
										<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
											<div className="flex items-start justify-between">
												<Dialog.Title className="text-lg font-medium text-gray-900">
													Shopping cart
												</Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
														onClick={() => setOpen(false)}>
														<span className="absolute -inset-0.5" />
														<span className="sr-only">Close panel</span>
														<XMarkIcon className="h-6 w-6" aria-hidden="true" />
													</button>
												</div>
											</div>

											<div className="mt-8">
												<div className="flow-root">
													<ul
														role="list"
														className="-my-6 divide-y divide-gray-200">
														{cartItems && cartItems.length > 0 ? (
															cartItems.map((item) => (
																<li
																	key={item.product?.id ?? item.id}
																	className="flex py-6">
																	<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
																		<img
																			src={item.product?.images ?? item.images}
																			className="h-full w-full object-contain object-center"
																		/>
																	</div>

																	<div className="ml-4 flex flex-1 flex-col">
																		<div>
																			<div className="flex justify-between text-base font-medium text-gray-900">
																				<h3>
																					{item.product?.name ?? item.name}
																				</h3>
																				{item?.product ? (
																					<div className="flex justify-center items-center gap-1">
																						{item?.product.discount && (
																							<p className="ml-4 text-red-500">
																								(Discounted)
																							</p>
																						)}

																						<p
																							className={
																								item?.product.discount
																									? "text-red-500"
																									: "text-black"
																							}>
																							${item.final_price}
																						</p>
																					</div>
																				) : (
																					<div className="flex justify-center items-center">
																						<div className="ml-2">
																							{item.discount ? (
																								<div className="flex justify-center items-center gap-1">
																									<p className="text-sm text-red-500">
																										Discounted
																									</p>
																									<p className="text-red-500">
																										{finalPrice(
																											item.price,
																											item.discount.percentage
																										)}
																									</p>
																								</div>
																							) : (
																								<p className="text-black">
																									${item.price}
																								</p>
																							)}
																						</div>
																					</div>
																				)}
																			</div>
																		</div>
																		<div className="flex justify-between items-center">
																			<div className="flex flex-col justify-start text-xs font-semibold text-gray-500">
																				<h3>
																					Brand:
																					{item.product?.brand?.name ??
																						item.brand.name}
																				</h3>
																				<p className="text-gray-500 text-xs font-semibold">
																					Type:
																					{item.product?.category?.name ??
																						item.category?.name}
																				</p>
																			</div>
																			<input
																				type="number"
																				value={item?.quantity ?? 1}
																				onChange={(e) => {
																					const newQuantity = parseInt(
																						e.target.value,
																						10
																					);
																					if (newQuantity > 0) {
																						updateCartQuantity(
																							item.product?.id ?? item.id,
																							newQuantity
																						);
																					}
																				}}
																				className="w-1/4 border rounded-sm mt-4"
																			/>
																		</div>
																		<div className="flex flex-1 items-end justify-between text-sm">
																			<div className="flex">
																				<button
																					onClick={() =>
																						removeFromCart(
																							item.product?.id ?? item.id
																						)
																					}
																					type="button"
																					className="font-medium text-indigo-600 hover:text-indigo-500">
																					Remove
																				</button>
																			</div>
																		</div>
																	</div>
																</li>
															))
														) : (
															<p className="text-black font-bold p-1">
																No Items on the list
															</p>
														)}
													</ul>
												</div>
											</div>
										</div>

										<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
											<div className="flex justify-between text-base font-medium text-gray-900">
												<p>Subtotal</p>
												<p className="font-semibold text-lg">${totalPrice}</p>
											</div>
											<p className="mt-0.5 text-sm text-gray-500">
												Shipping calculated at checkout.
											</p>
											<div className="mt-6">
												<Link
													to={`${
														currentUser && currentUser.role == "cumstomer"
															? "/cart_detail"
															: "/login"
													} `}
													className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
													Checkout
												</Link>
											</div>
											<div className="mt-6 flex justify-center text-center text-sm gap-2 text-gray-500">
												<p>
													or
													<Link
														to={"/shop"}
														type="button"
														className="font-medium text-indigo-600 hover:text-indigo-500"
														onClick={() => setOpen(false)}>
														Continue Shopping
														<span aria-hidden="true"> &rarr;</span>
													</Link>
												</p>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
