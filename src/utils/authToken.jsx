//* Get token
export default function authToken() {
	let token = localStorage.getItem("token") ?? "";
	return (token = token.replace(/"/g, ""));
}
