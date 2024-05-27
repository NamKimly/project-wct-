import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import DisplayLoading from "../../components/DisplayLoading";

export default function ProductDetail() {
	const { productID } = useParams();
	const [getProductId, setGetProductId] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProductById = async () => {
			try {
				const getProduct = await axios.get(
					`${import.meta.env.VITE_API_URL}/products/${productID}`
				);
				setGetProductId(getProduct.data.product);
				setLoading(false);
			} catch (error) {
				setError("Failed to fetch product data");
				setLoading(false);
			}
		};

		fetchProductById();
	}, [productID]);
	const finalPrice = (currentPrice, percentage) => {
		return (currentPrice * (1 - percentage * 0.01)).toFixed(2);
	};

	if (loading) return <DisplayLoading />;
	if (error) return <div>{error}</div>;

	return (
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
				<div className="w-full mx-auto flex justify-center gap-24 items-center flex-wrap mt-12">
					<div className="h-full w-[22rem] flex justify-start items-start">
						<img
							alt="ecommerce"
							className="object-cover h-full w-96  lg:w-full sm:w-1/2"
							src={getProductId.images}
						/>
					</div>
					<div className="lg:w-2/5  w-full flex justify-center items-center flex-col  lg:py-6 mt-4 lg:mt-0 mr-54">
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
								<a className="ml-2 text-gray-500">
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
						<p className="leading-relaxed">{getProductId.description}</p>

						<div className="flex justify-center  items-center gap-8  mt-8">
							<span className="title-font font-bold text-2xl text-gray-900">
								$
								{getProductId.discount
									? finalPrice(
											getProductId.price,
											getProductId.discount.percentage
									  )
									: getProductId.price}
							</span>
							<Link
								to={"/payment"}
								className="flex justify-center w-1/2 text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded">
								Buy Now
							</Link>
							<button className="rounded-full w-12 h-8 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
								<svg
									fill="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="w-5 h-5"
									viewBox="0 0 24 24">
									<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
