import React, {useState} from "react";

export const ChatViewUserInput = ({action, onSend, disabled}) => {
    const [userText, setUserText] = useState('');
    const onSubmit = (text) => {
        onSend?.(text);
        setUserText('');
    }

    return (
        <div className="user-input">
            {(action?.type === 'TEXT' || disabled) && (
                <>
                    <div className="user-input_textarea">
                        <textarea
                            rows="2"
                            value={userText}
                            onChange={(e) => setUserText(e.target.value)}
                            disabled={disabled}
                            placeholder="Введите текст сообщения"
                        />
                    </div>
                    <button className="button-lg" disabled={disabled} onClick={() => onSubmit(userText)}>
                        Отправить
                    </button>
                </>
            )}

            {
                action?.type === 'BUTTONS' && (
                    <div className="user-input_buttons">
                        {
                            action.buttons.map((btn) => (
                                <button key={btn.id} onClick={() => onSubmit(btn.content)} className="button-secondary-lg">
                                    {btn.content}
                                </button>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}