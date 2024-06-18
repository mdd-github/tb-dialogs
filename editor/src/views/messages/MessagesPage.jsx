import React from 'react';
import {NavLayout} from "../shared/NavLayout";
import {MessagesList} from "./components/MessagesList";

export const MessagesPage = () => {
    const onCreateMessage = () => {};

    const onEditMessage = () => {};

    return (
        <main className="page">
            <NavLayout title="Сообщения диалога">
                <div className="messages-page">
                    <MessagesList />
                </div>
            </NavLayout>
        </main>
    )
}