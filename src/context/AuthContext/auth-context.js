import React, { createContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token") || "");

	useEffect(() => {
		if (token) {
			localStorage.setItem("token", token);
		} else {
			localStorage.removeItem("token");
		}
	}, [token]);

	return (
		<AuthContext.Provider value={{ token, setToken }}>
			{children}
		</AuthContext.Provider>
	);
};
