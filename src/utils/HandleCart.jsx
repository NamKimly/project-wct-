// src/utils/cartUtils.js
import axios from "axios";

export const handleAddToCart = async (id, currentUser, token, setItemsCart) => {
	if (currentUser && currentUser.role === "customer") {
		const cartList = {
			product_id: id,
			quantity: 1,
		};
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_API_URL}/cart/add`,
				cartList,
				{
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(response.data.message);
		} catch (err) {
			console.log(err.message);
		}
	} else {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_API_URL}/products/${id}`
			);
			const newItem = response.data.product;

			// Read the current cart items from localStorage
			const currentCartItems =
				JSON.parse(localStorage.getItem("cart_items")) || [];

			// Find the index of the item in the cart
			const existingIndex = currentCartItems.findIndex(
				(item) => item.id === newItem.id
			);

			if (existingIndex === -1) {
				// If the item does not exist, add it with quantity 1
				newItem.quantity = 1;
				const updatedCartItems = [...currentCartItems, newItem];
				setItemsCart(updatedCartItems);
				localStorage.setItem("cart_items", JSON.stringify(updatedCartItems));
			} else {
				// If the item exists, update its quantity
				const updatedCartItems = [...currentCartItems];
				updatedCartItems[existingIndex].quantity += 1;
				setItemsCart(updatedCartItems);
				localStorage.setItem("cart_items", JSON.stringify(updatedCartItems));
			}
		} catch (err) {
			console.error("Error fetching product details:", err.message);
		}
	}
};
