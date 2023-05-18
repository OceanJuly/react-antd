/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from "react";
import { ConditionallyRender } from "react-util-kit";
import Gist from "react-gist";

import styles from "./WidgetDocs.module.css";
import InformationBox from "../../InformationBox/InformationBox";

type Props = {
	infoBox: any;
	setState: (state: any) => void;
};

// eslint-disable-next-line react/prop-types
const WidgetDocs = ({ infoBox, setState }: Props) => {
	useEffect(() => {
		setState((state: any) => ({
			...state,
			infoBox: "widget"
		}));
	}, [setState]);

	const showWidgetInfoBox = infoBox === "widget";

	return (
		<div>
			<ConditionallyRender
				ifTrue={showWidgetInfoBox}
				show={
					// eslint-disable-next-line prettier/prettier
          <InformationBox setState={setState}>
						<p className={styles.infoBoxParagraph}>
							To use your own components in the chatbot, first you need to define it in the "widget" section of the config file:
						</p>
						<Gist id="d1ca7820bfa6a0f8b66a8a5d86a09d8e" />
						<p className={styles.infoBoxParagraph}>
							You will then be able to use the widget when you send a response with createChatBotMessage:
						</p>
						<Gist id="6f0c3aeed1ef5b87b4d5652d69e3419d" />
					</InformationBox>
				}
			/>
		</div>
	);
};

export default WidgetDocs;
