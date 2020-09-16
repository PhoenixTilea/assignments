import React, { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { themes } from "../data.json";

export default function ThemeForm() {
	const { theme, changeTheme } = useContext(ThemeContext);
	const [selected, setSelected] = useState(theme);
	
	const handleChange = (e) => setSelected(e.target.value);
	const handleSubmit = (e) => {
		e.preventDefault();
		changeTheme(theme);
	};
	
	return (
		<form className="theme-form" onSubmit={handleSubmit}>
			<label>
				<strong>Select Theme </strong>
				<select value={selected} onChange={handleChange}>
					{themes.map(t => (
						<option key={t} value={t}>{`${t[0].toUpperCase() + t.slice(1)} Theme`}</option>
					)};
				</select>
			</label>
			<button>Change</button>
		</form>
	);
}