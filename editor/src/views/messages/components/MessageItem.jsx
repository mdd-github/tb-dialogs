import C from "classnames";
import {useSelector} from "react-redux";
import {useMemo} from "react";

export const MessageItem = ({message}) => {
    const members = useSelector((state) => state.members.list);
    const avatars = useSelector((state) => state.members.avatars);

    const member = useMemo(() => members.find((member) => member.id === message.authorId), [members, message.authorId]);
    const avatar = useMemo(() => avatars.find((avatar) => avatar.id === member?.avatarId), [avatars, member?.avatarId]);

    if(!member || !avatar) {
        return null;
    }

    return (
        <div
            className={C({
                'messages-list_item': 1,
                'messages-list_item--with-action': message.userAction
            })}
        >
            <div className="card messages-list_item-content">
                <div className="messages-list_item-content_avatar">
                    <img src={avatar.content}/>
                </div>

                <div className="messages-list_item-content_text">
                    <h5>{member.firstName} {member.lastName}</h5>
                    <span>
                        { message.content }
                    </span>
                </div>
            </div>

            {
                message.userAction?.type === 'TEXT' && (
                    <div
                        className="card messages-list_item-action  messages-list_item-content--text"
                    >
                        Пользователь вводит текст
                    </div>
                )
            }
            {
                message.userAction?.type === 'BUTTONS' && (
                    <div
                        className="card messages-list_item-action"
                    >
                        <h6>Пользователь выбирает один из вариантов:</h6>
                        <div className="messages-list_item-action--buttons">
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