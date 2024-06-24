import React, {useEffect, useMemo, useState} from "react";
import {Layout} from "./components/Layout";
import {ChatViewUserInput} from "./components/ChatViewUserInput";
import data from "./assets/data/data.json";
import {ChatMessage} from "./components/ChatMessage";


export const ChatView = () => {
    const [isTyping, setIsTyping] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messagesData, setMessagesData] = useState([...data.messages]);

    const popMessageFromData = () => {
        setCurrentMessage(messagesData[0]);
        setIsTyping(true);
    }

    const pushMessageIntoList = () => {
        if(currentMessage != null) {
            setTimeout(() => {
                setIsTyping(false);
                setMessagesData(messagesData.filter((x) => x.id !== currentMessage.id));
                setMessages([
                    ...messages,
                    currentMessage
                ]);

                setCurrentMessage(null);
            }, 1500);
        }
    }

    const pushUserMessage = (text) => {
        setMessages([
            ...messages,
            {
                id: 10000 + messages.length,
                content: text,
                userAction: null,
                isUserMessage: true
            }
        ]);

        popMessageFromData();
    }

    useEffect(() => {
        popMessageFromData();
    }, []);

    useEffect(() => {
        pushMessageIntoList();
    }, [currentMessage]);

    useEffect(() => {
        if(messages.length && messages.at(-1).userAction == null) {
            popMessageFromData();
        }
    }, [messages]);

    const userAction = useMemo(() => {
        if(messages.length === 0) {
            return;
        }

        return messages.at(-1).userAction;
    }, [messages, currentMessage]);

    return (
        <main className="page">
            <Layout title="Чат">
                <div className="chat-view">
                    <div className="chat-view_messages">
                        {
                            messages.map((msg) => (
                                <ChatMessage key={msg.id} message={msg} />
                            ))
                        }
                    </div>


                    <ChatViewUserInput action={userAction} disabled={isTyping} onSend={pushUserMessage} />
                </div>
            </Layout>
        </main>
    )
}
