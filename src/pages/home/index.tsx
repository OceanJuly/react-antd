import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Button, Input, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './chatRoom.css';
import ButtonIcon from "../../assets/icons/rebot.svg";

interface User {
	id: string;
	name: string;
}

interface Message {
	id: number;
	sender: string;
	text: string;
}

const ChatRoom: React.FC = () => {
	const [showChat, setShowChat] = useState(false);
	const [users, setUsers] = useState<User[]>([{ id: '111', name: '小红' }, { id: '222', name: '小名' }, { id: '333', name: '小羊' }]);
	const [selectedUser, setSelectedUser] = useState<User | null>(null);
	const [inputMessage, setInputMessage] = useState('');
	const [messages, setMessages] = useState<Message[]>([]);
	const [socket, setSocket] = useState<Socket | null>(null);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Connect to the server
		const socket = io('http://localhost:4000');
		setSocket(socket);

		// Listen for incoming messages
		socket.on('message', (message: Message) => {
			setMessages((prevMessages) => [...prevMessages, message]);
		});

		// Listen for incoming users
		socket.on('users', (users: User[]) => {
			setUsers(users);
		});

		// Scroll to the bottom of the message list
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
		socket.close()
		return () => {
			// Disconnect from the server
			if (socket) {
				socket.disconnect();
			}
		};
	}, []);

	const handleUserSelect = (user: User) => {
		setSelectedUser(user);
		setMessages([]);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (socket && selectedUser) {
			const message: Message = {
				id: Date.now(),
				sender: 'Me',
				text: inputMessage,
			};
			socket.emit('private-message', {
				recipient: selectedUser,
				message: message,
			});
			setMessages((prevMessages) => [...prevMessages, message]);
			setInputMessage('');
		}

	};

	return (
		<>
			<button
				className="app-chatbot-button"
				onClick={() => setShowChat(!showChat)}>
				<img src={ButtonIcon} className="app-chatbot-button-icon" />
			</button>

<div className={`chat-window ${showChat ? 'visible' : ''}`}>
    <div className="chat-window-header">
      <h3>Chat Room</h3>
    </div>
    <div className="chat-window-body">
      <div className="chat-window-sidebar">
        <h5>Users</h5>
        <List
          dataSource={users}
          renderItem={(user) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  onClick={() => handleUserSelect(user)}
                >
                  Chat
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<UserOutlined />}
                title={user.name}
              />
            </List.Item>
          )}
        />
      </div>
      <div className="chat-window-main">
        {selectedUser ? (
          <>
            <h5>Chatting with {selectedUser.name}</h5>
            <div className="chat-messages">
              {messages.map((message) => (
                <div className="chat-window-message" key={message.id}>
                  <div className="chat-window-message-avatar"></div>
                  <div className="chat-window-message-content">
                    <div className="chat-window-message-sender">
                      {message.sender}
                    </div>
                    <div className="chat-window-message-text">
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form className="chat-window-input" onSubmit={handleSubmit}>
              <Input
                className="chat-window-input-box"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(event) => setInputMessage(event.target.value)}
                onPressEnter={() => handleSubmit}
              />
              <Button
                className="chat-window-input-button"
                type="primary"
                onClick={() => handleSubmit}
              >
                Send
              </Button>
            </form>
          </>
        ) : (
          <p>Please select a user to start chatting</p>
        )}
      </div>
    </div>
  </div>
</>
); };

export default ChatRoom;