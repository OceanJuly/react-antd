
import React, { useEffect } from "react";
import { ConditionallyRender } from "react-util-kit";

import styles from "./WidgetDocs.module.css";
import InformationBox from "../../InformationBox/InformationBox";

type Props = {
	infoBox: any;
	setState: (state: any) => void;
};
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
          <InformationBox setState={setState}>
						<p className={styles.infoBoxParagraph}>
							To use your own components in the chatbot, first you need to define it in the "widget" section of the config file:
						</p>
						<p className={styles.infoBoxParagraph}>
							You will then be able to use the widget when you send a response with createChatBotMessage:
						</p>
					</InformationBox>
				}
			/>
		</div>
	);
};

export default WidgetDocs;
