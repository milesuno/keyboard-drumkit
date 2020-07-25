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

//FIX: Make all controls available without state - set play and delete to display none.
//TODO: While recording exists controls should be visible - once deleted it should return to just the record button
export class Keyboard extends Component {
	constructor(props) {
		super(props);
		//state is used to populate data in lg-thumbnail on thumbnail click
		this.state = {
			recordingStartTime: "",
			notes: [],
			isRecording: false,
			controlsActive: false,
		};
	}
	componentDidMount() {
		let controls = document.querySelectorAll(".control");
		// let stopBtn = document.querySelector(".stop-btn");
		let playBtn = document.querySelector(".playback-btn");
		let deleteBtn = document.querySelector(".delete-btn");

		// stopBtn.addEventListener("click", this.stopRecording);
		playBtn.addEventListener("click", this.playbackRecording);
		deleteBtn.addEventListener("click", this.deleteRecording);

		// console.log({ controls, stopBtn, playBtn, deleteBtn });
		let screenKeys = document.querySelectorAll(".key");
		let recordBtn = document.querySelector(".record-btn");
		window.addEventListener("keydown", this.handleKeyDown);
		window.addEventListener("keyup", this.handleKeyUp);
		recordBtn.addEventListener("click", this.startRecording);

		for (const key of screenKeys) {
			key.addEventListener("pointerdown", this.handleMouseDown);
			key.addEventListener("pointerup", this.handleMouseUp);
			key.addEventListener("pointerout", this.handleMouseUp);
			key.addEventListener("transitionend", (e) =>
				this.stopNote(e.target)
			);
		}
	}

	startRecording = () => {
		let recordingStartTime = Date.now();
		// let recordBtn = document.querySelector(".record-btn");

		this.setState({ recordingStartTime });
		this.setState({ isRecording: true });
		this.setState({ controlsActive: true });

		// recordBtn.removeEventListener("click", this.startRecording);
		// recordBtn.addEventListener("click", this.stopRecording);
	};

	record = (note, timing) => {
		// let noteStartTime = Date.now() - this.state.recordinStartTime;
		let notes = this.state.notes;
		notes.push({ note, timing });
		this.setState({ notes });
		console.log("NOTES:", this.state.notes);
	};

	stopRecording = () => {
		// let recordBtn = document.querySelector(".record-btn");

		this.setState({ recordingStartTime: "" });
		this.setState({ isRecording: false });
		// recordBtn.removeEventListener("click", this.stopRecording);
		// recordBtn.addEventListener("click", this.startRecording);
		// this.playbackRecording();
	};

	playbackRecording = () => {
		let notes = this.state.notes;
		console.log("State:", this.state.notes);
		console.log({ notes });

		notes.forEach((note) => {
			let key = document.getElementById(note.note);
			let audio = document.getElementById(note.note.charCodeAt(0) - 32);
			// console.log({ audio, key });
			setTimeout(() => this.playNote(audio, key), note.timing);
		});
	};

	deleteRecording = () => {
		let notes = this.state.notes;

		notes = [];

		this.setState({ notes });
		this.setState({ controlsActive: false });
	};

	playNote = (audio, key) => {
		if (key) key.classList.add("playing");
		audio.currentTime = 0;
		audio.play();
	};

	stopNote = (key) => {
		console.log({ key });
		if (key) key.classList.remove("playing");
	};

	handleKeyDown = (event) => {
		let key = document.getElementById(event.key);
		let audio = document.getElementById(event.keyCode);
		let noteStartTime = Date.now() - this.state.recordingStartTime;
		console.log({ event });
		if (!key && !audio) return;
		if (this.state.isRecording) this.record(event.key, noteStartTime);
		this.playNote(audio, key);
	};

	handleKeyUp = (event) => {
		let key = document.getElementById(event.key);

		if (!key) return;
		this.stopNote(key);
	};

	handleMouseUp = (event) => {
		let target = event.target.id;

		//if <kbd> or <span> within is clicked
		if (!event.target.id) target = event.target.parentNode.id;

		let key = document.getElementById(target);

		if (!key) return;

		this.stopNote(key);
	};

	handleMouseDown = (event) => {
		let noteStartTime = Date.now() - this.state.recordingStartTime;
		let target = event.target.id;
		let codeNumberOffset = 32;
		//if <kbd> or <span> within is clicked
		if (!event.target.id) target = event.target.parentNode.id;

		let key = document.getElementById(target);
		let audio = document.getElementById(
			target.charCodeAt(0) - codeNumberOffset
		); //ASCII conversion is 32 above char code

		if (!key && !audio) return;
		if (this.state.isRecording) this.record(target, noteStartTime);

		key.classList.add("playing");

		this.playNote(audio, key);
	};

	render() {
		return (
			<>
				<div className="controls">
					{/* {!this.state.isRecording ? ( */}
						<button
							className="record-btn control"
							// onClick={this.startRecording}
						>
							Record
						</button>
					{/* ) : ( */}
						<button
							className="stop-btn control"
							// onClick={this.stopRecording}
						>
							Stop Recording
						</button>
					{/* )} */}
					<button className="playback-btn control">Playback</button>
					<button className="delete-btn control">Delete</button>
				</div>
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
