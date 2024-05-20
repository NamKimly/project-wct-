/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../../components/Pagination";
import AddProductModal from "./../../../components/AdminComponent/AddProductModal";
import EditProductModal from "../../../components/AdminComponent/EditProductModal";
import DeleteModal from "../../../components/AdminComponent/DeleteModal";

export default function ProductCrud() {
	//* Pagination  /
	const [currentPage, setCurrentPage] = useState(1);
	const [postPerPage, setPostPerPage] = useState(10);
	const lastPostIndex = currentPage * postPerPage;
	const firstPostIndex = lastPostIndex - postPerPage;

	//* Modal
	const [modalState, setModalState] = useState({
		isOpen: false,
		showModal: false,
		showModalEdit: false,
	});

	//* Storing Items
	const [itemsCategory, setItemsCategory] = useState([]);

	//*Get id from each item
	const [getId, setGetId] = useState(null);
	const [itemsCategoryID, setItemsCategoryID] = useState(null);
	const [itemsBrandID, setItemsBrandID] = useState(null);

	const [searchQuery, setSearchQuery] = useState("");
	const [getCategory, setGetCategory] = useState([]);
	const [getBrand, setGetBrand] = useState([]);

	//* Pagination of product
	const currentPost = itemsCategory.slice(firstPostIndex, lastPostIndex);
	console.log(currentPost);

	//* Filter product by name of products
	const filteredProducts = currentPost.filter((product) =>
		product.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	//* Fetching product by Category
	const fetchProductsByCategory = async (categoryID, brandID) => {
		try {
			let url = `${import.meta.env.VITE_API_URL}/products`;

			// If either categoryID or brandID is provided, use the query-categories endpoint
			if (categoryID || brandID) {
				url = `${import.meta.env.VITE_API_URL}/query-categories`;
			}

			const response = await axios.get(url, {
				params: {
					category_id: categoryID ? parseInt(categoryID) : null,
					brand_id: brandID ? parseInt(brandID) : null,
				},
			});

			if (categoryID || brandID) {
				setItemsCategory(response.data.category); // Adjust based on your actual API response structure
			} else {
				setItemsCategory(response.data.product); // Adjust based on your actual API response structure
			}
		} catch (error) {
			console.error("Error fetching products:", error.message);
		}
	};

	useEffect(() => {
		fetchProductsByCategory(itemsCategoryID, itemsBrandID);
	}, [itemsCategoryID, itemsBrandID]);
	/**  */

	// Fetching categories in database
	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const category = await axios.get(
					`${import.meta.env.VITE_API_URL}/category`
				);
				setGetCategory(category.data.category);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchCategory();
	}, []);

	// Fetching brands in database
	useEffect(() => {
		const fetchBrand = async () => {
			try {
				const brand = await axios.get(`${import.meta.env.VITE_API_URL}/brand`);
				setGetBrand(brand.data.brand);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchBrand();
	}, []);

	/**
	 *
	 * @Popup modal
	 *
	 * */

	const toggleModal = (type, isOpen) => {
		setModalState((prevState) => ({ ...prevState, [type]: isOpen }));
	};
	console.log(itemsCategory.length);
	console.log(postPerPage);
	return (
		<>
			{modalState.isOpen && (
				<AddProductModal
					closeModal={() => toggleModal("isOpen", false)}
					updateProduct={() => fetchProductsByCategory(itemsCategoryID)}
				/>
			)}
			{modalState.showModal && (
				<DeleteModal
					closeModal={() => toggleModal("showModal", false)}
					id={getId}
					updateProduct={() => fetchProductsByCategory(itemsCategoryID)}
				/>
			)}
			{modalState.showModalEdit && (
				<EditProductModal
					closeModal={() => toggleModal("showModalEdit", false)}
					id={getId}
					updateProduct={() => fetchProductsByCategory(itemsCategoryID)}
				/>
			)}

			<div className="flex flex-col items-center justify-center bg-white">
				<div className="flex justify-between mt-4 items-center w-full">
					<input
						className=" border border-gray-300 hover:border-gray-400 transition-colors rounded-md w-1/4 p-2 m-4 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
						type="text"
						placeholder="Search..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>

					<button
						onClick={() => toggleModal("isOpen", true)}
						className="flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 w-1/8 h-full mr-4 rounded text-sm">
						<i className="fa-solid fa-plus"></i>
						Add Product
					</button>

					{/** If there no param selected then it will go to the fetch all items  */}
				</div>
				<div className="flex flex-col p-4 w-full h-full gap-8 ">
					<div className="flex justify-center w-1/2  items-center gap-4">
						<label>Category</label>
						<select
							onChange={(e) =>
								setItemsCategoryID(
									e.target.value === "" ? null : e.target.value
								)
							}
							className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
							<option value="">All</option>
							{getCategory &&
								getCategory.map((data, key) => (
									<option key={key} value={data.id}>
										{data.name}
									</option>
								))}
						</select>

						<label>Brand</label>

						<select
							onChange={(e) =>
								setItemsBrandID(e.target.value === "" ? null : e.target.value)
							}
							className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
							<option value="">All</option>
							{getBrand &&
								getBrand.map((data, key) => (
									<option key={key} value={data.id}>
										{data.name}
									</option>
								))}
						</select>
					</div>
					<table className="w-full max-w-screen table-auto text-left">
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
								<th className="w-1/12 border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
									<p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
										Discount (%)
									</p>
								</th>
								<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
									<p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
										Description
									</p>
								</th>
								<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
									<p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
										Price
									</p>
								</th>
								<th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
									<p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70">
										Action
									</p>
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredProducts && filteredProducts.length > 0 ? (
								filteredProducts.map((products, key) => (
									<tr key={key}>
										<td className="p-4 border-b border-blue-gray-50">
											<div className="flex items-center gap-3">
												<img
													src={products.images}
													loading="lazy"
													alt={products.name}
													className="inline-block relative object-center w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
												/>
												<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
													{products.name}
												</p>
											</div>
										</td>
										<td className="p-4 border-b border-blue-gray-50">
											<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
												{products.category.name}
											</p>
										</td>
										<td className="p-4 border-b border-blue-gray-50">
											<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
												{products.brand ? products.brand.name : "No brand"}
											</p>
										</td>
										<td className="p-4 border-b border-blue-gray-50">
											<div className="w-max">
												<div className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-900 py-1 px-2 text-xs rounded-md">
													<span className="">none</span>
												</div>
											</div>
										</td>
										<td className="w-max p-4 border-b border-blue-gray-50">
											<p className="block w-full antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
												{products.description}
											</p>
										</td>
										<td className="p-4 border-b border-blue-gray-50">
											<div className="flex items-center gap-3">
												<div className="flex flex-col">
													<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">
														${products.price}
													</p>
												</div>
											</div>
										</td>
										<td className="mt-12 p-4 border-b border-blue-gray-50">
											<div className="flex justify-center items-center">
												<button
													onClick={() => {
														toggleModal("showModalEdit", true);
														setGetId(products.id);
													}}
													type="button"
													className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
													Edit
												</button>
												<button
													onClick={() => {
														toggleModal("showModal", true);
														setGetId(products.id);
													}}
													type="button"
													className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
													Delete
												</button>
											</div>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan="7"
										className="p-4 border-b border-blue-gray-50 text-center">
										<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
											There is no product on the list
										</p>
									</td>
								</tr>
							)}
						</tbody>
					</table>
					<div className="flex justify-end items-end mr-4">
						<Pagination
							totalPosts={itemsCategory.length}
							postsPerPage={postPerPage}
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
