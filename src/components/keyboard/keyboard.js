import React, { Component } from "react";
import "./keyboard.css";
import clap from "./sounds/clap.wav";
import hihat from "./sounds/hihat.wav";
import kick from "./sounds/kick.wav";
import openhat from "./sounds/openhat.wav";
import boom from "./sounds/boom.wav";
import ride from "./sounds/ride.wav";
import snare from "./sounds/snare.wav";
import tom from "./sounds/tom.wav";
import tink from "./sounds/tink.wav";

export class Keyboard extends Component {
	componentDidMount() {
		let screenKeys = document.querySelectorAll(".key");
		window.addEventListener("keydown", this.handleKeyDown);
		window.addEventListener("keyup", this.handleKeyUp);

		for (const key of screenKeys) {
			key.addEventListener("pointerdown", this.handleMouseDown);
			key.addEventListener("pointerup", this.handleMouseUp);
			key.addEventListener("pointerout", this.handleMouseUp);

		}
	}

	handleKeyDown = (event) => {
		let key = document.getElementById(event.key);
		let audio = document.getElementById(event.keyCode);

		if (!key && !audio) return;

		key.classList.add("playing");

		audio.currentTime = 0;
		audio.play();
	};

	handleKeyUp = (event) => {
		let key = document.getElementById(event.key);

		if (!key) return;

		key.classList.remove("playing");
	};

	handleMouseUp = (event) => {
		let target = event.target.id;

		//if <kbd> or <span> within is clicked
		if (!event.target.id) target = event.target.parentNode.id;

		let key = document.getElementById(target);

		if (!key) return;

		key.classList.remove("playing");
	};

	handleMouseDown = (event) => {
		let target = event.target.id;

		//if <kbd> or <span> within is clicked
		if (!event.target.id) target = event.target.parentNode.id;

		let key = document.getElementById(target);
		let audio = document.getElementById(target.charCodeAt(0) - 32); //ASCII conversion is 32 above char code

		if (!key && !audio) return;
		key.classList.add("playing");

		audio.currentTime = 0;
		audio.play();
	};

	render() {
		return (
			<>
				<div className="keys unselectable">
					<div id="a" className="key">
						<kbd>A</kbd>
						<span className="sound">clap</span>
						<audio id="65" src={clap}></audio>
					</div>
					<div id="s" className="key">
						<kbd>S</kbd>
						<span className="sound">hihat</span>
						<audio id="83" src={hihat}></audio>
					</div>
					<div id="d" className="key">
						<kbd>D</kbd>
						<span className="sound">kick</span>
						<audio id="68" src={kick}></audio>
					</div>
					<div id="f" className="key">
						<kbd>F</kbd>
						<span className="sound">openhat</span>
						<audio id="70" src={openhat}></audio>
					</div>
					<div id="g" className="key">
						<kbd>G</kbd>
						<span className="sound">boom</span>
						<audio id="71" src={boom}></audio>
					</div>
					<div id="h" className="key">
						<kbd>H</kbd>
						<span className="sound">ride</span>
						<audio id="72" src={ride}></audio>
					</div>
					<div id="j" className="key">
						<kbd>J</kbd>
						<span className="sound">snare</span>
						<audio id="74" src={snare}></audio>
					</div>
					<div id="k" className="key">
						<kbd>K</kbd>
						<span className="sound">tom</span>
						<audio id="75" src={tom}></audio>
					</div>
					<div id="l" className="key">
						<kbd>L</kbd>
						<span className="sound">tink</span>
						<audio id="76" src={tink}></audio>
					</div>
				</div>
			</>
		);
	}
}
