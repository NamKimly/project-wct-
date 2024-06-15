// Function to convert ISO 8601 to a human-readable format
const formatDate = (isoString) => {
	const date = new Date(isoString);
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	};
	return date.toLocaleDateString("en-US", options);
};

export default formatDate;
