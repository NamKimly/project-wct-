import axios from "axios";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { handleAddToCart } from "./../../utils/HandleCart";
import { finalPrice } from "../../utils/DiscountFunction";
import getCurrentUser from "./../../utils/getCurrentUser";
import authToken from "./../../utils/authToken";

export default function ProductByCategory() {
	const { categoryId } = useParams();
	const [productByCategory, setProductByCategory] = useState(null);
	const [category, setCatgory] = useState(null);
	const [itemsCart, setItemsCart] = useState([]);
	const [categoryName, setCategoryName] = useState("");

	const currentUser = getCurrentUser();
	const token = authToken();
	const navigate = useNavigate();

	const fetchProductsByCategory = useCallback(async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/query-categories`,
				{
					params: {
						category_id: categoryId ? parseInt(categoryId) : null,
					},
				}
			);
			setProductByCategory(response.data.category);
		} catch (e) {
			console.log(e.message);
		}
	}, [categoryId]);

	useEffect(() => {
		fetchProductsByCategory();
	}, [fetchProductsByCategory]);

	const fetchCategory = useCallback(async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/category`
			);
			setCatgory(response.data.category);
			const getResponse = response.data.category;
			const getName = getResponse.find(
				(obj) => obj.id === parseInt(categoryId)
			).name;
			setCategoryName(getName);
		} catch (err) {
			console.log(err.message);
		}
	}, [categoryId]);
	useEffect(() => {
		fetchCategory();
	}, [fetchCategory]);

	const handleOnNavigate = (id) => {
		navigate(`/product/category_id/${id}`);
	};

	const memoizedProducts = useMemo(() => {
		if (!productByCategory) return null;

		//* Guest or Login user Adding to Cart

		const addToCart = (productId) => {
			handleAddToCart(productId, currentUser, token, setItemsCart);
		};

		return productByCategory.map((product, key) => (
			<div
				key={key}
				className="border lg:max-w-5xl  h-1/2  flex flex-col  text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl lg:w-64  xs:w-54">
				<div className="flex relative h-52 mx-4 mt-4 overflow-hidden text-white bg-clip-border rounded-md shadow-blue-gray-500/40">
					<div className="w-full h-full flex justify-center items-center m-4">
						<img
							src={product.images}
							alt="card-image"
							loading="lazy"
							className="max-w-44 object-fill object-center lg:h-3/4 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
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
					<p className="block mb-2 font-sans lg:text-xl md:text-base antialiased font-semibold leading-snug tracking-normal text-black">
						{product.name}
					</p>
					<p className="block font-sans text-semibold  antialiased font-light leading-relaxed text-sm text-blue-gray-900">
						{product.category.name}
					</p>
					<p className="block mt-2 font-sans text-semibold text-red-500 antialiased font-bold leading-relaxed text-inherit">
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
						onClick={() => addToCart(product.id)}
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
		));
	}, [productByCategory, currentUser, token]);
	console.log(category);
	return (
		<>
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
								<Link
									to={`/product/category_id/${categoryId}`}
									className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
									aria-current="page">
									{categoryName}
								</Link>
							</div>
						</div>
					</li>
				</ol>
			</nav>

			<div className="flex justify-start w-1/4 flex-col items-start px-8 ml-24 gap-4">
				<label>Category</label>
				<select className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
					<option selected disabled>
						{categoryName}
					</option>
					{category &&
						category.map((data, key) => (
							<option
								onClick={() => handleOnNavigate(data.id)}
								key={key}
								value={data.id}>
								{data.name}
							</option>
						))}
				</select>
			</div>

			<div className="flex justify-start items-start my-10">
				<div className="container mx-auto flex gap-8 flex-wrap max-w-2xl px-2 lg:max-w-7xl">
					{productByCategory && productByCategory.length > 0 ? (
						memoizedProducts
					) : (
						<p className="block antialiased text-center m-20 font-sans text-sm leading-normal text-black font-bold">
							There is no product on the list
						</p>
					)}
				</div>
			</div>
		</>
	);
}
