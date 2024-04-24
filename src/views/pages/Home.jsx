/* eslint-disable react/prop-types */
import Slider from "../../components/Slider";
import oven from "./../../assets/oven.png";
import iron from "./../../assets/iron.png";
import laundry from "./../../assets/laundry.png";
import microwave from "./../../assets/microwave.png";
import refrigerator from "./../../assets/refrigerator.png";
import transport from "./../../assets/transport.png";
import service from "./../../assets/service.png";
import protect from "./../../assets/protect.png";

const NewArrival = () => {
	return (
		<>
			<div className="flex justify-center items-center w-full gap-8 px-28">
				<div className="flex justify-start items-center gap-4">
					<div className="bg-red-600 w-4 h-8 rounded-sm"></div>
					<p className="font-semibold ">New Arrival</p>
				</div>
				<div className="w-1/2">
					<img
						src="https://marketplace.canva.com/EAFED0hv9G0/1/0/1600w/canva-blue-pink-modern-special-offer-sale-banner-J5VkNReQ8WA.jpg"
						alt="#"
						className="max-w-full h-full rounded-lg hover:scale-105"
					/>
				</div>
				<div className="flex flex-col w-1/2 gap-8">
					<div className="w-full h-full">
						<img
							src="https://t4.ftcdn.net/jpg/04/89/28/05/360_F_489280525_nISHfaWCctYBFlyYkTQUkzQwVOPWmyvp.jpg"
							alt="#"
							className="max-w-full rounded-lg hover:scale-105"
						/>
					</div>
					<div className="flex justify-center items-center gap-8">
						<div className="w-1/2 ">
							<img
								src="https://i.pinimg.com/736x/f0/f9/e4/f0f9e45724771f16745ad3f6f640d3ce.jpg"
								alt="#"
								className="max-w-full rounded-lg hover:scale-105"
							/>
						</div>
						<div className="w-1/2">
							<img
								src="https://s.tmimgcdn.com/scr/1200x750/375400/special-sale-on-electronic-devices-banner-design-template-2_375421-original.jpg"
								alt="#"
								className="max-w-full rounded-lg hover:scale-105"
							/>
						</div>
					</div>
				</div>
			</div>
			<hr className="cotainer my-12 mx-28 h-0.5 border-t-0 bg-zinc-300" />
		</>
	);
};

const CategoryCarosouel = () => {
	const slides = [
		{
			url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
		},
		{
			url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
		},
		{
			url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
		},
		{
			url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
		},
		{
			url: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/10/kurosaki-ichigo-bleach-thousand-year-bloor-war.jpg",
		},
	];

	return (
		<>
			<div className="flex justify-center items-start mx-8 gap-4 flex-wrap">
				<div className="category ml-8">
					<p className="font-bold text-2xl mb-8">Product Categories </p>
					<ul className="flex justify-start items-start flex-col gap-3 text-sm ">
						<li>
							<a href="#">Small Kitchen Appliance</a>
						</li>
						<li>
							<a href="#">Cookware</a>
						</li>
						<li>
							<a href="#">Large Appliance</a>
						</li>
						<li>
							<a href="#">Cooking and Heating</a>
						</li>
						<li>
							<a href="#">Floor care and Garment</a>
						</li>
						<li>
							<a href="#">LED TV and Audio</a>
						</li>
						<li>
							<a href="#">Personal Care</a>
						</li>
						<li>
							<a href="#">Other</a>
						</li>
					</ul>
				</div>
				<div className="inline-block h-[21rem] min-h-[1.5rem] w-px self-stretch bg-zinc-300 ml-4"></div>

				<Slider slides={slides} />
			</div>
		</>
	);
};

