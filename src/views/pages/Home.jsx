import { Link } from "react-router-dom";
import { product } from "./../../data/mock-data";
import { useEffect, useState, useCallback, useMemo } from "react";
import { handleAddToCart } from "./../../utils/HandleCart";
import { finalPrice } from "./../../utils/DiscountFunction";
import getCurrentUser from "../../utils/getCurrentUser";
import authToken from "./../../utils/authToken";
import SliderBanner from "../../components/SliderBanner";
import transport from "./../../assets/transport.png";
import service from "./../../assets/service.png";
import protect from "./../../assets/protect.png";
import PromotionPage from "./PromotionPage";
import axios from "axios";
import Slider from "react-slick";

const settings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 4,
	slidesToScroll: 3,
};
const NewArrival = () => {
	return (
		<>
			<div className="flex justify-center items-center w-full gap-8 px-28">
				<div className="flex justify-start items-center gap-4">
					<div className="bg-red-600 w-4 h-8 rounded-sm"></div>
					<p className="font-semibold ">New Arrival</p>
				</div>
				<div className="w-1/2">
					<img
						src="https://marketplace.canva.com/EAFED0hv9G0/1/0/1600w/canva-blue-pink-modern-special-offer-sale-banner-J5VkNReQ8WA.jpg"
						alt="#"
						className="max-w-full h-full rounded-lg hover:scale-105 transition-transform duration-300 transform"
					/>
				</div>
				<div className="flex flex-col w-1/2 gap-8">
					<div className="w-full h-full">
						<img
							src="https://t4.ftcdn.net/jpg/04/89/28/05/360_F_489280525_nISHfaWCctYBFlyYkTQUkzQwVOPWmyvp.jpg"
							alt="#"
							className="max-w-full rounded-lg hover:scale-105 transition-transform duration-300 transform	"
						/>
					</div>
					<div className="flex justify-center items-center gap-8">
						<div className="w-1/2 ">
							<img
								src="https://i.pinimg.com/736x/f0/f9/e4/f0f9e45724771f16745ad3f6f640d3ce.jpg"
								alt="#"
								className="max-w-full rounded-lg hover:scale-105 transition-transform duration-300 transform"
							/>
						</div>
						<div className="w-1/2">
							<img
								src="https://s.tmimgcdn.com/scr/1200x750/375400/special-sale-on-electronic-devices-banner-design-template-2_375421-original.jpg"
								alt="#"
								className="max-w-full rounded-lg hover:scale-105 transition-transform duration-300 transform"
								loading="lazy"
							/>
						</div>
					</div>
				</div>
			</div>
			<hr className="cotainer my-12 mx-28 h-0.5 border-t-0 bg-zinc-300" />
		</>
	);
};

const CategoryCarosouel = ({ product }) => {
	const [category, setCategory] = useState([]);

	const fetchCategory = useCallback(async () => {
		try {
			const getCategory = await axios.get(
				`${import.meta.env.VITE_API_URL}/category`
			);
			setCategory(getCategory.data.category);
		} catch (error) {
			console.error("Failed to fetch data:", error);
		}
	}, []);

	useEffect(() => {
		fetchCategory();
	}, [fetchCategory]);

	return (
		<>
			<div className="flex justify-center items-start mx-8 gap-4 flex-wrap">
				<div className="category ml-8">
					<p className="font-bold text-2xl mb-8">Kitchen Appliances</p>

					<div className="flex justify-start items-start flex-col gap-3 ">
						{category &&
							category.map((item, key) => (
								<ul key={key} className="text-sm ">
									<Link to={`/product/category_id/${item.id}`}>
										{item.name}
									</Link>
								</ul>
							))}
					</div>
				</div>
				<div className="inline-block h-[21rem] min-h-[1.5rem] w-px self-stretch bg-zinc-300 ml-4"></div>

				<SliderBanner slides={product} />
			</div>
		</>
	);
};

