import React from "react";
import Song from "./Song.js";
import axios from "axios";
import "../components/SongList";
import { songList } from "../components/SongList.js";
import "./Main.scss";

class Main extends React.Component {
	inputRef = React.createRef();

	state = {
		songList: songList,
		selectedSong: {
			song: "I Believe I Can Fly",
			movie: "Space Jam",
			id: 2296192,
		},
		points: 0,
		total: 0,
		message: null,
	};

	checkAnswer = evt => {
		evt.preventDefault();

		const answer = evt.target.answer.value;
		if (answer.toLowerCase() === this.state.selectedSong.movie.toLowerCase()) {
			this.setState({
				points: this.state.points + 1,
				total: this.state.total + 1,
				message: "Great job! You got it!",
			});
		} else {
			this.setState({
				total: this.state.total + 1,
				message: "Sorry, your guess was incorrect. please try again!",
			});
		}
		this.inputRef.current.value = "";
	};

	songPlaying = (id, index) => {
		const song = this.state.songList[index];

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
				// console.log("got it!:", result.data.preview);
				this.setState({
					selectedSong: {
						song: song.song,
						movie: song.movie,
						id: id,
						url: result.data.preview,
					},
				});
				console.log(this.state.selectedSong);
			})
			.catch(err => {
				console.log("Could not complete GET request", err);
			});

		let list = this.state.songList;
		list.splice(index, 1);
		this.setState({ songList: list });
		console.log("songList:", this.state.songList);
	};

	nextSong = () => {
		const selectedIndex = Math.floor(
			Math.random() * this.state.songList.length
		);
		const selectedId = this.state.songList[selectedIndex].id;

		this.songPlaying(selectedId, selectedIndex);
		this.setState({ message: "" });
	};

	render() {
		return (
			<div className="outerBox">
				<h1>Name that Tüne</h1>
				<h5>We've created a game of theme songs from popular TV shows and Movies throughout the years. Have you been paying attention to your favourite shows and movies? How well do you think you know your favourite shows and movies?</h5>
				<form classname="form" onSubmit={this.checkAnswer}>
					{this.state.selectedSong.url && (
						<Song url={this.state.selectedSong.url} />
					)}
					<input
						className="input"
						type="text"
						name="answer"
						placeholder="Insert Movie Title Here"
						ref={this.inputRef}
						autoComplete="off"
					></input>
					<input className="submitbtn" type="submit" name="enterBtn">
						{this.state.button}
					</input>
					<h4>{this.state.message}</h4>
					<h3 className="score">
						Your Score: {this.state.points}/{this.state.total}
					</h3>
				</form>
				<button className="next-song"
					onClick={() => {
						this.nextSong();
					}}
				>
					Next Song
				</button>
			</div>
		);
	}

	componentDidMount() {
		this.nextSong();
	}

	// componentDidUpdate(prevProps) {}
}

export default Main;
