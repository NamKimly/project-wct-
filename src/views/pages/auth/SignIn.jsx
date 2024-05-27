import facebook from "./../../../assets/facebook.png";
import google from "./../../../assets/google.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../app/slice";
import { useState, useEffect } from "react";

export default function SignIn() {
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const { loading, error } = useSelector((state) => state.user);

	const [loginGoogleUrl, setLoginGoogleUrl] = useState(null);
	const [loginFacebookUrl, setLoginFacebookUrl] = useState(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	/** Goole Login **/
	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}/auth/google`, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			})
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				}
				throw new Error("Something went wrong!");
			})
			.then((data) => setLoginGoogleUrl(data.url))
			.catch((error) => console.error(error));
	}, []);

	/** Facebook Login **/
	useEffect(() => {
		axios
			.get(`${import.meta.env.VITE_API_URL}/auth/facebook`, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			})
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				}
				throw new Error("Something went wrong!");
			})
			.then((data) => setLoginFacebookUrl(data.url))
			.catch((error) => console.error(error));
	}, []);

	const isEmail = (input) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(input);
	};

	/**
	 *
	 *  wheater user login with email or phone number
	 *
	 * **/
	const handleOnLogin = (e) => {
		e.preventDefault();
		let userCredentials = {};

		if (isEmail(credential)) {
			userCredentials = {
				email: credential,
				password,
			};
		} else {
			userCredentials = {
				mobile_no: credential,
				password,
			};
		}

		/** Dispatch the action of login */
		dispatch(loginUser(userCredentials)).then((action) => {
			if (action.payload) {
				const userRole = action.payload.role;
				if (userRole === "admin") {
					console.log(`This is ${userRole} `);
					navigate("/admin/dashboard");
				} else {
					console.log(`This is ${userRole}: `);
					navigate("/");
				}
				setCredential("");
				setPassword("");
			}
		});
	};

	return (
		<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
								name="email/phone_number"
								type="text"
								value={credential}
								onChange={(e) => setCredential(e.target.value)}
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900">
								Password
							</label>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								autoComplete="current-password"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<button
							onClick={handleOnLogin}
							type="submit"
							className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
							{loading ? "Loading..." : "Sign In"}
						</button>
						{error && <div className="">{error}</div>}
					</div>
					<div className="flex justify-center  items-center mt-4 gap-4">
						<Link to="" className="text-sm  text-red-600 hover:text-indigo-500">
							Forgot password
						</Link>
					</div>
					<div className=" flex justify-center items-center text-sm text-black before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6  dark:before:border-neutral-600 dark:after:border-neutral-600">
						or continue with
					</div>
					<div className="flex justify-center items-center gap-8">
						{loginGoogleUrl != null && (
							<a
								href={loginGoogleUrl}
								className="flex w-full items-center gap-2 justify-center rounded-md bg-white px-3 py-1.5 text-xs  border border-slate-600    font-semibold leading-6 text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								<img src={google} alt="#" className="max-w-full w-4 h-4" />
								Google Sign In
							</a>
						)}
						{loginFacebookUrl != null && (
							<a
								href={loginFacebookUrl}
								type="submit"
								className="flex w-full items-center gap-2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								<img src={facebook} alt="#" className="max-w-full w-4 h-4" />
								Sign in with Facebook
							</a>
						)}
					</div>
				</form>

				<div className="flex justify-center  items-center mt-4 gap-4">
					<p href="#" className="text-sm text-gray-500">
						Not a member?
					</p>
					<Link
						to={"/signup"}
						className="text-xs font-semibold text-red-600 hover:text-indigo-500">
						Sign Up
					</Link>
					<p href="#" className="text-sm text-gray-500">
						/
					</p>
					<Link
						to={"/"}
						className="text-sm text-center text-indigo-600 hover:text-indigo-500">
						Go to home
					</Link>
				</div>
			</div>
		</div>
	);
}
