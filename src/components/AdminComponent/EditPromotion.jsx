import axios from "axios";
import { useState, useEffect, useCallback } from "react";
export default function EditPromotion({ closeModal, id }) {
	const [getPromotionById, setPromotionId] = useState([]);
	const [eventName, setEventName] = useState("");
	const [eventDescription, setEventDescription] = useState("");
	const getPromotionId = useCallback(async () => {
		const response = await axios.get(
			`${import.meta.env.VITE_API_URL}/promotions/${id}`
		);
		const product = response.data.promotion_products;
		setEventName(product.name);
		setEventDescription(product.description);
	}, [id]);

	useEffect(() => {
		getPromotionId();
	}, [getPromotionId]);
	return (
		<>
			<div className="absolute h-max flex justify-center z-10 w-full mt-8">
				<div className="flex justify-center items-center">
					<button
						type="button"
						onClick={closeModal}
						className="text-slate-100 hover:bg-slate-200 hover:text-slate-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center mb-4">
						<svg
							aria-hidden="true"
							className="w-5 h-5 text-black"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								clipRule="evenodd"></path>
						</svg>
					</button>
				</div>
				<div className="bg-white w-1/2 p-6 h-1/2 rounded shadow-md">
					<div className="flex justify-center items-center">
						<button
							type="button"
							onClick={closeModal}
							className="text-slate-100 hover:bg-slate-200 hover:text-slate-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center mb-4">
							<svg
								aria-hidden="true"
								className="w-5 h-5 text-black"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg">
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"></path>
							</svg>
						</button>
					</div>
					<form method="post">
						<div className="w-full flex justify-between items-center gap-4">
							<div className="mb-4 w-full">
								<label
									htmlFor="name"
									className="block text-gray-700 text-sm font-bold mb-2">
									Event Name
								</label>
								<input
									type="text"
									name="name"
									value={eventName}
									className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
								/>
							</div>
						</div>

						<div className="w-full flex justify-between items-center gap-4">
							<div className="mb-4 w-full">
								<label
									htmlFor="description"
									className="block text-gray-700 text-sm font-bold mb-2">
									Event Description
								</label>
								<input
									value={eventDescription}
									type="text"
									name="description"
									className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
								/>
							</div>
						</div>

						<div className="mb-4 w-full">
							<label
								htmlFor="products"
								className="block text-gray-700 text-sm font-bold mb-2">
								Select Product
							</label>
						</div>

						<div className="w-full flex justify-between items-center gap-4">
							<div className="w-full">
								<button
									type="submit"
									className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
									Confirm
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
