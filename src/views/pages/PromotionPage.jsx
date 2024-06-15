import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
export default function PromotionPage() {
	const [promotion, setPromotion] = useState([]);

	const fetchPromotion = useCallback(async () => {
		const response = await axios.get(
			`${import.meta.env.VITE_API_URL}/promotions`
		);
		setPromotion(response.data.promotion_products);
	}, []);
	useEffect(() => {
		fetchPromotion();
	}, [fetchPromotion]);
	return (
		<>
			{promotion &&
				promotion.map((items, key) => (
					<div key={key} className="relative overflow-hidden bg-white mt-24">
						<div className="flex justify-start px-28 items-center gap-4">
							<div className="bg-red-600 w-4 h-8 rounded-sm"></div>
							<p className="font-semibold "> Promotion</p>
						</div>
						<div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
							<div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
								<div className="sm:max-w-lg">
									<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
										{items.name}
									</h1>
									<p className="mt-4 text-xl text-gray-500">
										{items.description}
									</p>
								</div>
								<div>
									<div className="mt-10">
										<div
											aria-hidden="true"
											className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
											<div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
												<div className="flex items-center space-x-6 lg:space-x-8">
													<div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
														<div className="h-64 w-full overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
															<img
																src={items.products[0].images}
																alt=""
																className="h-full w-10/12 object-fill object-center"
															/>
														</div>
													</div>
													<div className="grid flex-shrink-0 grid-cols-1 gap-y-8 lg:gap-y-8">
														<div className="h-64 w-full overflow-hidden rounded-lg">
															<img
																src={items.products[1].images}
																alt=""
																className="h-full w-10/12 object-fill object-center"
															/>
														</div>
														{items.products[2] && (
															<div className="h-64 w-full overflow-hidden rounded-lg">
																<img
																	src={items?.products[2]?.images}
																	alt=""
																	className="h-full w-10/12 object-fill object-center"
																/>
															</div>
														)}
													</div>
													<hr className="cotainer my-12 mx-28 h-0.5 border-t-0 bg-zinc-300" />
												</div>
											</div>
										</div>

										<Link
											to={`promotion/detail/${items.id}`}
											className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700">
											View
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
		</>
	);
}
