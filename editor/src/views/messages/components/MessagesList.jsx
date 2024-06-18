import React from 'react';
import {useSelector} from "react-redux";
import {MessageItem} from "./MessageItem";

export const MessagesList = ({onCreateMessage, onEditMessage}) => {
    const messages = useSelector((state) => state.messages.list);

    return (
        <div className="messages-list">
            <div className="messages-list_list">
                {
                    messages.length !== 0
                        ? messages.map((message) => (
                            <MessageItem key={message.id} message={message} />
                        ))
                        : (<div>No messages </div>)
                }
            </div>
        </div>
    )
}