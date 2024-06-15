/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import DisplayLoading from "../../components/DisplayLoading";
import RelatedProduct from "../../components/RelatedProduct";
import { finalPrice } from "././../../utils/DiscountFunction";
import authToken from "../../utils/authToken";
import getCurrentUser from "./../../utils/getCurrentUser";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = () => {
	toast.success("Your Item has been added to cart", {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "colored",
		transition: Bounce,
	});
};

export default function ProductDetail() {
	//* Get token
	let token = authToken();

	//* Access currentUser from the auth slice via token
	const currentUser = getCurrentUser();

	//* Set for related products
	const [brandID, setBrandID] = useState(null);
	const [categoryID, setCategoryID] = useState(null);

	//* Using this usaParams to get the specific id of product
	const { productID } = useParams();
	const [getProductId, setGetProductId] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	//* Cart items
	const [itemsCart, setItemsCart] = useState([]);
	const [itemsQuantity, setItemsQuantity] = useState(0);

	//* Handling quantity of products before adding to cart
	const handleIncrease = () => {
		setItemsQuantity((prevQuantity) => prevQuantity + 1);
	};

	const handleDecrease = () => {
		setItemsQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0)); // Ensure quantity doesn't go below 0
	};

	const fetchProductById = useCallback(async () => {
		try {
			const getProduct = await axios.get(
				`${import.meta.env.VITE_API_URL}/products/${productID}`
			);
			setGetProductId(getProduct.data.product);
			setBrandID(getProduct.data.product.brand.id);
			setCategoryID(getProduct.data.product.category.id);
			setLoading(false);
		} catch (error) {
			setError("Failed to fetch product data");
			setLoading(false);
		}
	}, [productID]);

	useEffect(() => {
		fetchProductById();
	}, [fetchProductById]);

	//* Guest or Login user Adding to Cart
	const handleAddToCart = async (id) => {
		if (currentUser && currentUser.role === "customer") {
			const cartList = {
				product_id: id,
				quantity: itemsQuantity ?? 1,
			};
			try {
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
				console.log(response.message);
			} catch (err) {
				console.log(err.message);
			}
		} else {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/products/${id}`
				);
				const newItem = response.data.product;

				// Read the current cart items from localStorage
				const currentCartItems =
					JSON.parse(localStorage.getItem("cart_items")) || [];

				// Find the index of the item in the cart
				const existingIndex = currentCartItems.findIndex(
					(item) => item.id === newItem.id
				);

				if (existingIndex === -1) {
					// If the item does not exist, add it with quantity 1
					newItem.quantity = itemsQuantity ?? 1;
					const updatedCartItems = [...currentCartItems, newItem];
					setItemsCart(updatedCartItems);
					localStorage.setItem("cart_items", JSON.stringify(updatedCartItems));
				} else {
					// If the item exists, update its quantity
					const updatedCartItems = [...currentCartItems];
					updatedCartItems[existingIndex].quantity += 1;
					setItemsCart(updatedCartItems);
					localStorage.setItem("cart_items", JSON.stringify(updatedCartItems));
				}
			} catch (err) {
				console.error("Error fetching product details:", err.message);
			}
		}
	};

	if (loading) return <DisplayLoading />;
	if (error) return <div>{error}</div>;

	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
			<section className="flex justify-center items-center text-gray-700 body-font flex-col bg-white">
				<nav className="flex justify-center items-center ml-12 p-4">
					<ol className="flex items-center">
						<li className="text-left">
							<div className="-m-1">
								<Link
									to={"/"}
									className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800">
									Home
								</Link>
							</div>
						</li>

						<li className="text-left">
							<div className="flex items-center">
								<span className="mx-2 text-gray-400">/</span>
								<div className="-m-1">
									<Link
										to={"/shop"}
										className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800">
										Shop
									</Link>
								</div>
							</div>
						</li>

						<li className="text-left">
							<div className="flex items-center">
								<span className="mx-2 text-gray-400">/</span>
								<div className="-m-1">
									<a
										href="#"
										className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
										aria-current="page">
										Product
									</a>
								</div>
							</div>
						</li>
					</ol>
				</nav>

				<div className="flex justify-start items-start mb-24">
					<div className="w-full  mx-auto flex justify-center gap-24 items-center mt-12">
						<div className="h-full w-[25rem] flex justify-start items-start">
							<img
								alt="ecommerce"
								className="object-cover h-full w-96  rounded-ld lg:w-full sm:w-1/2"
								src={getProductId.images}
							/>
						</div>
						<div className="w-1/4 flex justify-center items-center flex-col  lg:py-6 mt-4 lg:mt-0 mr-54">
							<h2 className="text-sm title-font text-gray-500 tracking-widest">
								{getProductId.brand.name}
							</h2>
							<h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
								{getProductId.name}
							</h1>
							<div className="flex mb-4">
								<span className="flex items-center">
									<span className="text-gray-600 ">
										{getProductId.category.name}
									</span>
								</span>
								<span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
									<a className="text-gray-500">
										<svg
											fill="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="w-5 h-5"
											viewBox="0 0 24 24">
											<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
										</svg>
									</a>
									<a className="ml-2text-gray-500">
										<svg
											fill="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="w-5 h-5"
											viewBox="0 0 24 24">
											<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
										</svg>
									</a>
									<a className="ml-2 text-gray-500">
										<svg
											fill="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											className="w-5 h-5"
											viewBox="0 0 24 24">
											<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
										</svg>
									</a>
								</span>
							</div>
							<div className="title-font flex justify-start items-start text-gray-900 py-4">
								{getProductId.discount ? (
									<div className="flex justify-center flex-col items-center gap-4">
										<div className="flex justify-start items-center gap-2">
											<p className="text-sm">Price</p>

											<del className="text-lg title-font text-gray-500 tracking-widest ">
												${getProductId.price}
											</del>
											<p className="text-sm">to</p>
											<p className="text-lg font-bold text-red-500">
												{finalPrice(
													getProductId.price,
													getProductId.discount.percentage
												)}
											</p>
										</div>
									</div>
								) : (
									<div className=" leading-relaxed flex justify-start items-start gap-4">
										<p className="text-lg title-font text-gray-500 tracking-widest">
											Price
										</p>
										<p className="font-semibold text-lg text-red-500">
											${getProductId.price}
										</p>
									</div>
								)}
							</div>
							<p className="leading-relaxed">{getProductId.description}</p>

							<div className="flex justify-center items-center gap-8  mt-8 flex-col">
								<div className="flex items-center gap-4">
									<p className="text-xl title-font text-gray-500 tracking-widest">
										Quantity
									</p>

									<button
										onClick={handleDecrease}
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
										value={itemsQuantity}
										onChange={(e) =>
											setItemsQuantity(parseInt(e.target.value) ?? 0)
										}
									/>
									{/** Arrow Right */}
									<button
										onClick={handleIncrease}
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

								<div className="flex justify-center items-center gap-4">
									<button
										onClick={() => {
											notify();
											handleAddToCart(getProductId.id);
										}}
										to={currentUser?.role !== "admin" ? "/payment" : "#"}
										className={`${
											currentUser?.role === "admin"
												? "flex justify-center w-[8rem]  font-semibold text-white border-0 py-2 px-4 focus:outline-none rounded  bg-gray-400 cursor-not-allowed"
												: "px-4 py-2 w-[8rem]  text-center font-semibold text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
										}`}>
										Add to Cart
									</button>
									<Link
										onClick={() => handleAddToCart(getProductId.id)}
										to={
											currentUser?.role == "customer"
												? "/cart_detail"
												: "/login"
										}
										className={`flex justify-center w-[8rem]  font-semibold text-white border-0 py-2 px-4 focus:outline-none rounded ${
											currentUser?.role === "admin"
												? "bg-gray-400 cursor-not-allowed"
												: "bg-red-500 hover:bg-red-600"
										}`}>
										Buy Now
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/** Related Product */}
			<div className="flex px-20 flex-col mb-8 ">
				<div className="flex justify-start items-start gap-4">
					<div className="bg-red-600 w-4 h-8 rounded-sm"></div>
					<p className="font-semibold ">Related</p>
				</div>
				<p className="font-bold text-3xl mt-4">Related Products</p>

				<div className="container  flex gap-8 flex-wrap max-w-2xl lg:max-w-7xl">
					<div className="flex h-max mt-12  justify-start items-start gap-16 flex-wrap">
						<RelatedProduct
							categoryID={categoryID}
							brandID={brandID}
							existingID={productID}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
