import React, { useState } from "react";
import { themes } from "../data.json";

const ThemeContext = React.createContext();

function ThemeContextProvider(props) {
	const [theme, setTheme] = useState(localStorage.theme || themes[0]);
	
	const changeTheme = (newTheme) => {
		setTheme(newTheme);
		localStorage.theme =  newTheme;
	};
	
	return (
		<ThemeContext.Provider value={{theme, changeTheme}}>
			{props.children}
		</ThemeContext.Provider>
	);
}

export {ThemeContext, ThemeContextProvider};