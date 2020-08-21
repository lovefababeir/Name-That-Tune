import React from "react";
import Song from "./Song.js";

class Main extends React.Component {
	state = {
		songList: [
			{ song: "I Believe I Can Fly", movie: "Space Jam", id: 2296192 },
			{
				song: "Till I See You Again",
				movie: "Fast and the Furious",
				id: 2296192,
			},
		],
		selectedSong: {
			song: "I Believe I Can Fly",
			movie: "Space Jam",
			id: 2296192,
		},
		points: 0,
	};

	checkAnswer = evt => {
		evt.preventDefault();
		const answer = evt.target.answer.value;
		// console.log(
		// 	answer.toLowerCase(),
		// 	this.state.selectedSong.movie.toLowerCase()
		// );
		if (answer.toLowerCase() === this.state.selectedSong.movie.toLowerCase()) {
			this.setState.points = this.state.points++;
			console.log("points:", this.state.points);
		} else {
			console.log("sorry not working");
		}
	};

	songPlaying = id => {};

	render() {
		return (
			<>
				<h1>This was the theme song for what movie?</h1>
				<form onSubmit={this.checkAnswer}>
					<Song />
					<input
						type="text"
						name="answer"
						placeholder="Insert Movie Title Here"
					></input>
					<input type="submit" name="enterBtn"></input>
				</form>
			</>
		);
	}

	// ComponentDidMount() {}

	// ComponentDidUpdate(prevProps) {}
}

export default Main;
