import React, {useState} from 'react';
import {NavLayout} from "../shared/NavLayout";
import {MessagesList} from "./components/MessagesList";
import {MessageEditCard} from "./components/MessageEditCard";

export const MessagesPage = () => {
    const [selectedMessageId, setSelectedMessageId] = useState(-1);

    return (
        <main className="page">
            <NavLayout title="Сообщения диалога">
                <div className="messages-page">
                    <MessagesList onSelectMessage={(id) => setSelectedMessageId(id)} />

                    {selectedMessageId >= 0 && <MessageEditCard messageId={selectedMessageId} />}
                </div>
            </NavLayout>
        </main>
    )
}