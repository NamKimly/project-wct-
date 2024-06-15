/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { finalPrice } from "./../utils/DiscountFunction";
import authToken from "./../utils/authToken";
import getCurrentUser from "./../utils/getCurrentUser";

export default function RelatedProduct({ categoryID, brandID, existingID }) {
	//* Get token
	const token = authToken();

	//* Listing Filter Product
	const [products, setProducts] = useState([]);
	const [productsByCategory, setProductsByCategory] = useState([]);
	const [productsByBrand, setProductsByBrand] = useState([]);

	//* Check Users
	const currentUser = getCurrentUser();

	//* Cart control
	const [itemsCart, setItemsCart] = useState([]);

	const [limit, setLimit] = useState(4);

	//* Filter  the related products
	useEffect(() => {
		const fetchRelatedProductsByCategory = async () => {
			const params = { category_id: categoryID };
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/query-multiple-categories`,
					{ params }
				);
				const filteredProducts = response.data.product_filter.filter(
					(product) => product.id !== parseInt(existingID)
				);
				setProductsByCategory(filteredProducts);
			} catch (err) {
				console.log(err.message);
			}
		};
		if (categoryID) fetchRelatedProductsByCategory();
	}, [categoryID, existingID]);

	//* Filter  the related products brand
	useEffect(() => {
		const fetchRelatedProductsByBrand = async () => {
			const params = { brand_id: brandID };
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/query-multiple-categories`,
					{ params }
				);
				const filteredProducts = response.data.product_filter.filter(
					(product) => product.id !== parseInt(existingID)
				);
				setProductsByBrand(filteredProducts);
			} catch (err) {
				console.log(err.message);
			}
		};
		if (brandID) fetchRelatedProductsByBrand();
	}, [brandID, existingID]);

	//* combine products from brand and category related
	useEffect(() => {
		if (productsByCategory.length > 0 || productsByBrand.length > 0) {
			const combinedProducts = [...productsByCategory, ...productsByBrand];
			const uniqueProducts = Array.from(
				new Set(combinedProducts.map((product) => product.id))
			).map((id) => combinedProducts.find((product) => product.id === id));
			setProducts(shuffleArray(uniqueProducts));
		}
	}, [productsByCategory, productsByBrand]);

	//* Shuffle Products list
	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};

	//* Handling add to cart
	const handleAddToCart = async (id) => {
		if (currentUser && currentUser.role === "customer") {
			const cartList = {
				product_id: id,
				quantity: 1,
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
					newItem.quantity = 1;
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

	return (
		<>
			{products && products.length > 0 ? (
				products
					.slice(0, limit ? limit : products.length)
					.map((product, key) => (
						<div
							key={key}
							className="border lg:max-w-4xl  h-1/2  flex flex-col  text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl lg:w-64  xs:w-54">
							<div className="flex relative h-52 mx-4 mt-4 overflow-hidden text-white bg-clip-border rounded-md shadow-blue-gray-500/40">
								<div className="w-full h-full flex justify-center items-center m-4">
									<img
										src={product.images}
										alt="card-image"
										loading="lazy"
										className="max-w-lg object-cover object-center h-3/4 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
									/>
								</div>

								{product.discount && (
									<div className="absolute bg-red-500 w-24 h-8 rounded-md flex justify-center items-center gap-2 m-3">
										<i className="fa-solid fa-tag text-xs"></i>
										<p className="text-white text-sm font-semibold">
											{parseInt(product.discount.percentage)}% off
										</p>
									</div>
								)}
								{product.is_new_arrival && (
									<div className="absolute bg-green-500 w-24 h-8 rounded-md flex justify-center items-center gap-2 m-2">
										<p className="text-white text-xs font-bold">New Arrival</p>
									</div>
								)}
							</div>

							<div className="p-6">
								<p className="block font-sans text-[0.8rem]  antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
									{product.brand.name}
								</p>
								<p className="block mb-2 font-sans lg:text-lg md:text-base antialiased font-semibold leading-snug tracking-normal text-black">
									{product.name}
								</p>
								<p className="block font-sans text-semibold  antialiased font-light leading-relaxed text-sm text-blue-gray-900">
									{product.category.name}
								</p>
								<p className="block mt-2 font-sans text-base text-red-500 antialiased font-semibold leading-relaxed text-inherit">
									{product.discount ? (
										<div className="flex justify-start items-center gap-2">
											<span className="line-through text-black text-sm">
												${product.price}
											</span>
											<span className="text-black text-sm">to</span>
											{finalPrice(product.price, product.discount.percentage)}
										</div>
									) : (
										`$${product.price}`
									)}
								</p>
							</div>
							<div className="flex justify-between items-center p-6 pt-0">
								<button
									onClick={() => handleAddToCart(product.id)}
									disabled={currentUser?.role == "admin"}
									className={`${
										currentUser?.role === "admin"
											? "flex justify-center w-[8rem] text-white border-0 py-2 px-4 focus:outline-none rounded-lg bg-gray-400 cursor-not-allowed"
											: "align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
									}`}
									type="button">
									Add To Cart
								</button>
								<div className="flex justify-center items-center gap-4">
									<i className="far fa-heart cursor-pointer md:text-sm"></i>
									<Link to={`/productdetail/${product.id}`}>
										<i className="fas fa-eye text-black cursor-pointer md:text-sm"></i>
									</Link>
								</div>
							</div>
						</div>
					))
			) : (
				<p className="font-bold">There is no product to show </p>
			)}
		</>
	);
}