const DiscountProductListing = () => {
	const [getDiscountProduct, setDiscountProduct] = useState(null);
	const [itemsCart, setItemsCart] = useState([]);

	const getUser = getCurrentUser();
	const token = authToken();
	const fetchProduct = useCallback(async () => {
		try {
			const getProduct = await axios.get(
				`${import.meta.env.VITE_API_URL}/discount`
			);
			setDiscountProduct(getProduct.data.discounts);
		} catch (error) {
			console.error("Failed to fetch data:", error);
		}
	}, []);

	useEffect(() => {
		fetchProduct();
	}, [fetchProduct]);

	const memoizedProducts = useMemo(() => {
		if (!getDiscountProduct) return null;
		const addToCart = (productId) => {
			handleAddToCart(productId, getUser, token, setItemsCart);
		};
		return getDiscountProduct.map((products, key) => (
			<div
				key={key}
				className="border lg:max-w-3xl h-1/6 flex flex-col text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl lg:w-60">
				<div className="flex relative h-52 mx-4 mt-4 overflow-hidden text-white bg-clip-border rounded-md shadow-blue-gray-500/40">
					<div className="w-full h-full flex justify-center items-center m-4">
						<img
							src={products.product.images}
							alt="card-image"
							className="max-w-44 object-fill object-center lg:h-3/4 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
						/>
					</div>
					<div className="absolute bg-red-500 w-24 h-8 rounded-md flex justify-center items-center gap-2 m-3">
						<i className="fa-solid fa-tag text-xs"></i>
						<p className="text-white text-sm font-semibold">
							{parseInt(products.percentage)}% off
						</p>
					</div>
				</div>

				<div className="p-6">
					<p className="block mb-2 font-sans lg:text-lg md:text-base antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
						{products.product.name}
					</p>
					<p className="block font-sans text-sm antialiased font-light leading-relaxed text-inherit text-blue-gray-900">
						Type: {products.product.category}
					</p>
					<div className="flex gap-4 justify-start items-center">
						<del className="block mt-4 font-sans text-sm text-black antialiased font-semibold leading-relaxed text-inherit">
							${products.product.price}
						</del>

						<p className="block mt-4 font-sans text-sm text-red-500 antialiased font-semibold leading-relaxed text-inherit">
							{finalPrice(products.product.price, products.percentage)}
						</p>
					</div>
				</div>
				<div className="flex justify-between items-center p-6 pt-0">
					<button
						onClick={() => addToCart(products.product.id)}
						className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
						type="button">
						Add To Cart
					</button>
					<div className="flex justify-center items-center gap-4">
						<i className="far fa-heart cursor-pointer md:text-sm"></i>
						<Link to={`/productdetail/${products.product.id}`}>
							<i className="fas fa-eye text-black cursor-pointer md:text-sm"></i>
						</Link>
					</div>
				</div>
			</div>
		));
	}, [getDiscountProduct, getUser, token]);

	return (
		<>
			<div className="flex flex-col mt-16  px-28">
				<div className="flex justify-start items-center gap-4">
					<div className="bg-red-600 w-4 h-8 rounded-sm"></div>
					<p className="font-semibold ">Discount</p>
				</div>
				<p className="font-bold text-3xl mt-4">Discount Products</p>
				<div className="flex justify-start items-center gap-20 mt-8 flex-wrap ">
					{getDiscountProduct && memoizedProducts}
				</div>
			</div>
			<hr className="cotainer my-12 mx-28 h-0.5 border-t-0 bg-zinc-300" />
		</>
	);
};

