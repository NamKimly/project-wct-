import axios from "axios";
import authToken from "./../../utils/authToken";
import { useState, useEffect } from "react";
import { storage } from "./../../firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

/**
 *
 * @PostingModal
 */
const AddProductModal = ({ updateProduct, closeModal }) => {
	//* Passing Token
	const token = authToken();

	const [getCategory, setGetCategory] = useState([]);
	const [getBrand, setGetBrand] = useState([]);

	/** Posting Products field */
	const [productName, setProductName] = useState("");
	const [productBrand, setProductBrand] = useState("");
	const [productCategory, setProductCategory] = useState("");
	const [productPrice, setProductPrice] = useState(null);

	/**Images Hosting Handling  */
	const [productImages, setProductImages] = useState(null);
	const [photoURL, setPhotoURL] = useState(null);
	const [file, setFile] = useState(null);
	/** */

	const [productDescription, setProductDescription] = useState("");
	const metadata = {
		contentType: "image/*",
	};

	//* Loading state
	const [isLoading, setIsLoading] = useState(false);

	//*Fetching categories and brands  in database
	useEffect(() => {
		const fetchCategoryAndBrand = async () => {
			try {
				const [categoryResponse, brandResponse] = await Promise.all([
					axios.get(`${import.meta.env.VITE_API_URL}/category`),
					axios.get(`${import.meta.env.VITE_API_URL}/brand`),
				]);

				setGetCategory(categoryResponse.data.category);
				setGetBrand(brandResponse.data.brand);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchCategoryAndBrand();
	}, []);

	const handlePostingProducts = async (e) => {
		e.preventDefault();

		if (!productImages) return;

		// Start loading
		setIsLoading(true);

		// Upload image to Firebase Storage
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
				setIsLoading(false); // Stop loading in case of error
			},
			async () => {
				try {
					// Get the download URL after upload completes
					const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

					// Update the photoURL state
					setPhotoURL(downloadURL);

					// Once image is uploaded, proceed to post product data
					const credentials = {
						name: productName,
						category_id: productCategory,
						brand_id: productBrand,
						price: parseFloat(productPrice),
						images: downloadURL,
						description: productDescription,
					};

					// Post product data to backend
					const postingProduct = await axios.post(
						`${import.meta.env.VITE_API_URL}/products`,
						credentials,
						{
							headers: {
								Accept: `application/json`,
								Authorization: `Bearer ${token}`,
							},
						}
					);
					console.log("Product posted successfully:", postingProduct.data);
					setProductName("");
					setProductBrand("");
					setProductCategory("");
					setProductPrice(null);
					setProductImages(null);
					setProductDescription("");
					closeModal();
					updateProduct(); // Adding Product immediately
				} catch (err) {
					console.error("Error posting product:", err);
				} finally {
					setIsLoading(false); // Stop loading after completion
				}
			}
		);
		console.log(photoURL);
	};

	return (
		<>
			<div className="absolute z-40 w-full flex items-center justify-center mt-4">
				<div className="flex justify-center items-center ">
					<button
						type="button"
						onClick={closeModal}
						className="text-slate-100  hover:bg-slate-200 hover:text-slate-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  mb-4">
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
				<div className="bg-white w-1/2 p-6 h-1/2 rounded shadow-md ">
					<div className="flex justify-center items-center ">
						<button
							type="button"
							onClick={closeModal}
							className="text-slate-100  hover:bg-slate-200 hover:text-slate-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  mb-4">
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
						<div className=" w-full flex justify-between items-center gap-4">
							<div className="mb-4 w-1/2">
								<label
									htmlFor="name"
									className="block text-gray-700 text-sm font-bold mb-2">
									Product Name
								</label>
								<input
									type="text"
									name="name"
									onChange={(e) => setProductName(e.target.value)}
									className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
								/>
							</div>
							<div className="w-1/2 mb-4">
								<label
									htmlFor="email"
									className="block text-gray-700 text-sm font-bold mb-2">
									Category
								</label>
								<select
									onChange={(e) => setProductCategory(e.target.value)}
									id="countries"
									className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
									<option disabled selected>
										Select Category
									</option>
									{getCategory &&
										getCategory.map((data, key) => (
											<option key={key} value={data.id}>
												{data.name}
											</option>
										))}
								</select>
							</div>
						</div>

						<div className=" w-full flex justify-between items-center gap-4 ">
							<div className="w-1/2 mb-4">
								<label
									htmlFor="category"
									className="block text-gray-700 text-sm font-bold mb-2">
									Brand
								</label>
								<select
									onChange={(e) => setProductBrand(e.target.value)}
									className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
									<option disabled selected>
										Select Brand
									</option>
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
									onChange={(e) => setProductPrice(e.target.value)}
									className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
								/>
							</div>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Discount Percentage
							</label>
							<input
								type="number"
								name="discount"
								className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
							/>
						</div>
						<div className="mb-4 flex flex-col justify-center">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Image
							</label>
							<div className=" p-2 border rounded-md focus:outline-none focus:border-blue-500">
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
									className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  dark:text-neutral-400
   							 file:bg-gray-50 file:border-0
    								file:me-4
   								file:py-3 file:px-4
    						    dark:file:text-neutral-400"
								/>
								<div className="flex justify-start items-center gap-4">
									{file && (
										<>
											<img
												loading="lazy"
												className="mt-2 w-12 h-16 rounded-md"
												src={file}
												alt="Select a file"
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
								onChange={(e) => setProductDescription(e.target.value)}
								id="message"
								name="message"
								className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"></textarea>
						</div>
						<button
							type="submit"
							onClick={handlePostingProducts}
							className="bg-blue-500  w-1/6 text-white py-2 px-2 rounded hover:bg-blue-700">
							{isLoading ? "Saving..." : "Save"}
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddProductModal;
