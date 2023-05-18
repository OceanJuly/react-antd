import React, { useEffect } from "react";
import { ConditionallyRender } from "react-util-kit";

import GistContainer from "../../GistContainer/GistContainer";

import styles from "./Config.module.css";

type Props = {
	gist: any;
	setState: (state: any) => void;
};
// eslint-disable-next-line react/prop-types
const Config = ({ gist, setState }: Props) => {
	useEffect(() => {
		setState((state: any) => ({ ...state, gist: "config" }));
	}, [setState]);

	const showActionProviderGist = gist === "config";

	return (
		<div>
			<a
				href="https://gist.github.com/FredrikOseberg/87795296efb67fe76fa05fc839d22e25"
				target="_blank"
				rel="noopener noreferrer"
				className={styles.configLink}
			>
				View example
			</a>
			<ConditionallyRender ifTrue={showActionProviderGist} show={<GistContainer gistId="af04e2e30407671412af08fa3c429409" />} />
		</div>
	);
};

export default Config;
