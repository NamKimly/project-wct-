import axios from "axios";
import { useState, useEffect } from "react";

let token = localStorage.getItem("token") ?? "";
token = token.replace(/"/g, "");
export default function AddDiscountModal({ closeModal, id, updateProduct }) {
	const [getPercentage, setPercentage] = useState(null);
	const [inputPercentage, setInputPercentage] = useState(0); // Initialize inputPercentage to 0
	const [getProductName, setProductName] = useState("");
	const [getIdDiscount, setIdDiscount] = useState(null);

	//* Getting the product percentage, name, and the discountID from the product
	useEffect(() => {
		const fetchingProduct = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/products/${id}`
				);
				setPercentage(
					response.data.product.discount
						? response.data.product.discount.percentage
						: null
				);
				setProductName(response.data.product.name);
				setIdDiscount(
					response.data.product.discount
						? response.data.product.discount.id
						: null
				);
			} catch (err) {
				console.log(err.message);
			}
		};
		fetchingProduct();
	}, [id]);

	console.log(getPercentage);

	//* Post and Edit on percentage of the product
	const handleAddDiscount = async (e) => {
		e.preventDefault();

		try {
			let url;
			//* If the product has the discount percentage we could edit the percentage
			if (getPercentage === null) {
				url = `${import.meta.env.VITE_API_URL}/products/${id}/discounts`;
			} else {
				url = `${import.meta.env.VITE_API_URL}/discounts/${getIdDiscount}`;
			}

			const response = await axios({
				method: getPercentage === null ? "post" : "put",
				url: url,
				headers: {
					Accept: `application/json`,
					Authorization: `Bearer ${token}`,
				},
				data: {
					name: getProductName,
					percentage: inputPercentage, // Use inputPercentage instead of getPercentage
				},
			});

			if (getPercentage === null) {
				console.log("Discount added successfully:", response.data);
			} else {
				console.log("Discount updated successfully:", response.data);
			}

			closeModal();
			updateProduct();
		} catch (error) {
			console.error("Error adding or updating discount:", error.message);
		}
	};

	const handleDeleteDiscount = async () => {
		if (getIdDiscount) {
			try {
				const response = await axios.delete(
					`${import.meta.env.VITE_API_URL}/discounts/delete/${getIdDiscount}`,
					{
						headers: {
							Accept: `application/json`,
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log(response.data.message);
				updateProduct();
			} catch (err) {
				console.log(err.message);
			}
		} else {
			console.log("There is no discount to delete");
		}
	};

	return (
		<>
			<div className="absolute z-40 w-full flex items-center justify-center mt-4">
				<div className="bg-white w-1/2 p-6 h-1/2 rounded shadow-md">
					{/**  Modal content */}
					<form onSubmit={handleAddDiscount}>
						<div className="flex justify-end items-end">
							{/* Close button */}
							<button
								type="button"
								onClick={closeModal}
								className="text-black-100 hover:bg-slate-200 hover:text-slate-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center mb-4">
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
						<div className="mb-4">
							{/* Product name input */}
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Name
							</label>
							<input
								type="text"
								name="text"
								value={getProductName || ""}
								onChange={(e) => setProductName(e.target.value)}
								className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
							/>
						</div>
						<div className="mb-4">
							{/* Discount percentage input */}
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Discount Percentage
							</label>
							<input
								type="number"
								name="discount"
								value={inputPercentage}
								onChange={(e) => setInputPercentage(e.target.value)}
								className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
							/>
							<div className="flex justify-start items-center gap-8">
								{getIdDiscount && (
									<button
										onClick={handleDeleteDiscount}
										type="button"
										className="py-2 px-3 mt-4 flex justify-end items-end gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white disabled:opacity-50 disabled:pointer-events-none">
										Delete Discount
									</button>
								)}
								<button
									type="submit" // Change to submit type
									className="py-2 mt-4 px-3 flex justify-end items-end gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white disabled:opacity-50 disabled:pointer-events-none">
									Confirm
								</button>
							</div>
						</div>

						{/* Submit button */}
					</form>
				</div>
			</div>
		</>
	);
}
