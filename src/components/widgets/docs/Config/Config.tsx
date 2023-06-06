import React, { useEffect } from "react";
import { ConditionallyRender } from "react-util-kit";

import styles from "./Config.module.css";

type Props = {
	gist: any;
	setState: (state: any) => void;
};
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
			<ConditionallyRender ifTrue={showActionProviderGist} />
		</div>
	);
};

export default Config;
