import axios from "axios";
import authToken from "./../../../utils/authToken";
import { useEffect, useState } from "react";

export default function DashBoard() {
	const [getUser, setGetUser] = useState([]);
	const [countUser, setCountUser] = useState(null);
	const [countProduct, setCountProduct] = useState(null);

	//*Count total users
	useEffect(() => {
		//* Getting Token from storing of each user by this only for admin
		const token = authToken();

		if (!token) {
			console.error("No token found. User is not authorized.");
			return;
		}
		const handleGetUser = async () => {
			const users = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
				headers: {
					Accept: `application/json`,
					Authorization: `Bearer ${token}`,
				},
			});
			const amountUser = users.data.users.length;
			setGetUser(users.data.users);
			setCountUser(amountUser);
		};
		handleGetUser();
	}, []);

	//* Count total products
	useEffect(() => {
		const handleGetProduct = async () => {
			const products = await axios.get(
				`${import.meta.env.VITE_API_URL}/products`
			);
			const amountProduct = products.data.product.length;
			setCountProduct(amountProduct);
		};
		handleGetProduct();
	}, []);

	return (
		<>
			<div className="mt-12">
				<div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
					<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
						<div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
								className="w-6 h-6 text-white">
								<path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
								<path
									fillRule="evenodd"
									d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
									clipRule="evenodd"></path>
								<path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
							</svg>
						</div>
						<div className="p-4 text-right">
							<p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
								Total Products
							</p>
							<h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
								{countProduct ? countProduct : 0}
							</h4>
						</div>
						<div className="border-t border-blue-gray-50 p-4">
							<p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
								<strong className="text-green-500">+55%</strong>&nbsp;than last
								week
							</p>
						</div>
					</div>
					<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
						<div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
								className="w-6 h-6 text-white">
								<path
									fillRule="evenodd"
									d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
									clipRule="evenodd"></path>
							</svg>
						</div>
						<div className="p-4 text-right">
							<p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
								Total Order
							</p>
							<h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
								2,300
							</h4>
						</div>
						<div className="border-t border-blue-gray-50 p-4">
							<p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
								<strong className="text-green-500">+3%</strong>&nbsp;than last
								month
							</p>
						</div>
					</div>
					<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
						<div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
								className="w-6 h-6 text-white">
								<path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
							</svg>
						</div>
						<div className="p-4 text-right">
							<p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
								Clients
							</p>
							<h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
								{countUser ? countUser : 0}
							</h4>
						</div>
						<div className="border-t border-blue-gray-50 p-4">
							<p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
								<strong className="text-red-500">-2%</strong>&nbsp;than
								yesterday
							</p>
						</div>
					</div>
					<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
						<div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"
								className="w-6 h-6 text-white">
								<path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
							</svg>
						</div>
						<div className="p-4 text-right">
							<p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
								Sales
							</p>
							<h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
								$103,430
							</h4>
						</div>
						<div className="border-t border-blue-gray-50 p-4">
							<p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
								<strong className="text-green-500">+5%</strong>&nbsp;than
								yesterday
							</p>
						</div>
					</div>
				</div>

				{/** User Table*/}
				<div className="shadow-lg rounded-lg overflow-hidden">
					<table className="w-full table-fixed">
						<thead>
							<tr className="bg-gray-100">
								<th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
									Name
								</th>
								<th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
									Email
								</th>
								<th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
									Phone / Socials
								</th>
								<th className="w-1/4 py-4 px-6 text-left text-gray-600 font-bold uppercase">
									Role
								</th>
							</tr>
						</thead>
						<tbody className="bg-white overflow-scroll">
							{getUser &&
								getUser.map((users, key) => (
									<tr key={key}>
										<td className="py-4 px-6 border-b border-gray-200">
											{users.name}
										</td>
										<td className="py-4 px-6 border-b border-gray-200 truncate">
											{users.email}
										</td>
										<td className="py-4 px-6 border-b text-left uppercase  border-gray-200">
											{users.mobile_no ? users.mobile_no : users.provider}
										</td>
										<td className="py-4 px-6 border-b border-gray-200">
											<span className="bg-green-500 uppercase text-white py-1 px-2 rounded-full text-xs">
												{users.role}
											</span>
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
