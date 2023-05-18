import React from "react";
import Options from "../Options/Options";

const GeneralOptions = (props: any) => {
	const options = [
		{
			name: "AW",
			// eslint-disable-next-line react/prop-types
			handler: props.actionProvider.handleMessageParserDocs,
			id: 1
		},
		{
			name: "template",
			// eslint-disable-next-line react/prop-types
			handler: props.actionProvider.handleConfigDocs,
			id: 2
		},
		{
			name: "publish",
			// eslint-disable-next-line react/prop-types
			handler: props.actionProvider.handleActionProviderDocs,
			id: 3
		},
		{
			name: "widgets",
			// eslint-disable-next-line react/prop-types
			handler: props.actionProvider.handleWidgetDocs,
			id: 5
		}
	];

	return <Options options={options} />;
};

export default GeneralOptions;
