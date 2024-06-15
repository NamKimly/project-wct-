import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import getCurrentUser from "./../utils/getCurrentUser";
import authToken from "./../utils/authToken";
import { Link } from "react-router-dom";
export default function CartDetail() {
	const token = authToken();
	const currentUser = getCurrentUser();

	const [cart, setCart] = useState([]);
	const [totalPrice, setTotalCart] = useState(null);

	const [termCondition, setTermCondition] = useState(false);

	//* place order validations
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");
	const [termsAccepted, setTermsAccepted] = useState(false);
	const isFormValid = address && termsAccepted;
	const fetchCart = useCallback(async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			setCart(response.data.cart.items);
			setTotalCart(response.data.cart.totalCartPrice);
		} catch (error) {
			console.error("Error fetching cart:", error);
		}
	}, [token]);

	useEffect(() => {
		fetchCart();
	}, []);

	const handleRemoveCart = async (productId) => {
		try {
			await axios.delete(
				`${import.meta.env.VITE_API_URL}/cart/remove/${productId}`,
				{
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			fetchCart();
		} catch (err) {
			console.error("Error removing item from cart:", err.message);
		}
	};

	//* Updating Product
	const handleUpdateQuantity = async (productId, quantity) => {
		try {
			await axios.post(
				`${import.meta.env.VITE_API_URL}/cart/update-quantity`,
				{ product_id: productId, quantity },
				{
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			fetchCart();
		} catch (err) {
			console.error("Error updating cart quantity:", err.message);
		}
	};

	//* Change quantity of the product
	const handleQuantityChange = (productId, change) => {
		const updatedCart = cart.map((item) => {
			if (item.product.id === productId) {
				const newQuantity = item.quantity + change;
				if (newQuantity > 0) {
					handleUpdateQuantity(productId, newQuantity);
				}
			}
			return item;
		});
		setCart(updatedCart);
	};

	const handleCheckOutPayment = async (e) => {
		e.preventDefault();
		const request = {
			email: email || currentUser?.email,
			phone_number: phoneNumber || currentUser?.mobile_no,
			address: address,
			cart_items: cart.map((item) => ({
				product_id: item.product.id,
				product_name: item.product.name,
				quantity: item.quantity,
				price: item.total_price,
			})),
		};
		try {
			const checkOut = await axios.post(
				`${import.meta.env.VITE_API_URL}/create-checkout-session`,
				request,
				{
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log("Your has been Checked Out");
			window.location.replace(checkOut.data.url);
		} catch (err) {
			console.log("Can not set order the proucts" + err.message);
		}
	};

	console.log(currentUser);
	return (
		<section className="py-16 relative">
			<div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
				<h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
					Shopping Cart
				</h2>
				<div className="flex justify-between items-start">
					<div className="flex flex-col">
						{cart && cart.length > 0 ? (
							cart.map((products, key) => (
								<div key={key} className="flex flex-col max-w-full mt-4">
									<div className="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto w-11/12  gap-y-4">
										<div className="col-span-12 lg:col-span-2">
											<img
												src={products.product.images}
												alt="#"
												className="max-lg:w-full lg:w-[180px]"
											/>
										</div>
										<div className="col-span-12 lg:col-span-10 w-full lg:pl-3">
											<div className="flex items-center justify-between w-full mb-4">
												<h5 className="font-manrope font-bold p-2 text-lg leading-9 text-gray-900">
													{products.product.name}
												</h5>
												{/**Delete button */}
												<button
													onClick={() => handleRemoveCart(products.product.id)}
													className="rounded-full group flex items-center justify-center focus-within:outline-red-500">
													<svg
														width="34"
														height="34"
														viewBox="0 0 34 34"
														fill="none"
														xmlns="http://www.w3.org/2000/svg">
														<circle
															className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
															cx="17"
															cy="17"
															r="17"
														/>
														<path
															className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
															d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
															stroke="#EF4444"
															strokeWidth="1.6"
															strokeLinecap="round"
														/>
													</svg>
												</button>
											</div>
											<div className="flex justify-between items-center">
												<div className="flex items-center gap-4">
													<button
														onClick={() =>
															handleQuantityChange(products.product.id, -1)
														}
														className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
														<svg
															className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
															width="18"
															height="19"
															viewBox="0 0 18 19"
															fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<line
																x1="4.75"
																y1="9.51562"
																x2="13.25"
																y2="9.51562"
																strokeWidth="1.6"
																strokeLinecap="round"
															/>
														</svg>
													</button>
													<input
														type="text"
														id="number"
														className="border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center"
														value={products.quantity}
													/>
													{/** Arrow Right */}
													<button
														onClick={() =>
															handleQuantityChange(products.product.id, 1)
														}
														className="group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300">
														<svg
															className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
															width="18"
															height="19"
															viewBox="0 0 18 19"
															fill="none"
															xmlns="http://www.w3.org/2000/svg">
															<line
																x1="9.5"
																y1="5.01562"
																x2="9.5"
																y2="14.0156"
																strokeWidth="1.6"
																strokeLinecap="round"
															/>
															<line
																x1="4.75"
																y1="9.51562"
																x2="13.25"
																y2="9.51562"
																strokeWidth="1.6"
																strokeLinecap="round"
															/>
														</svg>
													</button>
												</div>
												<h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right">
													{products.product.discount ? (
														<div className="flex justify-center items-center gap-1">
															{products.product.discount.percentage ? (
																<>
																	<p className="ml-4 text-red-500">
																		(Discount)
																	</p>
																</>
															) : null}
															<p className="text-red-500">
																${products?.final_price}
															</p>
														</div>
													) : (
														<p className="ml-4 ">${products.final_price}</p>
													)}
												</h6>
											</div>
										</div>
									</div>
								</div>
							))
						) : (
							<p className="font-bold text-lg rounded-3xl border-2 border-gray-200 p-4 lg:p-8  mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-2">
								No Item in Cart
							</p>
						)}
					</div>
					<form method="post" onSubmit={handleCheckOutPayment}>
						<div className="max-w-full">
							<div className="border-b border-gray-900/10 pb-8">
								<div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
									<div className="sm:col-span-3">
										<label
											htmlFor="email"
											className="block text-sm font-medium leading-6 text-gray-900">
											*Email
										</label>
										<div className="mt-2">
											<input
												type="text"
												value={currentUser?.email}
												required
												onChange={(e) => setEmail(e.target.value)}
												autoComplete="email"
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div className="sm:col-span-3">
										<label
											htmlFor="phone-number"
											className="block text-sm font-medium leading-6 text-gray-900">
											*Phone number
										</label>
										<div className="mt-2">
											<input
												type="text"
												required
												value={currentUser?.mobile_no}
												onChange={(e) => setPhoneNumber(e.target.value)}
												autoComplete="tel"
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>

									<div className="col-span-full">
										<label
											htmlFor="street-address"
											className="block text-sm font-medium leading-6 text-gray-900">
											*Address
										</label>
										<div className="mt-1">
											<input
												type="text"
												required
												onChange={(e) => setAddress(e.target.value)}
												autoComplete="street-address"
												className="block w-full rounded-md  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
								</div>
								<div className="flex justify-start items-center gap-2">
									<label
										className="relative flex justify-center items-center p-2 mt-2 rounded-full cursor-pointer"
										htmlFor="check">
										<input
											checked={termsAccepted}
											type="checkbox"
											onChange={() =>
												setTermsAccepted(termsAccepted ? false : true)
											}
											required
											name="terms"
											className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
										/>

										<span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-3.5 w-3.5"
												viewBox="0 0 20 20"
												fill="currentColor"
												stroke="currentColor"
												strokeWidth="1">
												<path
													fillRule="evenodd"
													d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
													clipRule="evenodd"></path>
											</svg>
										</span>
									</label>
									<Link
										to="/term_condition"
										className="mt-[5px] text-semibold text-gray-700 cursor-pointer select-none text-sm text-center"
										htmlFor="check">
										*Accept terms and conditions
									</Link>
								</div>
								<div className="overscroll-y-auto w-1/2">
									<p className="text-xs">
										By placing an order on our website, you agree to be bound by
										these Terms and Conditions. Please read them carefully
										before making a purchase.
									</p>
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-2 mt-2">
							<p className="text-lg font-bold"> Confirm Your Order</p>
							{cart ? (
								cart.map((item) => (
									<div
										key={item.product.id}
										className="flex justify-between items-center">
										<p className="text-sm">{item.product.name}</p>
										<p className="text-sm">({item.quantity})</p>
									</div>
								))
							) : (
								<p>No product</p>
							)}
						</div>
						<div className="flex flex-col md:flex-row items-center justify-between pb-4 max-lg:max-w-lg max-lg:mx-auto mt-2">
							<h5 className="text-gray-900 font-manrope font-semibold text-xl leading-9 w-full max-md:text-center max-md:mb-4">
								Total
							</h5>
							<div className="flex items-center justify-between gap-5">
								<h6 className="font-manrope font-bold text-xl leading-10 text-indigo-600">
									${totalPrice}
								</h6>
							</div>
						</div>
						<div className="max-lg:max-w-lg max-lg:mx-auto">
							<button
								disabled={!isFormValid}
								className={`rounded-full py-2 px-2 ${
									isFormValid
										? "bg-indigo-600 hover:bg-indigo-700"
										: "bg-gray-300 cursor-not-allowed"
								} text-white font-semibold text-sm w-full text-center transition-all duration-500`}>
								Proceed To Check Out
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
