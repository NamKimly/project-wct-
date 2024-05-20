/* eslint-disable react/prop-types */
export default function Pagination({
	totalPosts,
	postsPerPage,
	setCurrentPage,
	currentPage,
}) {
	let pages = [];
	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pages.push(i);
	}
	return (
		<>
			<div className="flex justify-center items-center gap-4 mt-4">
				{pages.map((page, key) => (
					<button
						onClick={() => setCurrentPage(page)}
						key={key}
						className={
							currentPage === page
								? "active border h-full hover:bg-sky-500 hover:text-white  hover:border-white rounded-full flex justify-center items-center border-stone-800 w-[1.6rem]"
								: " border rounded-full h-full hover:bg-sky-500 hover:text-white  hover:border-white flex justify-center items-center border-stone-800 w-[1.6rem]"
						}>
						{page}
					</button>
				))}
			</div>
		</>
	);
}
