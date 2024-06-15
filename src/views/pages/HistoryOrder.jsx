import axios from "axios";
import getCurrentUser from "../../utils/getCurrentUser";
import authToken from "../../utils/authToken";
import formatDate from "../../utils/formatDate";
import { useState, useEffect } from "react";

export default function HistoryOrder() {
	const currentUser = getCurrentUser();
	const token = authToken();
	const [historyOrder, setHistoryOrder] = useState([]);
	useEffect(() => {
		const getUserOrder = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/orders/user/${currentUser?.id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const getOrder = response.data.orders;

				setHistoryOrder(getOrder);
			} catch (err) {
				console.log(err.message);
			}
		};
		getUserOrder();
	}, [token, currentUser?.id]);
	console.log(historyOrder);
	return (
		<>
			<section className="py-20 relative">
				<div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
					<h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
						Order History
					</h2>
					<p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
						Thanks for making a purchase you can check our order summary frm
						below
					</p>
					<div className="main-box flex flex-col gap-12 border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
						{historyOrder &&
							historyOrder.map((order, key) => (
								<>
									<div key={key}>
										<div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
											<div className="data">
												<p className="font-semibold text-base leading-7 text-black">
													Order Id:
													<span className="text-indigo-600 font-medium">
														# {order.id}
													</span>
												</p>
												<p className="font-semibold text-base leading-7 text-black mt-4">
													Order Date:
													<span className="text-gray-400 font-medium">
														{formatDate(order.created_at)}
													</span>
												</p>
											</div>
										</div>

										{order.order_items.map((item, key) => (
											<div key={key} className="w-full px-3 min-[400px]:px-6">
												<div className="flex flex-col lg:flex-row items-center py-6  gap-6 w-full">
													<div className="img-box max-lg:w-full">
														<img
															src={item.product.images}
															alt="Premium Watch image"
															className="aspect-square w-full lg:max-w-[140px]"
														/>
													</div>
													<div className="flex flex-row items-center w-full ">
														<div className="grid grid-cols-1 lg:grid-cols-2 w-full">
															<div className="flex items-center">
																<div className="">
																	<h2 className="font-semibold text-xl leading-8 text-black mb-3">
																		<p
																			key={key}
																			className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
																			{item.product.name}
																		</p>
																		<div className="flex items-center ">
																			<p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
																				Category
																				<span className="text-gray-500">
																					{item.product.category.name}
																				</span>
																			</p>
																			<p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
																				Brand
																				<span className="text-gray-500">
																					{item.product.brand.name}
																				</span>
																			</p>
																			<p className="font-medium text-base leading-7 text-black ">
																				Qty:
																				<span className="text-gray-500">
																					{item.quantity}
																				</span>
																			</p>
																		</div>
																	</h2>
																</div>
															</div>
															<div className="grid grid-cols-5">
																<div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
																	<div className="flex gap-3 lg:block">
																		<p className="font-medium text-sm leading-7 text-black">
																			price
																		</p>
																		<p className="lg:mt-4 font-bold text-sm leading-7 text-indigo-600">
																			${item.product.price}
																		</p>
																	</div>
																</div>
																<div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
																	<div className="flex gap-3 lg:block">
																		<p className="font-medium text-sm leading-7 text-black">
																			Status
																		</p>
																		{order.status === "pending" && (
																			<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-300 text-white">
																				{order.status}
																			</span>
																		)}

																		{order.status === "approved" && (
																			<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white">
																				{order.status}
																			</span>
																		)}
																		{order.status === "rejected" && (
																			<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-white">
																				{order.status}
																			</span>
																		)}
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										))}
									</div>
									<div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
										<p className="font-semibold text-lg text-black py-6">
											Total Price:{" "}
											<span className="text-indigo-600">${order.total}</span>
										</p>
									</div>
								</>
							))}
					</div>
				</div>
			</section>
		</>
	);
}
