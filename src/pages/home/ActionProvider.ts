import { request } from "../../api/request";
import io from 'socket.io-client';
class ActionProvider {
	createChatBotMessage: any;
	setState: any;
	constructor(createChatBotMessage: any, setStateFunc: any) {
		this.createChatBotMessage = createChatBotMessage;
		this.setState = setStateFunc;
	}

	handleMessageParserDocs = () => {
		const messages = this.createChatBotMessage(
			"The message parser controls how the bot reads input and decides which action to invoke.",
			{ widget: "messageParser", withAvatar: true }
		);

		this.addMessageToBotState(messages);
	};

	handleActionProviderDocs = () => {
		const messages = [
			this.createChatBotMessage("The action provider defines the bots response after the message is parsed.", {
				widget: "actionProviderDocs",
				withAvatar: true
			})
		];

		this.addMessageToBotState(messages);
	};

	handleConfigDocs = () => {
		const messages = this.createChatBotMessage("The config controls every configurable aspect of the chatbot.", {
			widget: "config",
			withAvatar: true
		});

		this.addMessageToBotState(messages);
	};

	handleWidgetDocs = () => {
		const messages = this.createChatBotMessage("Widgets are custom components that you want to render with a chatbot response.", {
			widget: "widget",
			withAvatar: true
		});

		this.addMessageToBotState(messages);
	};

	handleDefault = (msg:string,room:string) => {
		const socket = io('http://localhost:4000')
		socket.emit('message',msg,room)
		console.log(room);
		
		socket.on('connect',() => {
			console.log(socket.id);
		})
		socket.on('error', (error) => {
			console.error('Connection error:', error)
		})

		request
			.post("/api", 
				{
					model: "gpt-3.5-turbo",
					messages: [
						{
							role: "user",
							content: msg
						},

						{
							role: "system",
							content: "你是一个资深测试专家，帮助回答用户的问题，请按照JSON的格式输出，仅输出JSON，不需要其他内容"
						}
					],
					max_tokens: 1000,
					temperature: 1
				}
			)
			.then((res: any) => {
				const message = this.createChatBotMessage(res.choices[0].message.content, {
					withAvatar: true,
				});
				
				this.addMessageToBotState(message);
				socket.close()
			});
		
	};

	addMessageToBotState = (messages: any[], newState?: any) => {
		if (Array.isArray(messages)) {
			this.setState((state: { messages: any }) => ({
				...state,
				...newState,
				messages: [...state.messages, ...messages],
				gist: "",
				infoBox: ""
			}));
		} else {
			this.setState((state: { messages: any }) => ({
				...state,
				...newState,
				messages: [...state.messages, messages],
				gist: "",
				infoBox: ""
			}));
		}
	};
}

export default ActionProvider;
