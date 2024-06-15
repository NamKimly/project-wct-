import { Link } from "react-router-dom";
export default function Cancel() {
	return (
		<div className="bg-gray-100 h-screen">
			<div className="bg-white p-6  md:mx-auto">
				<svg
					height="48"
					viewBox="0 0 48 48"
					width="48"
					xmlns="http://www.w3.org/2000/svg">
					<path d="M24 4c-11.05 0-20 8.95-20 20s8.95 20 20 20 20-8.95 20-20-8.95-20-20-20zm10 27.17l-2.83 2.83-7.17-7.17-7.17 7.17-2.83-2.83 7.17-7.17-7.17-7.17 2.83-2.83 7.17 7.17 7.17-7.17 2.83 2.83-7.17 7.17 7.17 7.17z" />
					<path d="M0 0h48v48h-48z" fill="none" />
				</svg>
				<div className="text-center">
					<h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
						Payment Done!
					</h3>
					<p className="text-gray-600 my-2">
						Thank you for completing your secure online payment.
					</p>
					<p> Have a great day! </p>
					<div className="py-10 text-center">
						<Link
							to="/"
							className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
							GO BACK
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
