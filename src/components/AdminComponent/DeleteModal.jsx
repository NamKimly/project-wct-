import axios from "axios";

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
export default DeleteModal;
