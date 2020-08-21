import React from "react";
import ReactPlayer from "react-player";
import "./Song.scss";

const Song = props => {
	console.log("got song");
	return (
		<div>
			<ReactPlayer url={props.url} controls={true} className="player" />
		</div>
	);
};

export default Song;
