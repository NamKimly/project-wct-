import axios from "axios";
import authToken from "./../../../utils/authToken";
import { useState, useEffect } from "react";
export default function ApproveOrder() {
	const [order, setOrder] = useState([]);
	const [status, setStatus] = useState("");
	const token = authToken();

	const fetchOrder = async (status) => {
		try {
			let url = `${import.meta.env.VITE_API_URL}/orders/approve/detail`;

			if (status) {
				url = `${import.meta.env.VITE_API_URL}/orders/status/find`;
			}

			const response = await axios.get(url, {
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
				params: {
					status: status,
				},
			});

			setOrder(response.data.orders);
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		fetchOrder(status);
	}, [status]);

	console.log(order);
	const handleAcceptOrder = async (id) => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/orders/${id}/approve`,
				{},
				{
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(response.data.message);
		} catch (err) {
			console.log("Cannot approve the order: " + err.message);
		}
	};

	console.log(status);

	//* Reject Order
	const handleRejectOrder = async (id) => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/orders/${id}/reject`,
				{},
				{
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(response.data.message);
		} catch (err) {
			console.log("Cannot reject the order: " + err.message);
		}
	};

	return (
		<>
			<div className="w-1/4 mb-4 p-4">
				<label
					htmlFor="email"
					className="block text-gray-700 text-sm font-bold mb-2">
					Status
				</label>
				<select
					onChange={(e) => setStatus(e.target.value)}
					id="countries"
					className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
					<option selected value="pending">
						Pending
					</option>
					<option value="approved">Approve</option>
					<option value="rejected">Rejected</option>
				</select>
			</div>
			<table className="min-w-full divide-y divide-gray-200 overflow-x-auto mt-8 ">
				<thead className="bg-gray-50">
					<tr>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Name
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Email
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Phone Number
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Address
						</th>

						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Paid
						</th>

						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Product
						</th>

						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Status
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{order.length > 0 ? (
						order.map((orderDetail, key) => (
							<tr key={key}>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="flex items-center">
										<div className="flex-shrink-0 h-10 w-10">
											<img
												className="h-10 w-10 rounded-full"
												src="https://i.pravatar.cc/150?img=1"
												alt=""
											/>
										</div>
										<div className="ml-4">
											<div className="text-sm font-medium text-gray-900">
												{orderDetail.user.name}
											</div>
										</div>
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{orderDetail.user.email}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{orderDetail.user.mobile_no}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									{orderDetail.address}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
									${orderDetail.total}
								</td>

								<td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500 overflow-x-auto">
									<div className="flex  flex-col gap-4 flex-nowrap">
										{orderDetail.order_items.map((item) => (
											<div
												key={item.id}
												className="flex justify-start items-center mr-4">
												<img
													src={item.product.images}
													alt={item.product.name}
													loading="lazy"
													className="w-16 h-16 object-fill"
												/>
												<p className="ml-2"> {item.product.name} </p>
												<p className="ml-2"> ({item.quantity}) </p>
											</div>
										))}
									</div>
								</td>

								<td className="px-6 py-4 whitespace-nowrap">
									{orderDetail.status === "pending" && (
										<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-300 text-white">
											{orderDetail.status}
										</span>
									)}

									{orderDetail.status === "approved" && (
										<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-500 text-white">
											{orderDetail.status}
										</span>
									)}
									{orderDetail.status === "rejected" && (
										<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-500 text-white">
											{orderDetail.status}
										</span>
									)}
								</td>

								<td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
									<button
										onClick={() => handleAcceptOrder(orderDetail.id)}
										type="button"
										className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
										Accept
									</button>
									<button
										onClick={() => handleRejectOrder(orderDetail.id)}
										type="button"
										className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
										Reject
									</button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td
								colSpan="7"
								className="p-4 border-b border-blue-gray-50 text-center">
								<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
									There is no order on the list
								</p>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</>
	);
}
