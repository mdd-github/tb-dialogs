import React from "react";

export const NoMembersMessage = ({onCreate}) => (
    <div className="members-list_no-members">
        <h4>Список участников диалога пока пуст</h4>
        <button className="button" onClick={() => onCreate?.()}>
            Создать
        </button>
    </div>
)