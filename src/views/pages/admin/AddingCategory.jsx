import axios from "axios";
import { useState, useEffect } from "react";

export default function AddingCategory() {
	const [category, setGetCategory] = useState([]);
	const [inputCategory, setInputCategory] = useState("");

	// Fetch categories
	useEffect(() => {
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
		fetchCategory();
	}, []);

	// Add new category
	const handlePostingCategory = async (e) => {
		e.preventDefault();
		try {
			const postCategoryResult = await axios.post(
				`${import.meta.env.VITE_API_URL}/category`,
				{ name: inputCategory }
			);
			// Append the new category to the existing categories
			setGetCategory((prevCategories) => [
				...prevCategories,
				postCategoryResult.data,
			]);
			// Clear the input field after successful submission
			setInputCategory("");
		} catch (e) {
			console.error("Error posting category:", e.message);
		}
	};

	// Delete category
	const handleDeleteCategory = async (id) => {
		try {
			await axios.delete(`${import.meta.env.VITE_API_URL}/category/${id}`);
			// Remove the deleted category from the state
			setGetCategory((prevCategories) =>
				prevCategories.filter((category) => category.id !== id)
			);
		} catch (e) {
			console.error("Error deleting category:", e.message);
		}
	};

	return (
		<>
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
													type="button"
													className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
													Edit
												</button>
												<button
													type="button"
													onClick={() => handleDeleteCategory(categories.id)}
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

				<section className="bg-white mt-12">
					<div className="mx-auto max-w-xl">
						<form action="#">
							<div className="p-2 mb-4 w-full flex justify-center items-center flex-col gap-4">
								<label
									htmlFor="category"
									className="w-full text-gray-700 text-xl font-bold mb-2">
									Adding Brand
								</label>
								<div className="flex justify-center items-center gap-4">
									<input
										type="text"
										name="name"
										placeholder="Add a Brand"
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
									Brand Name
								</th>
							</tr>
						</thead>
						<tbody className="bg-white"></tbody>
					</table>
				</div>
			</div>
		</>
	);
}
