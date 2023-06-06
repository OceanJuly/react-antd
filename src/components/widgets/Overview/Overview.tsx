import React from "react";
import { FadeIn } from "react-anim-kit";

import IconOverviewSVG from "../../../assets/icons/bot-overview.svg";

import styles from "./Overview.module.css";
import GeneralOptions from "../options/GeneralOptions/GeneralOptions";

interface OverviewProps {
	// 定义其他props
	className?: string;
}

const Overview: React.FC<OverviewProps> = (props: any) => {
	return (
		<div className={styles.overview}>
			<FadeIn left by={250}>
				<img src={IconOverviewSVG} className={styles.overviewSVG} />
			</FadeIn>

			<GeneralOptions actionProvider={props.actionProvider} />
		</div>
	);
};

export default Overview;
