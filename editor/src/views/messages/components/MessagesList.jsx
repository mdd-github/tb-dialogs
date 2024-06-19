import React from 'react';
import {useSelector} from "react-redux";
import {MessageItem} from "./MessageItem";

export const MessagesList = ({onCreateMessage, onEditMessage}) => {
    const messages = useSelector((state) => state.messages.list);

    return (
        <div className="messages-list f-col f-justify-start f-align-stretch">
            {
                messages.length !== 0 && (
                    <>
                        <div className="messages-list_list">
                            {messages.map((message) => (
                                <MessageItem key={message.id} message={message} />
                            ))}
                        </div>
                        <div className="members-list_actions">
                            <button className="button" onClick={() => {}}>
                                Добавить участника
                            </button>
                        </div>
                    </>
                )
            }
        </div>
    )
}