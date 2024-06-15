import axios from "axios";
import getCurrentUser from "../../utils/getCurrentUser";
import authToken from "../../utils/authToken";
import formatDate from "./../../utils/formatDate";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function HistoryOrder({ onMailUpdate }) {
	const token = authToken();
	const currentUser = getCurrentUser();
	const [open, setOpen] = useState(true);
	const [pending, setPending] = useState([]);

	useEffect(() => {
		const getUserOrderPending = async () => {
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
				const pendingOrders = getOrder.filter(
					(order) => order.status === "pending"
				);
				setPending(pendingOrders);
				onMailUpdate();
			} catch (err) {
				console.log(err.message);
			}
		};
		getUserOrderPending();
	}, [token, currentUser?.id, onMailUpdate]);
	console.log(pending);
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full">
								<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
									<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
										<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
											<div className="flex items-start justify-between">
												<Dialog.Title className="text-lg font-medium text-gray-900">
													Pending Order
												</Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
														onClick={() => setOpen(false)}>
														<span className="absolute -inset-0.5" />
														<span className="sr-only">Close panel</span>
														<XMarkIcon className="h-6 w-6" aria-hidden="true" />
													</button>
												</div>
											</div>

											<div className="mt-8">
												<div className="flow-root overflow-y-auto">
													<ul
														role="list"
														className="-my-6 divide-y divide-gray-200">
														{pending && pending.length > 0 ? (
															pending.map((order, key) => (
																<div key={key}>
																	<div className="mt-8">
																		<div className="flex justify-start items-center gap-2">
																			<p className="font-semibold text-base leading-7 text-black">
																				Order Id:
																			</p>
																			<span className="text-indigo-600 font-medium">
																				# {order.id}
																			</span>
																		</div>
																		<div className="font-semibold text-base leading-7 text-black mt-4">
																			<p className="font-semibold text-base leading-7 text-black">
																				Order Date:{" "}
																			</p>
																			<span className="text-gray-400 font-medium">
																				{formatDate(order.created_at)}
																			</span>
																		</div>
																	</div>
																	{order.order_items.map((item, itemKey) => (
																		<li key={itemKey} className="flex py-6">
																			<div className="flex justify-center items-center gap-4">
																				<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
																					<img
																						src={item.product.images}
																						alt="Product image"
																						className="h-full w-full object-cover object-center"
																					/>
																				</div>
																			</div>
																			<div className="ml-4 flex flex-1 flex-col">
																				<div>
																					<div className="flex justify-between text-base font-medium text-gray-900">
																						<h3>
																							<a href="#">
																								{item.product.name}
																							</a>
																						</h3>
																						<p className="ml-4">
																							${item.product.price}
																						</p>
																					</div>
																				</div>
																				<div className="flex flex-1 items-end justify-between text-sm">
																					<p className="text-gray-500">
																						qty: {item.quantity}
																					</p>
																					<div className="flex gap-3 lg:block">
																						<p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-orange-400 text-white">
																							{order.status}
																						</p>
																					</div>
																				</div>
																			</div>
																		</li>
																	))}
																</div>
															))
														) : (
															<p className="visible absolute m-2">
																You dont have any order product.
															</p>
														)}
													</ul>
												</div>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
