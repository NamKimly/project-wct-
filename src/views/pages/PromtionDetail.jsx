import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";

export default function PromotionDetail() {
	const { promotionID } = useParams();
	const [promotion, setPromotion] = useState([]);
	const [products, setProducts] = useState([]);

	const fetchPromotionById = useCallback(async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/promotions/${promotionID}`
			);
			setPromotion(response.data.promotion_products);
			setProducts(response.data.promotion_products.products);
		} catch (err) {
			console.log(err.message);
		}
	}, [promotionID]);

	useEffect(() => {
		fetchPromotionById();
	}, [fetchPromotionById]);

	return (
		<section className="py-12 sm:py-16">
			<div className="container mx-auto px-4">
				<div className="flex justify-center items-center flex-col lg:col-span-2 lg:row-span-3 lg:row-end-2">
					<h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
						{promotion.name}
					</h1>

					<div className="mt-5 flex items-center">
						<p className="ml-2 text-ls font-medium text-gray-500">
							{promotion.description}
						</p>
					</div>

					<div className="mt-5 flex items-center">
						<div className=" leading-relaxed flex justify-start items-start gap-4">
							<p className="text-lg title-font text-gray-500 tracking-widest">
								Price
							</p>
							<p className="font-bold text-xl text-red-500">
								${promotion.total_price}
							</p>
						</div>
					</div>

					<div className="flex justify-center mt-8 items-center gap-4">
						<button className="px-4 py-2 w-[8rem]  text-center font-semibold text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
							Add to Cart
						</button>
						<button className="flex justify-center w-[8rem] bg-red-500 hover:bg-red-600 font-semibold text-white border-0 py-2 px-4 focus:outline-none rounded ">
							Buy Now
						</button>
					</div>

					<ul className="mt-8 space-y-2">
						<li className="flex items-center text-left text-sm font-medium text-gray-600">
							<svg
								className="mr-2 block h-5 w-5 align-middle text-gray-500"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									className=""></path>
							</svg>
							Special Offers for this year
						</li>

						<li className="flex items-center text-left text-sm font-medium text-gray-600">
							<svg
								className="mr-2 block h-5 w-5 align-middle text-gray-500"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
									className=""></path>
							</svg>
							Cancel Anytime
						</li>
					</ul>
				</div>
				<div className="flex justify-center items-center gap-20 mt-4 flex-wrap">
					{products.map((item, key) => (
						<div
							key={key}
							className="flex z-10 justify-center items-center gap-32 my-4">
							<div className="lg:max-w-3xl border h-1/6 flex flex-col text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl lg:w-60">
								{item.pivot.is_free === 1 && (
									<div className="absolute bg-green-500 w-24 h-8 rounded-md flex justify-center items-center gap-2 m-3">
										<p className="text-white text-sm font-semibold">Free</p>
									</div>
								)}
								<div className="flex relative h-52 mx-4 mt-4 overflow-hidden text-white bg-clip-border rounded-md shadow-blue-gray-500/40">
									<div className="w-full h-full flex justify-center items-center m-4">
										<img
											src={item.images}
											alt="card-image"
											className="max-w-44 object-fill object-center lg:h-3/4 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
										/>
									</div>
								</div>

								<div className="p-6 flex flex-col justify-start items-start">
									<p className="block font-sans text-xs font-semibold antialiased  leading-relaxed text-inherit text-blue-gray-900">
										{item.brand.name}
									</p>
									<p className="block mb-2 font-sans lg:text-lg md:text-base antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
										{item.name}
									</p>
									<p className="block font-sans text-sm antialiased font-light leading-relaxed text-inherit text-blue-gray-900">
										{item.category.name}
									</p>
									<div className="flex mt-4 w-full justify-between items-center gap-4">
										<p className="block font-sans text-lg text-red-500 antialiased font-semibold leading-relaxed text-inherit">
											${item.price}
										</p>
										<Link
											className="flex justify-center items-center"
											to={`/productdetail/${item.id}`}>
											<i className="fas fa-eye text-black cursor-pointer md:text-sm"></i>
										</Link>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
