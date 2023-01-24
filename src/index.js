import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext/auth-context";
import { UserProvider } from "./context/UserContext/user-context";
import { Provider } from "react-redux";
import { store } from "./components/redux/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<AuthProvider>
			<UserProvider>
				<React.StrictMode>
					<Provider store={store}>
						<App />
					</Provider>
				</React.StrictMode>
			</UserProvider>
		</AuthProvider>
	</BrowserRouter>,
);
