/* eslint-disable react/prop-types */
import { product } from "../../data/mock-data";
import { Link } from "react-router-dom";

console.log(typeof product);
const SideBar = () => {
	return (
		<>
			<div className="flex flex-col shadow-2xl gap-8 p-8 ml-8 w-1/6 mb-8">
				<div className="filter-1 flex flex-col items-start justify-start gap-2">
					<div>
						<p className="font-semibold text-lg md:text-xl mb-3">Price</p>
						<input
							id="default-radio-1"
							type="checkbox"
							value=""
							name="default-radio"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-md font-medium text-black">
							Under $20
						</label>
					</div>

					<div>
						<input
							id="default-radio-1"
							type="checkbox"
							value=""
							name="default-radio"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-md font-medium text-black">
							$20- 40$
						</label>
					</div>

					<div>
						<input
							id="default-radio-1"
							type="checkbox"
							value=""
							name="default-radio"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-md font-medium text-black">
							$50- Above
						</label>
					</div>

					<div className="flex justify-start items-start mt-2 ">
						<div className="flex justify-start items-start w-full h-8">
							<input
								type="text"
								id="min-price"
								className=" p-1.5  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500  w-3/4  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Min Price"
								required
							/>
						</div>
						<div className="flex justify-start items-start w-full h-8">
							<input
								type="text"
								id="max-price"
								className="p-1.5  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500  w-3/4  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Max Price"
								required
							/>
						</div>
					</div>
				</div>
				<hr className="container  h-0.5 border-t-0 bg-zinc-300" />

				{/** */}
				<div className="filter-1 flex flex-col items-start justify-start gap-2">
					<div>
						<p className="font-semibold text-xl mb-3"> Product Category</p>
						<input
							id="default-radio-1"
							type="checkbox"
							value=""
							name="default-radio"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-sm font-medium text-black">
							Small Kitchen Appliance
						</label>
					</div>

					<div>
						<input
							id="default-radio-1"
							type="checkbox"
							value=""
							name="default-radio"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-sm font-medium text-black">
							Cookware
						</label>
					</div>

					<div>
						<input
							id="default-radio-1"
							type="checkbox"
							value=""
							name="default-radio"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-sm font-medium text-black">
							Large Appliance
						</label>
					</div>
					<div>
						<input
							id="default-radio-1"
							type="checkbox"
							value=""
							name="default-radio"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-sm font-medium text-black">
							Cooking and Heating
						</label>
					</div>

					<div>
						<input
							id="default-radio-1"
							type="checkbox"
							value=""
							name="default-radio"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-sm font-medium text-black">
							Floor care and Garment
						</label>
					</div>

					<div>
						<input
							id="default-radio-1"
							type="checkbox"
							value=""
							name="default-radio"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-sm font-medium text-black">
							LED TV and Audio
						</label>
					</div>
				</div>
				<hr className="container  h-0.5 border-t-0 bg-zinc-300" />

				{/* */}

				<div className="filter-1 flex flex-col items-start justify-start gap-2">
					<div>
						<p className="font-semibold text-xl mb-3"> Product Brand</p>
						<input
							id="default-radio-1"
							type="checkbox"
							value=""
							name="default-radio"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-sm font-medium text-black">
							SamSung
						</label>
					</div>

					<div>
						<input
							id="default-radio-1"
							type="checkbox"
							value=""
							name="default-radio"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-sm font-medium text-black">
							Sony
						</label>
					</div>

					<div>
						<input
							id="default-radio-1"
							type="checkbox"
							value=""
							name="default-radio"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-sm font-medium text-black">
							LG
						</label>
					</div>
					<div>
						<input
							id="default-radio-1"
							type="checkbox"
							value=""
							name="default-radio"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-sm font-medium text-black">
							Panasonic
						</label>
					</div>
				</div>
				<hr className="container  h-0.5 border-t-0 bg-zinc-300" />

				{/* */}

				<div className="filter-1 flex flex-col items-start justify-start gap-2">
					<div>
						<p className="font-semibold text-xl mb-3"> Deal & Discount</p>
						<input
							id="default-radio-1"
							type="checkbox"
							value=""
							name="default-radio"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-md font-medium text-black">
							Discount
						</label>
					</div>

					<div>
						<input
							id="default-radio-1"
							type="checkbox"
							value=""
							name="default-radio"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-md font-medium text-black">
							Popular
						</label>
					</div>

					<div>
						<input
							id="default-radio-1"
							type="checkbox"
							value=""
							name="default-radio"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-md font-medium text-black">
							New Arrival
						</label>
					</div>
				</div>

				{/* */}
			</div>
		</>
	);
};

const ProductsList = ({ product }) => {
	return (
		<div className="container mx-auto flex gap-8 flex-wrap max-w-2xl px-2 lg:max-w-7xl">
			{product.map((product, key) => (
				<div
					key={key}
					className="relative lg:max-w-7xl   h-full flex flex-col  text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl lg:w-64">
					<div className="flex relative h-52 mx-4 mt-4 overflow-hidden text-white bg-clip-border rounded-md shadow-blue-gray-500/40">
						<div className="w-full h-full flex justify-center items-center m-4 ">
							<img
								src={product.images[0].image1}
								alt="card-image"
								className="max-w-48 object-cover object-center lg:h-3/4 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
							/>
						</div>
					</div>

					<div className="p-6">
						<p className="block mb-2 font-sans lg:text-xl md:text-base antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
							{product.product_name}
						</p>
						<p className="block font-sans text-base text-red-500 antialiased font-light leading-relaxed text-inherit">
							${product.price}
						</p>
					</div>
					<div className="flex justify-between items-center p-6 pt-0">
						<button
							className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
							type="button">
							Add To Cart
						</button>
						<div className="flex justify-center items-center gap-4">
							<i className="far fa-heart cursor-pointer md:text-sm"></i>
							<Link to={"/productdetail"}>
								<i className="fas fa-eye text-black cursor-pointer md:text-sm"></i>
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default function Shopping() {
	return (
		<>
			<div className="flex gap-20">
				<SideBar />
				<div className="flex justify-start items-start">
					<ProductsList product={product} />
				</div>
			</div>
		</>
	);
}
