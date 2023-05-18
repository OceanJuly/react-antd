/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { Component } from "react";
import "./LearningOptions.css";
// import { ReactI18NextChild } from "react-i18next";

export default class LearningOptions extends Component {
	options: { text: string; handler: () => void; id: number }[];
	// eslint-disable-next-line @typescript-eslint/ban-types
	constructor(props: {} | Readonly<{}>) {
		super(props);
		this.options = [
			{ text: "Javascript", handler: () => {}, id: 1 },
			{ text: "Data visualization", handler: () => {}, id: 2 },
			{ text: "APIs", handler: () => {}, id: 3 },
			{ text: "Security", handler: () => {}, id: 4 },
			{ text: "Interview prep", handler: () => {}, id: 5 }
		];
	}

	render(): JSX.Element {
		const optionsMarkup = this.options.map(
			(option: {
				id: React.Key | null | undefined;
				handler: React.MouseEventHandler<HTMLButtonElement> | undefined;
				text:
					| string
					| number
					| boolean
					| React.ReactElement<any, string | React.JSXElementConstructor<any>>
					| React.ReactFragment
					| React.ReactPortal
					// | Iterable<ReactI18NextChild>
					| null
					| undefined;
			}) => (
				<button className="learning-option-button" key={option.id} onClick={option.handler}>
					{option.text}
				</button>
			)
		);
		return <div className="learning-options-container">{optionsMarkup}</div>;
	}
}