const AllProductListing = () => {
	const [products, setProducts] = useState(null);
	const [itemsCart, setItemsCart] = useState([]);

	const getUser = getCurrentUser();
	const token = authToken();

	const fetchProduct = useCallback(async () => {
		try {
			const getProduct = await axios.get(
				`${import.meta.env.VITE_API_URL}/products`
			);
			setProducts(getProduct.data.product);
		} catch (error) {
			console.error("Failed to fetch data:", error);
		}
	}, []);

	useEffect(() => {
		fetchProduct();
	}, [fetchProduct]);

	const memoizedProducts = useMemo(() => {
		if (!products) return null;
		const addToCart = (productId) => {
			handleAddToCart(productId, getUser, token, setItemsCart);
		};
		return products.map((product, key) => (
			<div
				key={key}
				className="flex z-10 justify-center items-center gap-32 mt-8 mb-8">
				<div className="lg:max-w-3xl border h-1/6 flex flex-col text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl lg:w-60">
					<div className="flex relative h-52 mx-4 mt-4 overflow-hidden text-white bg-clip-border rounded-md shadow-blue-gray-500/40">
						<div className="w-full h-full flex justify-center items-center m-4">
							<img
								src={product.images}
								alt="card-image"
								className="max-w-44 object-fill object-center lg:h-3/4 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
							/>
						</div>
					</div>

					<div className="p-6">
						<p className="block mb-2 font-sans lg:text-lg md:text-base antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
							{product.name}
						</p>
						<p className="block font-sans text-sm antialiased font-light leading-relaxed text-inherit text-blue-gray-900">
							Type: {product.category.name}
						</p>
						<p className="block mt-4 font-sans text-lg text-red-500 antialiased font-semibold leading-relaxed text-inherit">
							${product.price}
						</p>
					</div>
					<div className="flex justify-between items-center p-6 pt-0">
						<button
							onClick={() => addToCart(product.id)}
							className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
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
			</div>
		));
	}, [products, getUser, token]);

	return (
		<>
			<div className="flex flex-col mt-16  px-28">
				<div className="flex justify-start items-center gap-4">
					<div className="bg-red-600 w-4 h-8 rounded-sm"></div>
					<p className="font-semibold ">Products</p>
				</div>
				<p className="font-bold text-3xl mt-4">Explore All Products</p>
				<Slider className="w-full" {...settings}>
					{products && memoizedProducts}
				</Slider>

				<div className="flex justify-center items-center">
					<Link
						to={"/shop"}
						className="flex justify-center items-center gap-2 mt-12 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-md bg-red-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
						type="button">
						See more
						<i className="fa-solid fa-arrow-right-to-bracket"></i>
					</Link>
				</div>
			</div>
			<hr className="cotainer my-12 mx-28 h-0.5 border-t-0 bg-zinc-300" />
		</>
	);
};

