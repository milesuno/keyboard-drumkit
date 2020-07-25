import React from "react";
import "./App.css";
import { Keyboard } from "./components/keyboard/keyboard";

//TODO: Add audio recording 
function App() {
	return (
		<div className="main-wrapper">
			<h1>Drumkit App</h1>
			<Keyboard />
		</div>
	);
}

export default App;
