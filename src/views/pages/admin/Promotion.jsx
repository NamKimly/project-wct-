import axios from "axios";
import DeletePromotion from "../../../components/AdminComponent/DeletePromotion";
import AddPromotion from "../../../components/AdminComponent/AddPromotion";
import EditPromotion from "./../../../components/AdminComponent/EditPromotion";
import { useState, useEffect, useCallback } from "react";

export default function Promotion() {
	const [promotionDetail, setPromotionDetail] = useState([]);
	const [openDelete, setOpenDelete] = useState(false);
	const [openAdd, setOpenAdd] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [getId, setGetId] = useState(null);

	//* Fetching Data from Promotions
	const fetchPromotions = useCallback(async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/promotions`
			);
			const promotionProducts = response.data.promotion_products;
			setPromotionDetail(promotionProducts);
		} catch (error) {
			console.error("Error fetching promotions:", error);
		}
	}, []);

	useEffect(() => {
		fetchPromotions();
	}, []);
	const renderProductRows = (products) => {
		return products.map((product, key) => (
			<tr key={key}>
				<td className="p-4 border-b border-blue-gray-50">
					<div className="flex items-center gap-3">
						<img
							src={product.images}
							loading="lazy"
							alt={product.name}
							className="inline-block relative object-center w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
						/>
						<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
							{product.name}
						</p>
					</div>
				</td>
				<td className="p-4 border-b border-blue-gray-50">
					<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
						{product.category.name}
					</p>
				</td>
				<td className="p-4 border-b border-blue-gray-50">
					<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
						{product.brand ? product.brand.name : "No brand"}
					</p>
				</td>
				<td className="w-max p-4 border-b border-blue-gray-50">
					<p className="block w-full antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
						{product.description}
					</p>
				</td>
				<td className="p-4 border-b border-blue-gray-50">
					<div className="flex items-center gap-3">
						<div className="flex flex-col">
							<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">
								{product.pivot.is_free === 1 ? "free" : "purchase"}
							</p>
						</div>
					</div>
				</td>
				<td className="p-4 border-b border-blue-gray-50">
					<div className="flex items-center gap-3">
						<div className="flex flex-col">
							<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">
								${product.price}
							</p>
						</div>
					</div>
				</td>
				<td className="mt-12 p-4 border-b border-blue-gray-50"></td>
			</tr>
		));
	};
	console.log(promotionDetail);
	return (
		<>
			{openAdd && (
				<AddPromotion
					updateProduct={() => fetchPromotions()}
					closeModal={() => setOpenAdd(!openAdd)}
				/>
			)}

			{openDelete && (
				<DeletePromotion
					updateProduct={() => fetchPromotions()}
					closeModal={() => setOpenDelete(!openDelete)}
					id={getId}
				/>
			)}

			{openEdit && (
				<EditPromotion
					updateProduct={() => fetchPromotions()}
					closeModal={() => setOpenEdit(!openEdit)}
					id={getId}
				/>
			)}

			<div className="flex flex-col items-center justify-center bg-white">
				<div className="flex justify-start mt-4 p-2 items-center w-full">
					<button
						onClick={() => setOpenAdd(!openAdd)}
						className="flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 w-1/8 h-full mr-4 rounded text-sm">
						<i className="fa-solid fa-plus"></i>
						Add New Event
					</button>
				</div>
				<div className="flex justify-center items-center flex-col p-4 w-full h-full gap-8 ">
					<div className="text-lg font-semibold">
						<p>Promotion Products</p>
					</div>

					{promotionDetail && promotionDetail.length > 0 ? (
						promotionDetail.map((promotion, index) => (
							<div key={index} className="w-full">
								<div className="flex w-full px-4 justify-between items-center">
									<div className="flex gap-2">
										<p className="text-base  font-semibold "> Promotion:</p>
										<p className="text-base font-semibold text-red-400 mb-4">
											{promotion.name}
										</p>
									</div>
									<div className="flex justify-center items-center gap-2">
										<button
											onClick={() => {
												setOpenEdit(!openDelete);
												setGetId(promotion.id);
											}}
											className="flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 w-1/8 h-full mr-4 rounded text-sm">
											<i className="fa-regular fa-pen-to-square"></i>
											Edit Promotion
										</button>
										<button
											onClick={() => {
												setOpenDelete(!openDelete);
												setGetId(promotion.id);
											}}
											className="flex justify-center items-center gap-2 bg-red-500 hover:bg-red-700 text-white py-2 px-4 w-1/8 h-full mr-4 rounded text-sm">
											<i className="fa-solid fa-xmark"></i>
											Cancel Promotion
										</button>
									</div>
								</div>

								<table className="w-full max-w-screen table-auto text-left mt-4">
									<thead className="bg-slate-200">
										<tr>
											<th className="w-1/4 border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
												<p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
													Product Name
												</p>
											</th>
											<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
												<p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
													Category
												</p>
											</th>
											<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
												<p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
													Brand
												</p>
											</th>
											<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
												<p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
													Description
												</p>
											</th>
											<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
												<p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
													Promotion
												</p>
											</th>
											<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
												<p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
													Price
												</p>
											</th>
										</tr>
									</thead>
									<tbody>{renderProductRows(promotion.products)}</tbody>
								</table>
							</div>
						))
					) : (
						<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
							There are no promtion in the list.
						</p>
					)}
				</div>
			</div>
		</>
	);
}
