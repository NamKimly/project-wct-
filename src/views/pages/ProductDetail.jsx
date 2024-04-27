import { Link } from "react-router-dom";
export default function ProductDetail() {
	return (
		<>
			<section className="container  m-8">
				<div className="container mx-auto px-4">
					<nav className="flex">
						<ol role="list" className="flex items-center">
							<li className="text-left">
								<div className="-m-1">
									<Link
										to={"/"}
										className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800">
										Home
									</Link>
								</div>
							</li>

							<li className="text-left">
								<div className="flex items-center">
									<span className="mx-2 text-gray-400">/</span>
									<div className="-m-1">
										<Link
											to={"/shop"}
											className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800">
											Shop
										</Link>
									</div>
								</div>
							</li>

							<li className="text-left">
								<div className="flex items-center">
									<span className="mx-2 text-gray-400">/</span>
									<div className="-m-1">
										<a
											href="#"
											className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
											aria-current="page">
											Product
										</a>
									</div>
								</div>
							</li>
						</ol>
					</nav>

					<div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
						<div className="lg:col-span-3 lg:row-end-1">
							<div className="lg:flex lg:items-start">
								<div className="lg:order-2 lg:ml-5">
									<div className="max-w-xl overflow-hidden rounded-lg">
										<img
											className="h-full w-full max-w-full object-cover"
											src="https://cdn.thewirecutter.com/wp-content/uploads/2020/05/microwave-lowres-2x1-5100jpg.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2"
											alt=""
										/>
									</div>
								</div>

								<div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
									<div className="flex flex-row items-start lg:flex-col">
										<button
											type="button"
											className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg text-center">
											<img
												className="h-full w-full object-fill object-center"
												src="https://cdn.thewirecutter.com/wp-content/uploads/2020/05/microwave-lowres-2x1-5100jpg.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2"
												alt=""
											/>
										</button>
										<button
											type="button"
											className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center">
											<img
												className="h-full w-full object-fill object-center"
												src="https://cdn.thewirecutter.com/wp-content/uploads/2020/05/microwave-lowres-2x1-5100jpg.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2"
												alt=""
											/>
										</button>
										<button
											type="button"
											className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-transparent text-center">
											<img
												className="h-full w-full object-fill object-center"
												src="https://cdn.thewirecutter.com/wp-content/uploads/2020/05/microwave-lowres-2x1-5100jpg.jpg?auto=webp&quality=75&crop=2:1&width=980&dpr=2"
												alt=""
											/>
										</button>
									</div>
								</div>
							</div>
						</div>

						<div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
							<h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
								Microwave Benq-6534
							</h1>

							<div className="mt-4 w-3/4">
								<h2 className="font-semibold text-md"> Description</h2>
								<p className="text-sm mt-2">
									The Panasonic microwave oven combines sleek design with
									powerful performance, offering convenient cooking options for
									your kitchen. With advanced technology and intuitive controls,
									it delivers quick and even heating for your favorite dishes.
									Whether you're defrosting, reheating, or cooking from scratch,
									this microwave is your versatile culinary companion.
								</p>
							</div>

							<div className="mt-10 flex flex-col items-start justify-start gap-8 space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
								<button
									type="button"
									className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="shrink-0 mr-3 h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
										/>
									</svg>
									Buy Now
								</button>
								<button
									type="button"
									className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="shrink-0 mr-3 h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
										/>
									</svg>
									Add to cart
								</button>
							</div>
							<div className="flex items-end p-2 gap-2">
								<h1 className="text-xl font-bold">Total:</h1>
								<h1 className="text-xl font-bold">$60.50</h1>
							</div>

							<ul className="mt-8 space-y-2">
								<li className="flex items-center text-left text-sm font-medium text-gray-600">
									<svg
										className="mr-2 block h-5 w-5 align-middle text-gray-500"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											className=""></path>
									</svg>
									Free shipping worldwide
								</li>

								<li className="flex items-center text-left text-sm font-medium text-gray-600">
									<svg
										className="mr-2 block h-5 w-5 align-middle text-gray-500"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
											className=""></path>
									</svg>
									Cancel Anytime
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
