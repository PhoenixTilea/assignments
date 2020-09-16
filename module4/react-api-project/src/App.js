import React from "react";
import { UserContextProvider } from "./contexts/UserContext";
import { ThemeContextProvider } from "./contexts/ThemeContextProvider";
import Header from "./pages/Header";
import Main from "./pages/Main";
import Footer from "./pages/Footer";
import "./App.css";

export default function App() {
	return (
		<UserContextProvider><ThemeContextProvider>
			<Header />
			<Main />
			<Footer />
		</ThemeContextProvider></UserContextProvider>
	);
}