import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./../../app/slice";

export default function UserProfile() {
	//* Access currentUser from the auth slice via token
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user.currentUser);
	useEffect(() => {
		dispatch(getCurrentUser());
	}, [dispatch]);

	return (
		<>
			<div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg mb-8 text-gray-900">
				<div className="rounded-t-lg h-32 overflow-hidden">
					<img
						className="object-cover object-top w-full"
						src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
						alt="Mountain"
					/>
				</div>
				<div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
					<img
						className="object-cover w-full"
						src={
							currentUser.avatar
								? currentUser.avatar
								: "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
						}
						alt={
							"https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
						}
					/>
				</div>
				<div className="text-center mt-2">
					<h2 className="font-semibold uppercase">{currentUser?.name}</h2>
					<p className="text-gray-500">{currentUser?.role}</p>
				</div>
				<div className="flex justify-center items-center">
					<ul className="py-4 mt-2 flex-col gap-2 text-gray-700 flex justify-start items-start">
						<li className="flex  items-center gap-2  justify-center">
							<i className="fa-solid fa-envelope"></i>
							<div>{currentUser.email}</div>
						</li>
						<li className="flex items-center gap-2 justify-between">
							<i className="fa-solid fa-phone"></i>
							<div>{currentUser.mobile_no || currentUser.provider}</div>
						</li>
						<li className="flex gap-2 items-center justify-around uppercase">
							<i className="fa-solid fa-user"></i>
							<div>{currentUser.role}</div>
						</li>
					</ul>
				</div>
				<div className="p-4 border-t mx-8 mt-2">
					<button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
						Edit
					</button>
				</div>
			</div>
		</>
	);
}
