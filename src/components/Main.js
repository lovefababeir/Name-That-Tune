import React from "react";
import Song from "./Song.js";
import axios from "axios";

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
			this.setState.points = this.state.points + 1;
			console.log("points:", this.state.points);
		} else {
			console.log("sorry not working");
		}
	};

	songPlaying = id => {
		axios
			.get(`https://deezerdevs-deezer.p.rapidapi.com/track/${id}`, {
				headers: {
					"content-type": "application/octet-stream",
					"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
					"x-rapidapi-key":
						"ce143ba573msh6e12bd67b4aab48p123d44jsndda60e32671d",
					useQueryString: true,
				},
			})
			.then(result => {
				console.log("got it!:", result.data);
			})
			.catch(err => {
				console.log("Could not complete GET request", err);
			});
	};

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

	componentDidMount() {
		this.songPlaying(this.state.selectedSong.id);
	}

	// componentDidUpdate(prevProps) {}
}

export default Main;
