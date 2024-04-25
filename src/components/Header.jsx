import { NavLink } from "react-router-dom";
export default function Header() {
	return (
		<>
			<div className="flex justify-between items-center m-12 px-4 ">
				<div className="header-title ">
					<h1 className="text-2xl font-bold font-sans"> Electronic Store </h1>
				</div>

				<div className="header-nav flex justify-center items-center gap-20">
					<ul className="flex justify-center items-center gap-20 font-medium">
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/shopping">Brand</NavLink>
						</li>
						<li>
							<a href="#">Contact</a>
						</li>
						<li>
							<a href="#">About</a>
						</li>
					</ul>

					<form className="flex items-center max-w-sm mx-auto">
						<label htmlFor="simple-search" className="sr-only">
							Search
						</label>
						<div className="relative w-full">
							<div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
								<i className="fa-solid fa-magnifying-glass text-white"></i>
							</div>
							<input
								type="text"
								id="simple-search"
								className="bg-zinc-300 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="Search..."
								required
							/>
						</div>
					</form>
				</div>

				<div className="header-right flex justify-center items-center gap-12">
					<div className="header-cart">
						<i className="fa-solid fa-cart-shopping cursor-pointer"></i>
					</div>

					<div className="header-login flex justify-center items-center gap-4">
						<div className="login flex justify-center items-center gap-1">
							<i className="fa-solid fa-user"></i>
							<a href="#" className="">
								Login
							</a>
						</div>

						<button
							type="button"
							className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
							Sign Up
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
