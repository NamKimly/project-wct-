import { useState, useEffect } from "react";
import axios from "axios";
import { storage } from "./../../../firebase/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

/**
 *
 * @PostingModal
 */

const AddProductModal = ({ updateProduct, closeModal }) => {
	const [getCategory, setGetCategory] = useState([]);

	/** Posting Products field */
	const [productName, setProductName] = useState("");
	const [productBrand, setProductBrand] = useState("");
	const [productCategory, setProductCategory] = useState("");
	const [productPrice, setProductPrice] = useState(null);

	/**Images Hosting Handling  */
	const [productImages, setProductImages] = useState(null);
	const [photoURL, setPhotoURL] = useState(null);
	/** */

	const [productDescription, setProductDescription] = useState("");
	const [file, setFile] = useState(null);
	const metadata = {
		contentType: "image/*",
	};

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

	const handlePostingProducts = async (e) => {
		e.preventDefault();

		if (!productImages) return;

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
				// Handle error if necessary
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
						brand: productBrand,
						price: productPrice,
						images: downloadURL,
						description: productDescription,
					};

					// Post product data to backend
					const postingProduct = await axios.post(
						`${import.meta.env.VITE_API_URL}/products`,
						credentials
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
				}
			}
		);
		console.log(photoURL);
	};
	return (
		<>
			<div className="absolute z-40 w-full flex items-center justify-center mt-4">
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
							<div className="mb-4 w-1/2">
								<label
									htmlFor="brand"
									className="block text-gray-700 text-sm font-bold mb-2">
									Brand
								</label>
								<input
									type="text"
									name="brand"
									onChange={(e) => setProductBrand(e.target.value)}
									className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
								/>
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
								Dicount Percentage
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
							Save
						</button>
					</form>
				</div>
			</div>
		</>
	);
};
/**
 *
 * @EditModal
 */

const EditProductModal = ({ updateProduct, closeModal, id }) => {
	const [getCategory, setGetCategory] = useState([]);
	const [productName, setProductName] = useState("");
	const [productBrand, setProductBrand] = useState("");
	const [productCategory, setProductCategory] = useState(null);
	const [productPrice, setProductPrice] = useState(null);
	const [productImages, setProductImages] = useState(null);
	const [productDescription, setProductDescription] = useState("");
	const [file, setFile] = useState(null);
	const metadata = { contentType: "image/*" };
	console.log(typeof id);

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

	useEffect(() => {
		const fetchProductByID = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/products/${id}`
				);
				const product = response.data.product;
				setProductName(product.name);
				setProductBrand(product.brand);
				setProductCategory(product.category_id);
				setProductPrice(product.price);
				setFile(product.images);
				setProductDescription(product.description);
			} catch (error) {
				console.error("Error fetching product:", error.message);
			}
		};
		fetchProductByID();
	}, [id]);
	console.log(productImages);

	const handleEditingProducts = async (e) => {
		e.preventDefault();

		const updateProductData = async (downloadURL) => {
			const updatedProduct = {
				name: productName,
				brand: productBrand,
				category_id: productCategory,
				price: productPrice,
				images: downloadURL || file,
				description: productDescription,
			};

			try {
				await axios.put(
					`${import.meta.env.VITE_API_URL}/products/${id}`,
					updatedProduct
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
						<div className="mb-4 w-1/2">
							<label
								htmlFor="brand"
								className="block text-gray-700 text-sm font-bold mb-2">
								Brand
							</label>
							<input
								type="text"
								name="brand"
								value={productBrand}
								onChange={(e) => setProductBrand(e.target.value)}
								className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
							/>
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

/**
 *
 * @DeleteModal
 */

const DeleteModal = ({ updateProduct, closeModal, id }) => {
	const handleDeleteItems = async (id) => {
		try {
			const deleteProducts = await axios.delete(
				`${import.meta.env.VITE_API_URL}/products/${id}`
			);
			console.log(deleteProducts.data);
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
					<hr className="h-0.5 border-t-0 bg-neutral-100" />
					<div className="p-2 overflow-y-auto">
						<p className="mt-1 text-gray-800">
							Do you want to delete this product?
						</p>
					</div>
					<hr className="mt-2 h-0.5 border-t-0 bg-neutral-100" />
					<div className="flex justify-end items-center gap-x-2 py-3 px-4">
						<button
							onClick={closeModal}
							type="button"
							className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
							data-hs-overlay="#hs-basic-modal">
							Close
						</button>
						<button
							onClick={() => handleDeleteItems(id)}
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

export default function ProductCrud() {
	// Modal
	const [modalState, setModalState] = useState({
		isOpen: false,
		showModal: false,
		showModalEdit: false,
	});

	// Storing Items
	const [itemsCategory, setItemsCategory] = useState([]);

	// Get id from each item
	const [getId, setGetId] = useState(null);
	const [itemsCategoryID, setItemsCategoryID] = useState(null);

	const [searchQuery, setSearchQuery] = useState("");
	const [getCategory, setGetCategory] = useState([]);

	// Filter product by name of products
	const filteredProducts = itemsCategory.filter((product) =>
		product.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Fetching product by Category
	const fetchProductsByCategory = async (categoryID) => {
		try {
			if (categoryID === null) {
				// If no category is selected, fetch all products
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/products`
				);
				setItemsCategory(response.data.product);
			} else {
				// If a category is selected, fetch products by category
				const response = await axios.get(
					`${import.meta.env.VITE_API_URL}/query-categories`,
					{
						params: {
							category_id: parseInt(categoryID),
						},
					}
				);
				setItemsCategory(response.data.product);
			}
		} catch (error) {
			console.error("Error fetching products:", error.message);
		}
	};

	useEffect(() => {
		fetchProductsByCategory(itemsCategoryID);
	}, [itemsCategoryID]);
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
	console.log(getCategory);

	/**
	 *
	 * @Popup modal
	 *
	 * */

	const toggleModal = (type, isOpen) => {
		setModalState((prevState) => ({ ...prevState, [type]: isOpen }));
	};

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

			<div className="flex flex-col items-center justify-center  bg-white">
				<div className="flex justify-between mt-4 items-center gap-52 w-full">
					<div className="w-1/4 p-4">
						<input
							className=" border  border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
							type="text"
							placeholder="Search..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					<div className="flex">
						<button
							onClick={() => toggleModal("isOpen", true)}
							className="flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mr-4 rounded text-sm">
							<i className="fa-solid fa-plus"></i>
							Add Product
						</button>

						{/** If there no param selected then it will go to the fetch all items  */}
						<select
							onChange={(e) =>
								setItemsCategoryID(
									e.target.value === "" ? null : e.target.value
								)
							}
							className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5">
							<option value="">All</option>
							{getCategory &&
								getCategory.map((data, key) => (
									<option key={key} value={data.id}>
										{data.name}
									</option>
								))}
						</select>
					</div>
				</div>
				<div className="p-4 w-full h-full ">
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
												{products.brand}
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
				</div>
			</div>
		</>
	);
}
