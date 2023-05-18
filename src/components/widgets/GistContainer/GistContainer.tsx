import React from "react";
import { FadeIn } from "react-anim-kit";
import Gist from "react-gist";

import styles from "./GistContainer.modules.css";
const GistContainer = (gistId: any) => {
	return (
		<div className={styles.gistContainer}>
			<FadeIn up by={250} delayBy={0.3}>
				<Gist id={gistId} />
			</FadeIn>
		</div>
	);
};

export default GistContainer;
