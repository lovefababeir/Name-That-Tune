import React from "react";
import ReactPlayer from "react-player";
import "./Song.scss";

const Song = props => {
	console.log("got song");
	return (
		<div classname="playerbox">
			<ReactPlayer className="player" url={props.url} controls={true} />
		</div>
	);
};

export default Song;
