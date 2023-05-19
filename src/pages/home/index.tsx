import React, { useState } from "react";
import "./index.css";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import { ConditionallyRender } from "react-util-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import config from "./config";
import ButtonIcon from "../../assets/icons/rebot.svg";
// import Gist from "react-gist/types";
interface HomeProps {
	// 定义其他props
	className?: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const Home: React.FC<HomeProps> = (_props: any) => {
	const [showChatbot, toggleChatbot] = useState(true);
	return (
		<>
			<div className="app-chatbot-container">
				<ConditionallyRender
					ifTrue={showChatbot}
					show={<Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />}
				/>
			</div>

			<button className="app-chatbot-button" onClick={() => toggleChatbot(prev => !prev)}>
				<img src={ButtonIcon} className="app-chatbot-button-icon" />
			</button>
		</>
	);
};
export default Home;
