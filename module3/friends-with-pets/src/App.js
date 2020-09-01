import React from 'react';
import FriendsList from "./friendslist/FriendsList";
import './App.css';

function App() {
	return (
		<div className="app">
			<header>
				<h1>Friends with Pets</h1>
			</header>
			<main>
				<FriendsList />
			</main>
		</div>
	);
}

export default App;
