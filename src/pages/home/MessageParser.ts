
class MessageParser {
	actionProvider: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(actionProvider: any) {
		this.actionProvider = actionProvider;
	}

	parse = (message: string) => {
		const lowerCase = message.toLowerCase();

		if (
			lowerCase.includes("messageparser") ||
			lowerCase.includes("parse") ||
			lowerCase.includes("parser") ||
			lowerCase.includes("message parser")
		) {
			return this.actionProvider.handleMessageParserDocs();
		}

		if (lowerCase.includes("action") || lowerCase.includes("actionprovider")) {
			return this.actionProvider.handleActionProviderDocs();
		}

		if (lowerCase.includes("config")) {
			return this.actionProvider.handleConfigDocs();
		}

		if (lowerCase.includes("widget")) {
			return this.actionProvider.handleWidgetDocs();
		}

		return this.actionProvider.handleDefault(message,'myRoom');
	};
}

export default MessageParser;
