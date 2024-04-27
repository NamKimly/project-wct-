import google from "./../../assets/google.png";
import facebook from "./../../assets/facebook.png";
import { Link } from "react-router-dom";
export default function SignUp() {
	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" action="#" method="POST">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900">
							Email address / Phone Number
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900">
								*Create Password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900">
								*Confirm Password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							Sign Up
						</button>
					</div>
					<div className="py-3 flex justify-center items-center text-sm text-black before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6  dark:before:border-neutral-600 dark:after:border-neutral-600">
						or sign up with
					</div>
					<div className="flex justify-center items-center gap-8">
						<button
							type="submit"
							className="flex w-full items-center gap-2 justify-center rounded-md bg-white px-3 py-1.5 text-xs  border border-slate-600    font-semibold leading-6 text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							<img src={google} alt="#" className="max-w-full w-4 h-4" />
							Sign Up with Google
						</button>

						<button
							type="submit"
							className="flex w-full items-center gap-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							<img src={facebook} alt="#" className="max-w-full w-4 h-4" />
							Sign Up with Facebook
						</button>
					</div>
				</form>

				<div className="flex justify-center  items-center mt-4 gap-4">
					<p href="#" className="text-sm text-gray-500">
						Already have an account?
					</p>
					<Link
						tp={"/login"}
						className="text-sm  text-red-600 hover:text-indigo-500">
						Login
					</Link>
					<p href="#" className="text-xs text-gray-500">
						/
					</p>
					<Link
						to={"/"}
						className="text-sm  text-indigo-600 hover:text-indigo-500">
						Go to home
					</Link>
				</div>
			</div>
		</div>
	);
}
