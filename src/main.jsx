import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import store from "./app/store.js";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<GoogleOAuthProvider clientId="340152758640-233547fguhpdig50te7nc4b12rr7004v.apps.googleusercontent.com">
			<App />
		</GoogleOAuthProvider>
	</Provider>
);
