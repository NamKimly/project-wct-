import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { storage } from "./../../../firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

//* Passing Token
let token = localStorage.getItem("token") ?? "";
token = token.replace(/"/g, "");

const EditCategoryModal = ({ closeModal, id, updateProduct }) => {
	const [editCategory, setEditCategory] = useState("");

	useEffect(() => {
		const getCategory = async () => {
			try {
				const categoryList = await axios.get(
					`${import.meta.env.VITE_API_URL}/category/${id}`
				);
				setEditCategory(categoryList.data.category.name);
			} catch (e) {
				console.log(e.message);
			}
		};
		getCategory();
	}, [id]);

	const handleCategoryItem = async (e) => {
		e.preventDefault();
		try {
			const editProducts = await axios.put(
				`${import.meta.env.VITE_API_URL}/category/${id}`,
				{ name: editCategory },
				{
					headers: {
						Accept: `application/json`,
						Authorization: `Bearer ${token}`,
					},
				}
			);
			closeModal(false);
			updateProduct();
			console.log(editProducts.data.category);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<>
			<div className="absolute z-20 w-full flex items-center justify-center mt-12">
				<div className="bg-white w-1/2 p-6 h-1/2 rounded shadow-md">
					<div className="flex justify-center items-center">
						<button
							type="button"
							onClick={() => closeModal(false)}
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
					<div className="p-2 overflow-y-auto">
						<label
							htmlFor="name"
							className="block text-gray-700 text-sm font-bold mb-2">
							Add Category
						</label>
						<input
							onChange={(e) => setEditCategory(e.target.value)}
							type="text"
							value={editCategory}
							name="category"
							placeholder="Add a Brand"
							className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
						/>
					</div>
					<hr className="mt-2 h-0.5 border-t-0 bg-neutral-100" />
					<div className="flex justify-end items-center gap-x-2 py-3 px-4">
						<button
							onClick={() => closeModal(false)}
							type="button"
							className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
							data-hs-overlay="#hs-basic-modal">
							Close
						</button>
						<button
							type="button"
							onClick={handleCategoryItem}
							className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white  	 disabled:opacity-50 disabled:pointer-events-none">
							Confirm
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
// eslint-disable-next-line react/prop-types
const DeleteModalCategory = ({ updateProduct, closeModal, id }) => {
	const handleDeleteCategory = async (id) => {
		try {
			const deleteCategory = await axios.delete(
				`${import.meta.env.VITE_API_URL}/category/${id}`,
				{
					headers: {
						Accept: `application/json`,
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(deleteCategory.data);
			closeModal();
			updateProduct();
		} catch (err) {
			console.log(err.message);
		}
	};
	return (
		<>
			<div className="absolute z-20 w-full flex items-center justify-center mt-12">
				<div className="bg-white w-1/2 p-6 h-1/2 rounded shadow-md">
					<div className="flex justify-center items-center">
						<h1>Confirmation</h1>
						<button
							type="button"
							onClick={() => closeModal(false)}
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
					<hr className="h-0.5 border-t-0 bg-neutral-100" />
					<div className="p-2 overflow-y-auto">
						<p className="mt-1 text-gray-800">
							Do you want to delete this product?
						</p>
					</div>
					<hr className="mt-2 h-0.5 border-t-0 bg-neutral-100" />
					<div className="flex justify-end items-center gap-x-2 py-3 px-4">
						<button
							onClick={() => closeModal(false)}
							type="button"
							className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
							data-hs-overlay="#hs-basic-modal">
							Close
						</button>
						<button
							onClick={() => handleDeleteCategory(id)}
							type="button"
							className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white  	 disabled:opacity-50 disabled:pointer-events-none">
							Delete
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

const EditBrandModal = ({ closeModal, id, updateProduct }) => {
	const [brandData, setBrandData] = useState({ name: "", logoUrl: "" });
	const [file, setFile] = useState(null);

	useEffect(() => {
		const getBrand = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/brand/${id}`
				);
				const { name, logo_url } = response.data.brand;
				setBrandData({ name, logoUrl: logo_url });
			} catch (e) {
				console.error("Failed to fetch brand:", e.message);
			}
		};
		getBrand();
	}, [id]);

	const handleBrandItem = useCallback(
		async (e) => {
			e.preventDefault();
			const { name, logoUrl } = brandData;

			const updateBrand = async (updatedLogoUrl = logoUrl) => {
				const updateBrandData = {
					name,
					logo_url: updatedLogoUrl,
				};
				try {
					await axios.put(
						`${import.meta.env.VITE_API_URL}/brand/${id}`,
						updateBrandData,
						{
							headers: {
								Accept: "application/json",
								Authorization: `Bearer ${token}`,
							},
						}
					);
					closeModal(false);
					updateProduct();
				} catch (err) {
					console.error("Failed to update brand:", err.message);
				}
			};

			if (!file) {
				await updateBrand();
			} else {
				const imageID = v4();
				const imageFormat = file.type.split("/")[1];
				const imgRef = ref(storage, `posting_image/${imageID}.${imageFormat}`);
				const uploadTask = uploadBytesResumable(imgRef, file, {
					contentType: "image/*",
				});

				uploadTask.on(
					"state_changed",
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log(`Upload is ${progress}% done`);
					},
					(error) => {
						console.error("Error uploading image:", error);
					},
					async () => {
						try {
							const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
							await updateBrand(downloadURL);
						} catch (err) {
							console.error("Failed to get download URL:", err.message);
						}
					}
				);
			}
		},
		[brandData, file, id, updateProduct, closeModal]
	);

	const handleChange = useCallback((e) => {
		const { name, value, files } = e.target;
		if (name === "file") {
			setFile(files[0]);
			setBrandData((prev) => ({ ...prev, logoUrl: "" }));
		} else {
			setBrandData((prev) => ({ ...prev, [name]: value }));
		}
	}, []);

	return (
		<div className="absolute z-20 w-full flex items-center justify-center mt-24">
			<div className="bg-white w-1/2 p-6 h-1/2 rounded shadow-md">
				<div className="flex justify-center items-center">
					<button
						type="button"
						onClick={() => closeModal(false)}
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
				<div className="p-2 overflow-y-auto">
					<label
						htmlFor="name"
						className="block text-gray-700 text-sm font-bold mb-2">
						Edit Brand
					</label>
					<input
						type="text"
						name="name"
						onChange={handleChange}
						value={brandData.name}
						placeholder="Edit Brand Name"
						className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
					/>
					<label
						htmlFor="file"
						className="block text-gray-700 text-sm font-bold mt-4 mb-2">
						Edit Logo URL
					</label>
					<input
						type="file"
						name="file"
						onChange={handleChange}
						accept="image/*"
						className="w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400
						file:bg-gray-50 file:border-0
						file:me-4
						file:py-3 file:px-4
						dark:file:text-neutral-400"
					/>
					{file && (
						<div className="flex justify-start items-center gap-4 mt-2">
							<img
								loading="lazy"
								className="w-12 h-12 rounded-md"
								src={URL.createObjectURL(file)}
								alt="Selected file"
							/>
							<i className="fa-solid fa-x text-sm"></i>
						</div>
					)}
				</div>
				<hr className="mt-2 h-0.5 border-t-0 bg-neutral-100" />
				<div className="flex justify-end items-center gap-x-2 py-3 px-4">
					<button
						onClick={() => closeModal(false)}
						type="button"
						className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
						data-hs-overlay="#hs-basic-modal">
						Close
					</button>
					<button
						type="button"
						onClick={handleBrandItem}
						className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-green-600 text-white disabled:opacity-50 disabled:pointer-events-none">
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

const DeleteModalBrand = ({ updateProduct, closeModal, id }) => {
	const handleDeleteBrand = async (id) => {
		try {
			const deleteBrand = await axios.delete(
				`${import.meta.env.VITE_API_URL}/brand/${id}`,
				{
					headers: {
						Accept: `application/json`,
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(deleteBrand.data);
			closeModal();
			updateProduct();
		} catch (err) {
			console.log(err.message);
		}
	};
	return (
		<>
			<div className="absolute z-20 w-full flex items-center justify-center mt-12">
				<div className="bg-white w-1/2 p-6 h-1/2 rounded shadow-md">
					<div className="flex justify-center items-center">
						<h1>Confirmation</h1>
						<button
							type="button"
							onClick={() => closeModal(false)}
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
					<hr className="h-0.5 border-t-0 bg-neutral-100" />
					<div className="p-2 overflow-y-auto">
						<p className="mt-1 text-gray-800">
							Do you want to delete this brand?
						</p>
					</div>
					<hr className="mt-2 h-0.5 border-t-0 bg-neutral-100" />
					<div className="flex justify-end items-center gap-x-2 py-3 px-4">
						<button
							onClick={() => closeModal(false)}
							type="button"
							className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
							data-hs-overlay="#hs-basic-modal">
							Close
						</button>
						<button
							onClick={() => handleDeleteBrand(id)}
							type="button"
							className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-600 text-white  	 disabled:opacity-50 disabled:pointer-events-none">
							Delete
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default function AddingCategory() {
	const [category, setGetCategory] = useState([]);
	const [brand, setGetBrand] = useState([]);
	const [inputCategory, setInputCategory] = useState("");
	const [inputBrand, setInputBrand] = useState("");
	const [getID, setGetID] = useState(null);

	//* Image State
	const [productImages, setProductImages] = useState(null);
	const [photoURL, setPhotoURL] = useState(null);
	const [file, setFile] = useState(null);
	const metadata = {
		contentType: "image/*",
	};

	//*  Modal
	const [isOpenCategory, setIsOpenCategory] = useState(false);
	const [isOpenBrand, setIsOpenBrand] = useState(false);
	const [isOpenDeleteCategory, setIsOpenDeleteCategory] = useState(false);
	const [isOpenDeleteBrand, setIsOpenDeleteBrand] = useState(false);

	// Fetch categories
	const fetchCategory = async () => {
		try {
			const fetchCategoryResult = await axios.get(
				`${import.meta.env.VITE_API_URL}/category`
			);
			setGetCategory(fetchCategoryResult.data.category);
		} catch (e) {
			console.log(e.message);
		}
	};
	useEffect(() => {
		fetchCategory();
	}, []);

	// Fetch brands
	const fetchBrand = async () => {
		try {
			const fetchCategoryResult = await axios.get(
				`${import.meta.env.VITE_API_URL}/brand`
			);
			setGetBrand(fetchCategoryResult.data.brand);
		} catch (e) {
			console.log(e.message);
		}
	};
	useEffect(() => {
		fetchBrand();
	}, []);

	//* handling Posting Category
	const handlePostingCategory = async (e) => {
		e.preventDefault();

		try {
			const postCategoryResult = await axios.post(
				`${import.meta.env.VITE_API_URL}/category`,
				{ name: inputCategory },
				{
					headers: {
						Accept: `application/json`,
						Authorization: `Bearer ${token}`,
					},
				}
			);
			// Append the new category to the existing categories
			setGetCategory((prevCategories) => [
				...prevCategories,
				postCategoryResult.data.category,
			]);
			// Clear the input field after successful submission
			setInputCategory("");
		} catch (e) {
			console.error("Error posting category:", e.message);
		}
	};

	//* handling Posting Brand
	const handlePostingBrand = async (e) => {
		e.preventDefault();

		if (!productImages) return;

		// Generate a unique image ID and format
		const imageID = v4();
		const imageFormat = productImages.type.split("/")[1];
		const imgRef = ref(storage, `brand_image/${imageID}.${imageFormat}`);
		const uploadTask = uploadBytesResumable(imgRef, productImages, metadata);

		// Handle the upload process
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
			},
			(error) => {
				// Handle unsuccessful uploads
				console.error("Error uploading image:", error.message);
			},
			async () => {
				try {
					// Get the download URL after the upload is complete
					const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
					setPhotoURL(downloadURL);

					// Post the brand data to your API
					const postBrandResult = await axios.post(
						`${import.meta.env.VITE_API_URL}/brand`,
						{ name: inputBrand, logo_url: downloadURL },
						{
							headers: {
								Accept: `application/json`,
								Authorization: `Bearer ${token}`,
							},
						}
					);

					// Append the new brand to the existing brands
					setGetBrand((prevBrand) => [
						...prevBrand,
						postBrandResult.data.brand,
					]);

					// Clear the input field and image after successful submission
					setInputBrand("");
					setProductImages(null);
				} catch (e) {
					console.error("Error posting brand:", e.message);
				}
			}
		);
	};

	return (
		<>
			{isOpenCategory && (
				<EditCategoryModal
					closeModal={setIsOpenCategory}
					id={getID}
					updateProduct={fetchCategory} // Get category immediately
				/>
			)}

			{isOpenBrand && (
				<EditBrandModal
					closeModal={setIsOpenBrand}
					id={getID}
					updateProduct={fetchBrand} // Get category immediately
				/>
			)}

			{isOpenDeleteCategory && (
				<DeleteModalCategory
					closeModal={setIsOpenDeleteCategory}
					id={getID}
					updateProduct={fetchCategory} // Get category immediately
				/>
			)}

			{isOpenDeleteBrand && (
				<DeleteModalBrand
					closeModal={setIsOpenDeleteBrand}
					id={getID}
					updateProduct={fetchBrand} // Get category immediately
				/>
			)}
			{/**Category section  */}

			<div className="flex justify-start items-start flex-col">
				<section className="bg-white">
					<div className="mx-auto max-w-xl">
						<form onSubmit={handlePostingCategory}>
							<div className="p-2 mb-4 w-full flex justify-center items-center flex-col gap-4">
								<label
									htmlFor="category"
									className="w-full text-gray-700 text-xl font-bold mb-2">
									Adding Category
								</label>
								<div className="flex justify-center items-center gap-4">
									<input
										type="text"
										name="name"
										value={inputCategory}
										onChange={(e) => setInputCategory(e.target.value)}
										placeholder="Add a category"
										className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
									/>
									<button
										type="submit"
										className="bg-blue-500 w-1/2 text-white py-2 px-2 rounded hover:bg-blue-700">
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
				</section>

				<div className="w-full h-64 overflow-y-auto p-2">
					<table className="w-full border">
						<thead>
							<tr className="bg-gray-100">
								<th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">
									Category Name
								</th>
								<th className="py-4 px-6 text-center text-gray-600 font-bold uppercase">
									Action
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{category &&
								category.map((categories, key) => (
									<tr key={key}>
										<td className="py-4 px-6 border-b border-gray-200">
											{categories.name}
										</td>
										<td className="mt-12 p-4 border-b border-gray-200">
											<div className="flex justify-center items-center">
												<button
													onClick={() => {
														setGetID(categories.id);
														setIsOpenCategory(true);
													}}
													type="button"
													className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
													Edit
												</button>

												<button
													type="button"
													onClick={() => {
														setGetID(categories.id);
														setIsOpenDeleteCategory(true);
													}}
													className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
													Delete
												</button>
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>

				{/**Brand section  */}
				<section className="bg-white mt-12">
					<div className="mx-auto max-w-xl">
						<form action="#" onSubmit={handlePostingBrand}>
							<div className="p-2 mb-4 w-full flex justify-start items-start flex-col gap-4">
								<label
									htmlFor="category"
									className="w-full text-gray-700 text-xl font-bold mb-2">
									Adding Brand
								</label>
								<div className="flex justify-center items-center gap-4">
									<input
										type="text"
										name="name"
										onChange={(e) => setInputBrand(e.target.value)}
										placeholder="Add a Brand"
										className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
									/>

									<div className=" flex w-full p-2 justify-center items-center gap-4 rounded-md focus:outline-none focus:border-blue-500">
										<input
											type="file"
											onChange={(e) => {
												setProductImages(e.target.files[0]);
												setFile(URL.createObjectURL(e.target.files[0]));
											}}
											name="images"
											accept="image/*"
											className="w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  dark:text-neutral-400
   							 					file:bg-gray-50 file:border-0
    												  file:me-4
   											   	file:py-3 file:px-4
    						    					dark:file:text-neutral-400"
										/>
										<div className="flex justify-center  items-center gap-4">
											{file && (
												<>
													<img
														loading="lazy"
														className="mt-2 w-8 h-8 rounded-md"
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
									<button
										onClick={handlePostingBrand}
										type="submit"
										className="bg-blue-500 w-1/4 text-white py-2 px-2 rounded hover:bg-blue-700">
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
				</section>

				<div className="w-full h-64 overflow-y-auto p-2">
					<table className="w-full border">
						<thead>
							<tr className="bg-gray-100">
								<th className="py-4 px-6 text-left text-gray-600 font-bold uppercase">
									Brand Name
								</th>
								<th className="py-4 px-6 text-center text-gray-600 font-bold uppercase">
									Action
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{brand &&
								brand.map((brands, key) => (
									<tr key={key}>
										<td className="mt-12  border-b border-gray-200">
											<div className="flex items-center p-4 gap-3">
												<img
													src={brands.logo_url}
													loading="lazy"
													alt=""
													className="inline-block relative object-center w-12 h-12 rounded-lg border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
												/>
												<p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
													{brands.name}
												</p>
											</div>
										</td>
										<td className="mt-12 p-4 border-b border-gray-200">
											<div className="flex justify-center items-center">
												<button
													onClick={() => {
														setGetID(brands.id);
														setIsOpenBrand(true);
													}}
													type="button"
													className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
													Edit
												</button>
												<button
													type="button"
													onClick={() => {
														setGetID(brands.id);
														setIsOpenDeleteBrand(true);
													}}
													className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
													Delete
												</button>
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
