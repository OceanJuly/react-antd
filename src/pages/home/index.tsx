import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Badge, Button, Input, List } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './chatRoom.css';
import ButtonIcon from "../../assets/icons/rebot.svg";
import Chatbot from 'react-chatbot-kit';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

interface User {
  id: string;
  name: string;
  unreadMessages:number
}

interface Message {
  id: number;
  sender: string;
  text: string;
}

const ChatRoom: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false)
  const [users, setUsers] = useState<User[]>([
    { id: '111', name: '小红', unreadMessages: 1 },
  { id: '222', name: '小名', unreadMessages: 0 },
  { id: '333', name: '小羊', unreadMessages: 3 },
  { id: '444', name: "chatbot", unreadMessages: 0 }
  ]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // 在组件中添加一个状态来记录未读信息数量
const [unreadMessages] = useState(1);

  useEffect(() => {
    // Connect to the server
    const socket = io('http://localhost:4000');
    setSocket(socket);

    // Listen for incoming messages
    socket.on('message', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      if (selectedUser && message.sender !== 'Me' && message.sender === selectedUser.name) {
        const updatedUsers = users.map((user) => {
          if (user.name === selectedUser.name) {
            return { ...user, unreadMessages: user.unreadMessages + 1 };
          } else {
            return user;
          }
        });
        setUsers(updatedUsers);
      } else {
        const updatedUsers = users.map((user) => {
          if (user.name === message.sender) {
            return { ...user, unreadMessages: user.unreadMessages + 1 };
          } else {
            return user;
          }
        });
        setUsers(updatedUsers);
      }
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
    if (user.name == 'chatbot') {
      // setTimeout(() => {
      //   const chatbotContainer = document.getElementsByClassName('chat-window-main')[0];      
      //   createRoot(chatbotContainer).render(
      //     <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />,
      //   );
      // } ,2000)
      setShowChatBot(true);
    }
    setSelectedUser(user);
    setMessages([]);
    const updatedUsers = users.map(u => {
      console.log(u,user);
      
      if (u.name === user.name) {
        return { ...u, unreadMessages: 0 };
      } else {
        return u;
      }
    });
    setUsers(updatedUsers);
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
          <Badge count={unreadMessages}>
        <img src={ButtonIcon} className="app-chatbot-button-icon" />
        </Badge>
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
                    <Badge count={user.unreadMessages}>
                    <Button
                      type="link"
                      onClick={() => handleUserSelect(user)}
                    >
                      Chat
                    </Button>
                    </Badge>,
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
        {
          showChatBot && (
            <div>
              <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />,
            </div>
          )
        }
      </div>
    </>
  );
};

export default ChatRoom;