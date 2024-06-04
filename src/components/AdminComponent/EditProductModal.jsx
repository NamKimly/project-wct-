import axios from "axios";
import authToken from "./../../utils/authToken";
import { useState, useEffect, useCallback } from "react";
import { storage } from "./../../firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

/**
 *
 * @EditModal
 */

const EditProductModal = ({ updateProduct, closeModal, id }) => {
	//* Passing Token
	const token = authToken();

	const [getCategory, setGetCategory] = useState([]);
	const [getBrand, setGetBrand] = useState([]);

	const [productName, setProductName] = useState("");
	const [productBrand, setProductBrand] = useState("");
	const [productCategory, setProductCategory] = useState(null);
	const [productPrice, setProductPrice] = useState(null);
	const [productImages, setProductImages] = useState(null);
	const [productDescription, setProductDescription] = useState("");
	const [productLastest, setProductLastest] = useState(false);

	const [file, setFile] = useState(null);
	const metadata = { contentType: "image/*" };

	//* Fetching categories and brands  in database
	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const [category, brand] = await Promise.all([
					axios.get(`${import.meta.env.VITE_API_URL}/category`),
					axios.get(`${import.meta.env.VITE_API_URL}/brand`),
				]);
				setGetCategory(category.data.category);
				setGetBrand(brand.data.brand);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchCategory();
	}, []);

	const fetchProductByID = useCallback(async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/products/${id}`
			);
			const product = response.data.product;
			setProductName(product.name);
			setProductBrand(product.brand.id);
			setProductCategory(product.category.id);
			setProductPrice(product.price);
			setProductLastest(product.is_new_arrival === 1 ? true : false);
			setFile(product.images);
			setProductDescription(product.description);
		} catch (error) {
			console.error("Error fetching product:", error.message);
		}
	}, [
		id,
		setProductName,
		setProductBrand,
		setProductCategory,
		setProductPrice,
		setProductLastest,
		setFile,
		setProductDescription,
	]);

	useEffect(() => {
		fetchProductByID();
	}, [fetchProductByID]);

	const handleEditingProducts = async (e) => {
		e.preventDefault();

		const updateProductData = async (downloadURL) => {
			const updatedProduct = {
				name: productName,
				brand_id: productBrand,
				category_id: productCategory,
				price: productPrice,
				images: downloadURL || file,
				description: productDescription,
				is_new_arrival: productLastest,
			};

			try {
				await axios.put(
					`${import.meta.env.VITE_API_URL}/products/${id}`,
					updatedProduct,
					{
						headers: {
							Accept: `application/json`,
							Authorization: `Bearer ${token}`,
						},
					}
				);
				setProductName("");
				setProductBrand("");
				setProductCategory(null);
				setProductPrice(null);
				setProductImages(null);
				setProductDescription("");
				closeModal();
				updateProduct();
			} catch (error) {
				console.error("Error updating product:", error);
			}
		};

		if (productImages) {
			const imageID = v4();
			const imageFormat = productImages.type.split("/")[1];
			const imgRef = ref(storage, `posting_image/${imageID}.${imageFormat}`);
			const uploadTask = uploadBytesResumable(imgRef, productImages, metadata);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done");
				},
				(error) => {
					console.error("Error uploading image:", error);
				},
				async () => {
					const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
					updateProductData(downloadURL);
				}
			);
		} else {
			updateProductData();
		}
	};

	return (
		<div className="absolute z-40 w-full flex items-center justify-center mt-4">
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
				<form method="post" onSubmit={handleEditingProducts}>
					<div className="flex justify-start items-start flex-col mb-2">
						<label className="font-bold text-gray-700 cursor-pointer select-none text-start">
							Product Status
						</label>
						<div className="flex justify-center items-center gap-2">
							<label
								className="relative flex items-center p-2  rounded-full cursor-pointer"
								htmlFor="check">
								<input
									checked={productLastest}
									onChange={() =>
										setProductLastest(productLastest ? false : true)
									}
									type="checkbox"
									name="productLastest"
									className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
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
							<label
								className="mt-px text-semibold text-gray-700 cursor-pointer select-none text-center"
								htmlFor="check">
								New Arrival
							</label>
						</div>
					</div>
					<div className="w-full flex justify-between items-center gap-4">
						<div className="mb-4 w-1/2">
							<label
								htmlFor="name"
								className="block text-gray-700 text-sm font-bold mb-2">
								Product Name
							</label>
							<input
								type="text"
								name="name"
								value={productName}
								onChange={(e) => setProductName(e.target.value)}
								className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
							/>
						</div>
						<div className="w-1/2 mb-4">
							<label
								htmlFor="category"
								className="block text-gray-700 text-sm font-bold mb-2">
								Category
							</label>
							<select
								value={productCategory}
								onChange={(e) => setProductCategory(e.target.value)}
								className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
								<option disabled>Select Category</option>
								{getCategory &&
									getCategory.map((data, key) => (
										<option key={key} value={data.id}>
											{data.name}
										</option>
									))}
							</select>
						</div>
					</div>
					<div className="w-full flex justify-between items-center gap-4">
						<div className="w-1/2 mb-4">
							<label
								htmlFor="category"
								className="block text-gray-700 text-sm font-bold mb-2">
								Brand
							</label>
							<select
								value={productBrand}
								onChange={(e) => setProductBrand(e.target.value)}
								className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
								<option disabled>Select Category</option>
								{getBrand &&
									getBrand.map((data, key) => (
										<option key={key} value={data.id}>
											{data.name}
										</option>
									))}
							</select>
						</div>
						<div className="w-1/2 mb-4">
							<label
								htmlFor="price"
								className="block text-gray-700 text-sm font-bold mb-2">
								Price
							</label>
							<input
								type="number"
								name="price"
								value={productPrice}
								onChange={(e) => setProductPrice(e.target.value)}
								className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
							/>
						</div>
					</div>

					<div className="mb-4 flex flex-col justify-center">
						<label className="block text-gray-700 text-sm font-bold mb-2">
							Image
						</label>
						<div className="p-2 border rounded-md focus:outline-none focus:border-blue-500">
							<label htmlFor="file-input" className="sr-only">
								Choose file
							</label>
							<input
								type="file"
								onChange={(e) => {
									setProductImages(e.target.files[0]);
									setFile(URL.createObjectURL(e.target.files[0]));
								}}
								name="images"
								accept="image/*"
								className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4 dark:file:text-neutral-400"
							/>
							<div className="flex justify-start items-center gap-4">
								{file && (
									<>
										<img
											className="mt-2 w-20 h-12 rounded-md"
											src={file}
											alt="Selected file"
										/>
										<i
											className="fa-solid fa-x text-sm"
											onClick={() => setFile(null)}></i>
									</>
								)}
							</div>
						</div>
					</div>
					<div className="mb-4">
						<label
							htmlFor="message"
							className="block text-gray-700 text-sm font-bold mb-2">
							Description
						</label>
						<textarea
							value={productDescription}
							onChange={(e) => setProductDescription(e.target.value)}
							id="message"
							name="message"
							className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"></textarea>
					</div>
					<button
						onClick={handleEditingProducts}
						type="submit"
						className="bg-blue-500 w-1/6 text-white py-2 px-2 rounded hover:bg-blue-700">
						Save
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditProductModal;