const ProductCard = ({ imageURL }) => {
	return (
		<div className="relative flex flex-col mt- text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl w-64">
			<div className="flex relative h-52 mx-4 mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-md shadow-blue-gray-500/40">
				<div className="w-full h-full flex justify-center items-center m-4">
					<img
						src={imageURL}
						alt="card-image"
						className="max-w-full h-3/4 hover:scale-105"
					/>
				</div>

				<div className="absolute bg-red-500 w-20 h-8 rounded-md flex justify-center items-center m-3">
					<p className="text-white text-sm">50% OFF</p>
				</div>
				{/* <div className="absolute bg-emerald-500 w-24 h-8 rounded-md flex justify-center items-center m-3">
					<p className="text-white text-sm">New Arrrival</p>
				</div> */}
			</div>

			<div className="p-6">
				<h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
					Product Name
				</h5>
				<p className="block font-sans text-base text-red-500 antialiased font-light leading-relaxed text-inherit">
					Product Price
				</p>
			</div>
			<div className="flex justify-between items-center p-6 pt-0">
				<button
					className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
					type="button">
					Add To Cart
				</button>
				<div className="flex justify-center items-center gap-4">
					<i className="fa-regular fa-heart"></i>
					<i className="fa-solid fa-eye text-black "></i>
				</div>
			</div>
		</div>
	);
};

const ProductListing = ({ categoryTitle, categoryHeader }) => {
	return (
		<>
			<div className="flex flex-col mt-16  px-28">
				<div className="flex justify-start items-center gap-4">
					<div className="bg-red-600 w-4 h-8 rounded-sm"></div>
					<p className="font-semibold ">{categoryHeader}</p>
				</div>
				<p className="font-bold text-3xl mt-4">{categoryTitle} </p>
				<div className="flex justify-center items-center gap-20 listing-product mt-8 flex-wrap ">
					<ProductCard imageURL="https://sunsimexco.com.kh/wp-content/uploads/2020/09/NN-GT35HMYTE-3.jpg" />
					<ProductCard imageURL="https://content.jdmagicbox.com/comp/bhopal/a4/0755px755.x755.120921155350.p8a4/catalogue/mangalam-electronics-m-p-nagar-bhopal-electronic-goods-showrooms-80lbmi.jpg" />
					<ProductCard imageURL="https://sunsimexco.com.kh/wp-content/uploads/2020/09/NN-GT35HMYTE-3.jpg" />
					<ProductCard imageURL="https://sunsimexco.com.kh/wp-content/uploads/2020/09/NN-GT35HMYTE-3.jpg" />
				</div>

				<div className="flex justify-center items-center">
					<button
						className=" flex justify-center items-center gap-2 mt-12 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-md bg-red-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
						type="button">
						See more
						<i className="fa-solid fa-arrow-right-to-bracket"></i>
					</button>
				</div>
			</div>
			<hr className="cotainer my-12 mx-28 h-0.5 border-t-0 bg-zinc-300" />
		</>
	);
};

