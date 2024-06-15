import React from "react";
import { Link } from "react-router-dom";

export default function TermCondition() {
	return (
		<div className="flex items-center justify-center h-screen my-16">
			<div className="bg-white w-3/4 lg:w-1/2 p-8 rounded-lg shadow-md">
				<h2 className="text-2xl font-semibold mb-6">Terms and Conditions</h2>
				<div className="text-sm text-gray-700">
					<p className="mb-4">
						<span className="font-semibold">Product Information:</span> We
						strive to provide accurate product descriptions, images, and
						specifications on our website. However, we do not guarantee the
						accuracy, completeness, or reliability of any information provided.
					</p>
					<p className="mb-4">
						<span className="font-semibold">Ordering and Payment:</span> All
						orders placed through our website are subject to acceptance and
						availability. We reserve the right to refuse or cancel any order for
						any reason at any time. Payment must be made in full at the time of
						placing the order.
					</p>
					<p className="mb-4">
						<span className="font-semibold">Returns and Exchanges:</span> We
						accept returns and exchanges within days of delivery for unused and
						undamaged items in their original packaging. Please contact our
						customer service team for instructions on returning or exchanging an
						item.
					</p>

					<p>
						<span className="font-semibold">Refund:</span> Refunds will be
						issued to the original payment method within business days of
						receiving the returned item. Shipping and handling fees are
						non-refundable. item.
					</p>
				</div>
				<Link className="text-sm text-red-500" to="/cart_detail">
					Go To Cart Detail
				</Link>
			</div>
		</div>
	);
}
