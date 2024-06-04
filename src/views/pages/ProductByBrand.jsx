import axios from "axios";
import getCurrentUser from "./../../utils/getCurrentUser";
import authToken from "./../../utils/authToken";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { handleAddToCart } from "./../../utils/HandleCart";
import { finalPrice } from "../../utils/DiscountFunction";

export default function ProductByBrand() {
	const [produtcByBrand, setProductByBrand] = useState(null);
	const [brand, setBrand] = useState(null);
	const [brandName, setBrandName] = useState("");
	const [itemsCart, setItemsCart] = useState([]);

	const { brandID } = useParams();
	const currentUser = getCurrentUser();
	const token = authToken();

	const fetchProductsByBrand = useCallback(async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/query-categories`,
				{
					params: {
						brand_id: brandID ? parseInt(brandID) : null,
					},
				}
			);
			setProductByBrand(response.data.category);
		} catch (error) {
			console.error("Error fetching products:", error.message);
		}
	}, [brandID]);
	useEffect(() => {
		fetchProductsByBrand();
	}, [fetchProductsByBrand]);

	const fetchBrand = useCallback(async () => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_API_URL}/brand`);
			setBrand(response.data.brand);
			const getResponse = response.data.brand;
			const getName = getResponse.find(
				(obj) => obj.id === parseInt(brandID)
			).name;
			setBrandName(getName);
		} catch (err) {
			console.log(err.message);
		}
	}, [brandID]);
	useEffect(() => {
		fetchBrand();
	}, [fetchBrand]);

	const memoizedProducts = useMemo(() => {
		if (!produtcByBrand) return null;

		//* Guest or Login user Adding to Cart

		const addToCart = (productId) => {
			handleAddToCart(productId, currentUser, token, setItemsCart);
		};

		return produtcByBrand.map((product, key) => (
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
	}, [produtcByBrand, currentUser, token]);
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
									to="/product/brand_id"
									className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
									aria-current="page">
									Filter By Brand
								</Link>
							</div>
						</div>
					</li>
				</ol>
			</nav>
			<div className="flex flex-wrap justify-center items-center gap-4 text-center mt-12 md:w-full sm:w-1/4 xs:1/6 ">
				{brand &&
					brand.map((item, key) => (
						<div key={key} className="p-4">
							<Link to={`/product/brand_id/${item.id}`}>
								<div className="w-[8rem] h-[5rem] flex flex-col justify-center items-center border border-gray-600 px-2 rounded-md transform transition duration-500 hover:scale-110">
									<div className="h-1/2 flex justify-center items-center">
										<img src={item.logo_url} className="w-full px-4" alt="#" />
									</div>
								</div>
							</Link>
						</div>
					))}
			</div>
			<div className="flex justify-start items-center px-36 gap-4 mt-12">
				<div className="bg-red-600 w-4 h-8 rounded-sm"></div>
				<p className="font-semibold ">{brandName}</p>
			</div>
			<div className="flex justify-start items-start my-12">
				<div className="container mx-auto flex gap-8 flex-wrap max-w-2xl px-2 lg:max-w-7xl">
					{produtcByBrand && produtcByBrand.length > 0 ? (
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
