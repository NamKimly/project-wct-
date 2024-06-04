//* Handle calculating discount price
export function finalPrice(currentPrice, discountPercentage) {
	return `$${(currentPrice * (1 - discountPercentage * 0.01)).toFixed(2)}`;
}
