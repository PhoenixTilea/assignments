import React, { useState } from "react";

const UserContext = React.createContext();

function UserContextProvider(props) {
	const [user, setUser] = useState(localStorage.user || null);
	
	const handleLogin = (newUser) => {
		newUser = newUser.toLowerCase();
		setUser(newUser);
		localStorage.user = newUser;
	};
	
	const handleLogout = () => {
		setUser(null);
		delete localStorage.user;
	};
	
	return (
		<UserContext.Provider value={{user: user, login: handleLogin, logout: handleLogout}}>
			{props.children}
		</UserContext.Provider>
	);
}

export { UserContext, UserContextProvider }