const FilterCategory = ({ categoryHeader, categoryTitle }) => {
	return (
		<>
			<p className="text-center font-bold text-3xl mt-4">Filter Products</p>
			<div className="flex justify-center items-center gap-20 mt-12 ">
				<div className="border rounded-lg hover:scale-105 border-slate-950  w-24 h-24 p-8 flex justify-center items-center flex-col cursor-pointer">
					<img src={oven} alt="#" className="size-8" />
					<p className="text-sm"> Oven</p>
				</div>
				<div className="border rounded-lg hover:scale-105 border-slate-950 w-24 h-24 p-8 flex justify-center items-center flex-col cursor-pointer">
					<img src={iron} alt="#" className="size-8" />
					<p className="text-sm"> Iron </p>
				</div>
				<div className="border rounded-lg hover:scale-105 border-slate-950 w-24 h-24 p-8 flex justify-center items-center flex-col cursor-pointer">
					<img src={laundry} alt="#" className="size-8" />
					<p className="text-sm">laundry</p>
				</div>
				<div className="border rounded-lg hover:scale-105 border-slate-950 w-24 h-24 p-8 flex justify-center items-center flex-col cursor-pointer">
					<img src={microwave} alt="#" className="size-8" />
					<p className="text-sm"> Microwave </p>
				</div>
				<div className="border rounded-lg hover:scale-105 border-slate-950 w-24 h-24 p-8 flex justify-center items-center flex-col cursor-pointer">
					<img src={refrigerator} alt="#" className="size-8" />
					<p className="text-sm"> Refrigerator</p>
				</div>
			</div>
			<div className="container flex flex-col mt-16  px-28">
				<div className="flex justify-start items-center gap-4">
					<div className="bg-red-600 w-4 h-8 rounded-sm"></div>
					<p className="font-semibold ">{categoryHeader}</p>
				</div>
				<p className="font-bold text-3xl mt-4">{categoryTitle} </p>
				<div className="flex justify-center items-center gap-20 listing-product mt-8 flex-wrap ">
					<ProductCard imageURL="https://sunsimexco.com.kh/wp-content/uploads/2020/09/NN-GT35HMYTE-3.jpg" />
					<ProductCard imageURL="https://content.jdmagicbox.com/comp/bhopal/a4/0755px755.x755.120921155350.p8a4/catalogue/mangalam-electronics-m-p-nagar-bhopal-electronic-goods-showrooms-80lbmi.jpg" />
					<ProductCard imageURL="https://m.media-amazon.com/images/I/31A83LHVzyL._AC_UF226,226_FMjpg_.jpg" />
					<ProductCard imageURL="https://m.media-amazon.com/images/I/31K4Xg6XWTL._AC_UF226,226_FMjpg_.jpg" />
					<ProductCard imageURL="https://m.media-amazon.com/images/I/51hOlH0REDL._AC_UF226,226_FMjpg_.jpg" />
					<ProductCard imageURL="https://m.media-amazon.com/images/I/41MRW2Nq98L._AC_UF226,226_FMjpg_.jpg" />
					<ProductCard imageURL="https://m.media-amazon.com/images/I/41uOlDCxMsS._AC_UF226,226_FMjpg_.jpg" />
					<ProductCard imageURL="https://sunsimexco.com.kh/wp-content/uploads/2020/09/NN-GT35HMYTE-3.jpg" />
				</div>

				<div className="flex justify-center items-center">
					<button
						className=" flex justify-center items-center gap-2 mt-12 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-md bg-red-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
						type="button">
						See more
						<i className="fa-solid fa-arrow-right-to-bracket"></i>
					</button>
				</div>
			</div>
			<hr className="cotainer my-12 mx-28 h-0.5 border-t-0 bg-zinc-300" />
		</>
	);
};

const ShopInformation = () => {
	return (
		<>
			<div className="container flex justify-center items-center gap-20 mb-12 flex-wrap">
				<div className="flex flex-col justify-center items-center gap-1.5">
					<img src={transport} alt="#" className="size-16" />
					<p className="font-semibold">FREE AND FAST DELIVERY</p>
					<p>Free delivery for all orders over $140</p>
				</div>
				<div className="flex flex-col justify-center items-center gap-1.5">
					<img src={service} alt="#" className="size-16" />
					<p className="font-semibold">24/7 CUSTOMER SERVICE</p>
					<p>Friendly 24/7 customer support</p>
				</div>
				<div className="flex flex-col justify-center items-center gap-1.5">
					<img src={protect} alt="#" className="size-16" />
					<p className="font-semibold">MONEY BACK GUARANTEE</p>
					<p>We return money within 30 days</p>
				</div>
			</div>
		</>
	);
};

export default function Home() {
	return (
		<>
			<CategoryCarosouel />

			<div className="lex flex-col justify-center items-center">
				{/** Filter Popular  */}
				<ProductListing
					categoryHeader="Today"
					categoryTitle="Popular Products"
				/>
				<NewArrival />

				{/** Filter Discount  */}
				<ProductListing
					categoryHeader="Discount"
					categoryTitle="Discount Products"
				/>
				{/** List Products including discounts   */}
				<FilterCategory
					categoryHeader="Products"
					categoryTitle="Explore All Products"
				/>

				<ShopInformation />
			</div>
		</>
	);
}
