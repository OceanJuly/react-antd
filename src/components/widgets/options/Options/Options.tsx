import React from "react";

import styles from "./Options.module.css";

const Options = (options: any) => {
	// console.log(options.options);
	const markup = options.options.map(
		(option: {
			id: React.Key | null | undefined;
			handler: React.MouseEventHandler<HTMLButtonElement> | undefined;
			name:
				| string
				| number
				| boolean
				| React.ReactElement<any, string | React.JSXElementConstructor<any>>
				| React.ReactFragment
				| React.ReactPortal
				| null
				| undefined;
		}) => (
			<button key={option.id} className={styles.option} onClick={option.handler}>
				{option.name}
			</button>
		)
	);

	return <div className={styles.options}>{markup}</div>;
};

export default Options;
