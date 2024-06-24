import React, {useMemo} from "react";
import data from '../assets/data/data.json';

export const ChatMessage = ({message}) => {
    const member = useMemo(() => {
        return data.members.find((x) => x.id === message.authorId);
    }, [message.authorId]);
    const avatar = useMemo(() => {
        return data.avatars.find((x) => x.id === member?.avatarId);
    }, [member?.avatarId]);

    const classes = useMemo(() => {
        if(message.isUserMessage) {
            return 'chat-message chat-message--user card';
        } else {
            return 'chat-message chat-message--member card';
        }
    }, [message.isUserMessage])

    return (
        <div className={classes}>
            { message.isUserMessage !== true && (
                <div className="chat-message_avatar">
                    <img src={avatar.content}/>
                </div>
            )}

            <div className="chat-message_text">
                {
                    member ? (
                        <h5>{member?.firstName} {member?.lastName}</h5>
                    ) : ( <h5>Вы</h5> )
                }
                <span>
                    {message?.content}
                </span>
            </div>
        </div>
    );
}