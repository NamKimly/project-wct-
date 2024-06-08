import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState, useCallback } from "react";

const animatedComponents = makeAnimated();

const customOption = (props) => {
	const { innerRef, innerProps, data } = props;
	return (
		<div
			ref={innerRef}
			{...innerProps}
			className="custom-option flex justify-between items-center">
			<div className="flex justify-start items-center">
				<img
					src={data.image}
					alt={data.label}
					style={{ width: 50, height: 50, marginRight: 10 }}
				/>
				{data.label}
			</div>
			<label className="relative flex items-center p-2 rounded-full cursor-pointer">
				<input
					type="checkbox"
					name="productLastest"
					className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
					checked={data.is_free}
					onChange={() => props.handleCheckboxChange(data)}
				/>
				<span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-3.5 w-3.5"
						viewBox="0 0 20 20"
						fill="currentColor"
						stroke="currentColor"
						strokeWidth="1">
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clipRule="evenodd"></path>
					</svg>
				</span>
			</label>
		</div>
	);
};

const customSingleValue = ({ data }) => (
	<div className="custom-single-value">
		<img
			src={data.image}
			alt={data.label}
			loading="lazy"
			style={{ width: 50, height: 50, marginRight: 10 }}
		/>
		{data.label}
	</div>
);

export default function AddPromotion({ closeModal, updateProduct }) {
	const [products, setProducts] = useState([]);
	const [eventName, setEventName] = useState("");
	const [eventDescription, setEventDescription] = useState("");
	const [promotionProduct, setPromotionProduct] = useState([]);

	const getProduct = useCallback(async () => {
		const response = await axios.get(
			`${import.meta.env.VITE_API_URL}/products`
		);
		const formattedProducts = response.data.product.map((product) => ({
			value: product.id,
			label: product.name,
			image: product.images,
			is_free: false,
		}));
		setProducts(formattedProducts);
		updateProduct();
	}, [updateProduct]);

	useEffect(() => {
		getProduct();
	}, [getProduct]);

	const handleCheckboxChange = (selectedProduct) => {
		setPromotionProduct((prevProducts) =>
			prevProducts.map((product) =>
				product.value === selectedProduct.value
					? { ...product, is_free: !product.is_free }
					: product
			)
		);
	};

	const handleSelectChange = (selectedOptions) => {
		setPromotionProduct(selectedOptions || []);
	};

	const handleAddPromotion = async (e) => {
		e.preventDefault();

		const request = {
			name: eventName,
			description: eventDescription,
			products: promotionProduct.map((product) => ({
				product_id: product.value,
				is_free: product.is_free,
			})),
		};

		try {
			const postingPromotion = await axios.post(
				`${import.meta.env.VITE_API_URL}/promotions`,
				request
			);
			console.log("Promotion posted successfully:", postingPromotion.data);
			setEventName("");
			setEventDescription("");
			setPromotionProduct([]);
			closeModal();
		} catch (err) {
			console.log(err.message);
		}
	};

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
					<form method="post" onSubmit={handleAddPromotion}>
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
									onChange={(e) => setEventName(e.target.value)}
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
									type="text"
									name="description"
									onChange={(e) => setEventDescription(e.target.value)}
									value={eventDescription}
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
							<Select
								id="products"
								name="products"
								options={products}
								isMulti
								closeMenuOnSelect={false}
								components={{
									animatedComponents,
									Option: (props) =>
										customOption({ ...props, handleCheckboxChange }),
									SingleValue: customSingleValue,
								}}
								onChange={handleSelectChange}
								value={promotionProduct}
							/>
						</div>

						<div className="w-full flex justify-between items-center gap-4">
							<div className="w-full">
								<button
									type="submit"
									className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
									Add Promotion
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
