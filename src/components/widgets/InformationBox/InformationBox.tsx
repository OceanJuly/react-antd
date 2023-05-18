import React, { ReactNode } from "react";

import styles from "./InformationBox.module.css";

import LightBulb from "../../../assets/icons/lightbulb-on.svg";
import Cross from "../../../assets/icons/times-circle.svg";

type Props = {
	children: ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setState: (state: any) => void;
};
const InformationBox: React.FC<Props> = ({ children, setState }) => {
	return (
		<div className={styles.informationBox}>
			<button className={styles.closeMessageBox} onClick={() => setState((state: any) => ({ ...state, infoBox: "" }))}>
				<img src={Cross} className={styles.closeMessageBoxIcon} />
			</button>
			<div className={styles.informationBoxLogo}>
				<img src={LightBulb} className={styles.informationBoxLogo} />
			</div>
			<div className={styles.informationBoxContent}>{children}</div>
		</div>
	);
};

export default InformationBox;
