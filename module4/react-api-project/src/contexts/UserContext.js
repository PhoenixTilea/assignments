import React, { useState } from "react";

const UserContext = React.createContext();

function UserContextProvider(props) {
	const [user, setUser] = useState(localStorage.user || null);
	
	const handleLogin = (user) => setUser(user);
	const handleLogout = () => setUser(null);
	
	return (
		<UserContext.Provider value={{user: user, login: handleLogin, logout: handleLogout}}>
			{props.children}
		</UserContext.Provider>
	);
}

export { UserContext, UserContextProvider }