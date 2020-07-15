import React from "react";
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

export function Keyboard() {
	return (
		<>
			<div class="keys">
				<div id="a" class="key">
					<kbd>A</kbd>
					<span class="sound">clap</span>
				</div>
				<div id="s" class="key">
					<kbd>S</kbd>
					<span class="sound">hihat</span>
				</div>
				<div id="d" class="key">
					<kbd>D</kbd>
					<span class="sound">kick</span>
				</div>
				<div id="f" class="key">
					<kbd>F</kbd>
					<span class="sound">openhat</span>
				</div>
				<div id="g" class="key">
					<kbd>G</kbd>
					<span class="sound">boom</span>
				</div>
				<div id="h" class="key">
					<kbd>H</kbd>
					<span class="sound">ride</span>
				</div>
				<div id="j" class="key">
					<kbd>J</kbd>
					<span class="sound">snare</span>
				</div>
				<div id="k" class="key">
					<kbd>K</kbd>
					<span class="sound">tom</span>
				</div>
				<div id="l" class="key">
					<kbd>L</kbd>
					<span class="sound">tink</span>
				</div>
			</div>
			<audio id="65" src={clap}></audio>
			<audio id="83" src={hihat}></audio>
			<audio id="68" src={kick}></audio>
			<audio id="70" src={openhat}></audio>
			<audio id="71" src={boom}></audio>
			<audio id="72" src={ride}></audio>
			<audio id="74" src={snare}></audio>
			<audio id="75" src={tom}></audio>
			<audio id="76" src={tink}></audio>
		</>
	);
};

function playSound(event) {
	let key = document.getElementById(event.key);
	let audio = document.getElementById(event.keyCode);

	if (!key && !audio) return;
	console.log(event.key);
	key.classList.add("playing");

	audio.currentTime = 0;
	audio.play();
}

//Removes class from key
function removeTransform(event) {
	let key = document.getElementById(event.key);

	if (!key) return;

	key.classList.remove("playing");
}

window.addEventListener("keydown", playSound);
window.addEventListener("keyup", removeTransform);


//-------------------Screen KeyBoard--------------------//

let screenKey = document.querySelectorAll(".key");

//loop through all divs and on 'mousedown' play audio with ID that matches ASCII code of div ID.
screenKey.forEach((key) =>
	key.addEventListener("mousedown", (event) => {
		let target = event.target.id; //Path to div id being clicked
		let key = document.getElementById(target);
		let audio = document.getElementById(target.charCodeAt(0) - 32); //ASCII conversion is 32 above char code

		if (!key && !audio) return;
		key.classList.add("playing");

		audio.currentTime = 0;
		audio.play();
	})
);

//loop through all divs remove transform on 'mouseup'.
screenKey.forEach((key) =>
	key.addEventListener("mouseup", (event) => {
		let target = event.target.id;
		let key = document.getElementById(target);

		if (!key) return;

		key.classList.remove("playing");
	})
);
