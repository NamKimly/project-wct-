import { Link } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import { handleAddToCart } from "../../utils/HandleCart";
import { finalPrice } from "../../utils/DiscountFunction";
import getCurrentUser from "./../../utils/getCurrentUser";
import authToken from "./../../utils/authToken";
import DisplayLoading from "../../components/DisplayLoading";
import axios from "axios";

//* Main rendering
export default function Shopping() {
	//* Get token
	const token = authToken();

	//* Access currentUser from the auth slice via token
	const currentUser = getCurrentUser();

	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);
	const [itemsCart, setItemsCart] = useState([]);

	const [loading, setLoading] = useState(false);

	//* Filter by brand and category price
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedBrands, setSelectedBrands] = useState([]);
	const [selectedDiscount, setSelectedDiscount] = useState(false);
	const [selectedLatest, setSelectedLatest] = useState(false);
	const [selectedPriceAbove, setSelectedPriceAbove] = useState(false);
	const [selectedPriceBelow, setSelectedPriceBelow] = useState(false);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(0);
	const handleCategoryChange = useCallback((categoryID) => {
		setSelectedCategories((prev) =>
			prev.includes(categoryID)
				? prev.filter((id) => id !== categoryID)
				: [...prev, categoryID]
		);
	}, []);

	const handleBrandChange = useCallback((brandID) => {
		setSelectedBrands((prev) =>
			prev.includes(brandID)
				? prev.filter((id) => id !== brandID)
				: [...prev, brandID]
		);
	}, []);

	//* Fetch Categories and Brand
	const fetchCategoriesAndBrands = useCallback(async () => {
		try {
			const [categoriesResponse, brandsResponse] = await Promise.all([
				axios.get(`${import.meta.env.VITE_API_URL}/category`),
				axios.get(`${import.meta.env.VITE_API_URL}/brand`),
			]);

			setCategories(categoriesResponse.data.category);
			setBrands(brandsResponse.data.brand);
		} catch (e) {
			console.error("Error fetching categories and brands:", e.message);
		}
	}, []);

	useEffect(() => {
		fetchCategoriesAndBrands();
	}, [fetchCategoriesAndBrands]);

	//* Fetch Products by selected categories and brands
	const fetchProducts = useCallback(async () => {
		setLoading(true);
		try {
			//* Base URL for fetching products
			let url = `${import.meta.env.VITE_API_URL}/products`;
			const params = {};

			//* Update URL and params if any filter is applied
			const filtersApplied =
				selectedCategories.length ||
				selectedBrands.length ||
				selectedDiscount ||
				selectedLatest ||
				minPrice ||
				maxPrice ||
				selectedPriceAbove ||
				selectedPriceBelow;

			if (filtersApplied) {
				url = `${import.meta.env.VITE_API_URL}/query-multiple-categories`;

				if (selectedCategories.length) {
					params.category_id = selectedCategories.join(",");
				}
				if (selectedBrands.length) {
					params.brand_id = selectedBrands.join(",");
				}
				if (selectedDiscount) {
					params.has_discount = selectedDiscount;
				}
				if (selectedLatest) {
					params.is_latest = selectedLatest;
				}
				if (minPrice) {
					params.price_min = minPrice;
				}
				if (maxPrice) {
					params.price_max = maxPrice;
				}
				if (selectedPriceBelow) {
					params.price_condition = "under_300";
				}
				if (selectedPriceAbove) {
					params.price_condition = "above_300";
				}
			}

			//* Fetch products from the determined URL with the parameters
			const response = await axios.get(url, { params });

			//* Set products based on whether filters were applied
			setProducts(
				filtersApplied ? response.data.product_filter : response.data.product
			);
		} catch (error) {
			console.error("Error fetching products:", error.message);
		} finally {
			setLoading(false);
		}
	}, [
		selectedCategories,
		selectedBrands,
		selectedDiscount,
		selectedLatest,
		minPrice,
		maxPrice,
		selectedPriceBelow,
		selectedPriceAbove,
	]);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	//* Memorizing the products that existed
	const memoizedProducts = useMemo(() => {
		if (!products) return null;

		//* Guest or Login user Adding to Cart
		const addToCart = (productId) => {
			handleAddToCart(productId, currentUser, token, setItemsCart);
		};

		return products.map((product, key) => (
			<div
				key={key}
				className="border lg:max-w-4xl  h-1/2  flex flex-col  text-gray-700 bg-white shadow-lg mb-8 bg-clip-border rounded-xl lg:w-64  xs:w-54">
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
	}, [products, currentUser, token]);

	return (
		<>
			<div className="flex gap-20">
				<div className="flex flex-col shadow-2xl gap-8 p-8 ml-8 w-1/6 mb-8">
					<div className="filter-1 flex flex-col items-start justify-start gap-2">
						<div>
							<input
								id="default-radio-1"
								type="checkbox"
								checked={selectedPriceBelow}
								onChange={() => setSelectedPriceBelow(!selectedPriceBelow)}
								name="default-radio"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
							/>
							<label
								htmlFor="default-radio-1"
								className="ms-2 text-md font-medium text-black">
								Below $300
							</label>
						</div>

						<div>
							<input
								id="default-radio-1"
								type="checkbox"
								checked={selectedPriceAbove}
								onChange={() => setSelectedPriceAbove(!selectedPriceAbove)}
								name="default-radio"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
							/>
							<label
								htmlFor="default-radio-1"
								className="ms-2 text-md font-medium text-black">
								$300 - Above
							</label>
						</div>

						<div className="flex justify-start items-start mt-2 ">
							<div className="flex justify-start items-start w-full h-8">
								<input
									type="text"
									id="min-price"
									onChange={(e) => setMinPrice(e.target.value)}
									className=" p-1.5  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500  w-3/4  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Min Price"
									required
								/>
							</div>
							<div className="flex justify-start items-start w-full h-8">
								<input
									type="text"
									id="max-price"
									onChange={(e) => setMaxPrice(e.target.value)}
									className="p-1.5  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500  w-3/4  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Max Price"
									required
								/>
							</div>
						</div>
					</div>
					<hr className="container  h-0.5 border-t-0 bg-zinc-300" />

					{/**Product Listing */}
					<div className="filter-1 flex flex-col items-start justify-start gap-2">
						<div>
							<p className="font-semibold text-xl mb-3"> Product Category</p>
							{categories &&
								categories.map((dataCategory, key) => (
									<div key={key}>
										<input
											id="default-radio-1"
											type="checkbox"
											value={dataCategory.id}
											onChange={() => handleCategoryChange(dataCategory.id)}
											name="default-radio"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
										/>
										<label
											htmlFor="default-radio-1"
											className="ms-2 text-sm font-medium text-black">
											{dataCategory.name}
										</label>
									</div>
								))}
						</div>
					</div>
					<hr className="container  h-0.5 border-t-0 bg-zinc-300" />

					{/* */}

					<div className="filter-1 flex flex-col items-start justify-start gap-2">
						<div>
							<p className="font-semibold text-xl mb-3"> Product Brand</p>
							{brands &&
								brands.map((dataBrand, key) => (
									<div key={key}>
										<input
											id="default-radio-1"
											type="checkbox"
											value={dataBrand.id}
											onChange={() => handleBrandChange(dataBrand.id)}
											name="default-radio"
											className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
										/>
										<label
											htmlFor="default-radio-1"
											className="ms-2 text-sm font-medium text-black">
											{dataBrand.name}
										</label>
									</div>
								))}
						</div>
					</div>
					<hr className="container  h-0.5 border-t-0 bg-zinc-300" />

					{/* */}

					<div className="filter-1 flex flex-col items-start justify-start gap-2">
						<div>
							<p className="font-semibold text-xl mb-3"> Deal & Discount</p>
							<input
								id="default-radio-1"
								type="checkbox"
								checked={selectedDiscount}
								onChange={() => setSelectedDiscount(!selectedDiscount)}
								name="default-radio"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
							/>
							<label
								htmlFor="default-radio-1"
								className="ms-2 text-md font-medium text-black">
								Discount
							</label>
						</div>

						<div>
							<input
								id="default-radio-1"
								type="checkbox"
								value=""
								name="default-radio"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
							/>
							<label
								htmlFor="default-radio-1"
								className="ms-2 text-md font-medium text-black">
								Popular
							</label>
						</div>

						<div>
							<input
								id="default-radio-1"
								type="checkbox"
								checked={selectedLatest}
								onChange={() => setSelectedLatest(!selectedLatest)}
								name="default-radio"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
							/>
							<label
								htmlFor="default-radio-1"
								className="ms-2 text-md fo	nt-medium text-black">
								New Arrival
							</label>
						</div>
					</div>

					{/* */}
				</div>
				<div className="flex justify-start items-start">
					<div className="container mx-auto flex gap-8 flex-wrap max-w-2xl px-2 lg:max-w-7xl">
						{products && products.length > 0 ? (
							memoizedProducts
						) : (
							<>
								{loading ? (
									<div className="w-full flex justify-center items-center">
										<DisplayLoading />
									</div>
								) : (
									<p className="block antialiased text-center m-20 font-sans text-sm leading-normal text-black font-bold">
										There is no product on the list
									</p>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
