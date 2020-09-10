import React from "react";

const ThemeContext = React.createContext();
const { Provider, Consumer } = ThemeContext;

export class ThemeContextProvider extends React.Component {
	state = { theme: "dark" }
	constructor(props) {
		super(props);
	}
	
	changeTheme = theme => this.setState({theme});
	
	render() {
		return (
			<Provider value={{theme: this.state.theme, changeTheme: this.changeTheme}}>
				{this.props.children}
			</Provider>
		);
	}
}

export { ThemeContext, Consumer };