const LastestProductListing = () => {
	const [products, setProducts] = useState(null);
	const [newArrival, setNewArrival] = useState(true);
	const [itemsCart, setItemsCart] = useState([]);

	const getUser = getCurrentUser();
	const token = authToken();

	const fetchProduct = useCallback(async () => {
		try {
			const getProduct = await axios.get(
				`${import.meta.env.VITE_API_URL}/products`
			);
			const allProducts = getProduct.data.product;

			// Filter products based on is_new_arrival
			const newArrivals = allProducts.filter(
				(product) => product.is_new_arrival === 1
			);
			const otherProducts = allProducts.filter(
				(product) => product.is_new_arrival === 0
			);

			setProducts(newArrival ? newArrivals : otherProducts);
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	}, [newArrival]);

	useEffect(() => {
		fetchProduct();
	}, [fetchProduct]);

	const memoizedProducts = useMemo(() => {
		if (!products) return null;
		const addToCart = (productId) => {
			handleAddToCart(productId, getUser, token, setItemsCart);
		};
		return products.map((product, key) => (
			<div
				key={key}
				className="flex z-10 justify-center items-center gap-32 mt-8 mb-8">
				<div className="lg:max-w-3xl border h-1/6 flex flex-col text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl lg:w-60">
					<div className="flex relative h-52 mx-4 mt-4 overflow-hidden text-white bg-clip-border rounded-md shadow-blue-gray-500/40">
						<div className="w-full h-full flex justify-center items-center m-4">
							<img
								src={product.images}
								alt="card-image"
								className="max-w-44 object-fill object-center lg:h-3/4 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
							/>
						</div>
						<div className="absolute bg-green-500 w-24 h-8 rounded-md flex justify-center items-center gap-2 m-2">
							<p className="text-white text-xs font-bold">New Arrival</p>
						</div>
					</div>

					<div className="p-6">
						<p className="block mb-2 font-sans lg:text-lg md:text-base antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
							{product.name}
						</p>
						<p className="block font-sans text-sm antialiased font-light leading-relaxed text-inherit text-blue-gray-900">
							Type: {product.category.name}
						</p>
						<p className="block mt-4 font-sans text-sm text-red-500 antialiased font-semibold leading-relaxed text-inherit">
							${product.price}
						</p>
					</div>
					<div className="flex justify-between items-center p-6 pt-0">
						<button
							onClick={() => addToCart(product.id)}
							className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
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
			</div>
		));
	}, [products, getUser, token]);

	return (
		<>
			<div className="flex flex-col mt-16  px-28">
				<div className="flex justify-start items-center gap-4">
					<div className="bg-red-600 w-4 h-8 rounded-sm"></div>
					<p className="font-semibold ">Products</p>
				</div>
				<p className="font-bold text-3xl mt-4">New Arrival </p>
				<div className="flex justify-cente items-center gap-20">
					{products && memoizedProducts}
				</div>
			</div>
			<hr className="cotainer my-12 mx-28 h-0.5 border-t-0 bg-zinc-300" />
		</>
	);
};
const ProductByBrand = () => {
	const [brand, setBrand] = useState(null);
	useEffect(() => {
		const fetchBrand = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/brand`
				);
				setBrand(response.data.brand);
			} catch (err) {
				console.log(err.message);
			}
		};
		fetchBrand();
	}, []);

	return (
		<>
			<div className="flex flex-col mt-16  px-28">
				<div className="flex justify-start items-center gap-4">
					<div className="bg-red-600 w-4 h-8 rounded-sm"></div>
					<p className="font-semibold ">Brand</p>
				</div>
				<p className="font-bold text-3xl mt-4">Choose By Brands</p>

				<div className="flex flex-wrap justify-center items-center gap-4 text-center mt-12 md:w-full sm:w-1/4 xs:1/6 ">
					{brand &&
						brand.map((item, key) => (
							<div key={key} className="p-4">
								<Link to={`/product/brand_id/${item.id}`}>
									<div className="w-[8rem] h-[5rem] flex flex-col justify-center items-center border border-gray-600 px-2 rounded-md transform transition duration-500 hover:scale-110">
										<div className="h-1/2 flex justify-center items-center">
											<img
												src={item.logo_url}
												className="w-full px-4"
												alt="#"
											/>
										</div>
									</div>
								</Link>
							</div>
						))}
				</div>
			</div>
		</>
	);
};
const ShopInformation = () => {
	return (
		<>
			<div className="container flex justify-center items-center gap-20 mb-12 flex-wrap">
				<div className="flex flex-col justify-center items-center gap-1.5">
					<img src={transport} alt="#" className="size-16" />
					<p className="font-semibold">FREE AND FAST DELIVERY</p>
					<p>Free delivery for all orders over $140</p>
				</div>
				<div className="flex flex-col justify-center items-center gap-1.5">
					<img src={service} alt="#" className="size-16" />
					<p className="font-semibold">24/7 CUSTOMER SERVICE</p>
					<p>Friendly 24/7 customer support</p>
				</div>
				<div className="flex flex-col justify-center items-center gap-1.5">
					<img src={protect} alt="#" className="size-16" />
					<p className="font-semibold">MONEY BACK GUARANTEE</p>
					<p>We return money within 30 days</p>
				</div>
			</div>
		</>
	);
};

export default function Home() {
	return (
		<>
			<CategoryCarosouel product={product} />
			<div className="lex flex-col justify-center items-center">
				<PromotionPage />
				<ProductByBrand />
				<DiscountProductListing />
				<NewArrival />
				<LastestProductListing />
				<AllProductListing />
				<ShopInformation />
			</div>
		</>
	);
}
