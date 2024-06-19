import C from "classnames";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import {useMember} from "../../../hooks/useMember";
import {useAvatar} from "../../../hooks/useAvatar";

export const MessageItem = ({message}) => {
    const member = useMember(message.authorId);
    const avatar = useAvatar(member?.avatarId);

    if(!member || !avatar) {
        return null;
    }

    return (
        <div
            className={C({
                'messages-list-item': 1,
                'messages-list-item--with-action': message.userAction
            })}
        >
            <div className="card messages-list-item-content">
                <div className="messages-list-item-content_avatar">
                    <img src={avatar.content}/>
                </div>

                <div className="messages-list-item-content_text">
                    <h5>{member.firstName} {member.lastName}</h5>
                    <span>
                        { message.content }
                    </span>
                </div>
            </div>

            {
                message.userAction?.type === 'TEXT' && (
                    <div
                        className="card messages-list-item-action  messages-list-item-content--text"
                    >
                        Пользователь вводит текст
                    </div>
                )
            }
            {
                message.userAction?.type === 'BUTTONS' && (
                    <div
                        className="card messages-list-item-action"
                    >
                        <h6>Пользователь выбирает один из вариантов:</h6>
                        <div className="messages-list-item-action--buttons">
                            {message.userAction.buttons.map((button) => (
                                <button type="button" key={button.id} className="button-sm">
                                    {button.content}
                                </button>
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    );
}