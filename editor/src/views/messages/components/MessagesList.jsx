import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {MessageItem} from "./MessageItem";
import {AddMessageModal} from "./AddMessageModal";

export const MessagesList = ({onSelectMessage}) => {
    const messages = useSelector((state) => state.messages.list);

    const [isAddMessageModalOpenned, setIsAddMessageModalOpenned] = useState(false);

    return (
        <div className="messages-list f-col f-justify-start f-align-stretch">
            {
                messages.length !== 0 && (
                    <>
                        <div className="messages-list_list">
                            {messages.map((message) => (
                                <MessageItem key={message.id} message={message} onClick={() => onSelectMessage?.(message.id)} />
                            ))}
                        </div>
                        <div className="members-list_actions">
                            <button className="button" onClick={() => setIsAddMessageModalOpenned(true)}>
                                Добавить участника
                            </button>
                        </div>
                    </>
                )
            }

            <AddMessageModal
                isOpen={isAddMessageModalOpenned}
                onClose={() => setIsAddMessageModalOpenned(false)}
            />
        </div>
    )
}