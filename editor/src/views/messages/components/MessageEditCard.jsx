import React, {useEffect} from "react";
import {useForm} from "../../../hooks/useForm";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import {actions} from "../../../store";
import {useDispatch, useSelector} from "react-redux";
import {useMesage} from "../../../hooks/useMessage";
import {useMember} from "../../../hooks/useMember";

export const MessageEditCard = ({messageId}) => {
    const dispatch = useDispatch();
    const members = useSelector((state) => state.members.list);

    const {values, setValues, onChangeById, valid, updateValue} = useForm({
        authorId: 0,
        content: '',
        userActionType: 'NONE',
        userActionButtons: []
    }, {
        content: 'required',
        userActionButtons: 'userActionButtons'
    });

    const message = useMesage(messageId);
    const member = useMember(message.authorId);

    useEffect(() => {
        setValues({
            id: messageId,
            authorId: message.authorId,
            content: message.content,
            userActionType: message.userAction?.type || 'NONE',
            userActionButtons: message.userAction?.buttons || []
        });
    }, [message]);

    const onSaveMessage = () => {
        let userAction = null;

        if (values.userActionType === 'TEXT') {
            userAction = {
                type: 'TEXT'
            };
        } else if (values.userActionType === 'BUTTONS') {
            userAction = {
                type: 'BUTTONS',
                buttons: values.userActionButtons.filter((item) => item.content.length > 0)
            }
        }

        dispatch(actions.messages.update({
            id: messageId,
            authorId: +values.authorId,
            content: values.content,
            userAction
        }));
    };

    const onChangeActionButtonText = (id, value) => {
        updateValue('userActionButtons', values.userActionButtons.map((option) => {
            if (option.id === id) {
                return {
                    id,
                    content: value
                }
            }
            return option;
        }));
    }

    const onAddActionButton = () => {
        const newActions = values.userActionButtons.map((item, i) => ({
            ...item,
            id: i
        }));

        newActions.push({
            id: newActions.length,
            content: ''
        });

        updateValue('userActionButtons', newActions);
    }

    const onRemoveActionButton = (id) => {
        const newActions = values.userActionButtons
            .filter((item) => item.id !== id)
            .map((item, i) => ({
                ...item,
                id: i
            }));

        updateValue('userActionButtons', newActions);
    }

    return (
        <div className="message-edit-card f-align-stretch">
            <h2 className="message-edit-card_title">Сообщение от {member.firstName} {member.lastName}</h2>

            <div className="f-col f-align-stretch f-justify-start">
                <div className="field">
                    <label htmlFor="authorId">Автор сообщения:</label>
                    <div className="select-wrapper">
                        <select id="authorId" name="authorId" value={values.authorId} onChange={onChangeById}>
                            {
                                members.map((member) => (
                                    <option key={member.id} value={member.id} selected={+values.authorId === member.id}>
                                        {`${member.firstName} ${member.lastName}`}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="content">Текст сообщения:</label>
                    <input
                        type="text"
                        id="content"
                        value={values.content}
                        onChange={onChangeById}
                    />
                </div>
                <div className="field">
                    <label htmlFor="userActionType">Ответ пользователя:</label>
                    <div className="select-wrapper">
                        <select id="userActionType" name="userActionType" onChange={onChangeById}
                                value={values.userActionType}>
                            <option value="NONE" selected={values.userActionType === 'NONE'}>Не требуется</option>
                            <option value="BUTTONS" selected={values.userActionType === 'BUTTONS'}>Варианты ответа
                            </option>
                            <option value="TEXT" selected={values.userActionType === 'TEXT'}>Ввод текста</option>
                        </select>
                    </div>
                </div>

                {
                    values.userActionType === 'BUTTONS' && (<div className="field">
                        <label>Варианты выбора:</label>

                        {
                            values.userActionButtons.map((option) => (
                                <div key={option.id} className="f-row f-align-center f-justify-between f-gap-sm">
                                    <input
                                        style={{flex: 1}}
                                        type="text"
                                        value={option.content}
                                        onChange={(e) => onChangeActionButtonText(option.id, e.target.value)}
                                    />

                                    <button
                                        type="button"
                                        className="button-sm"
                                        onClick={() => onRemoveActionButton(option.id)}
                                    >
                                        <CloseOutlined/>
                                    </button>
                                </div>
                            ))
                        }

                        <button
                            type="button"
                            className="button-secondary mt-4"
                            onClick={onAddActionButton}
                        >
                            Добавить вариант ответа
                        </button>
                    </div>)
                }

                <button
                    type="button"
                    className="button mt-8"
                    onClick={onSaveMessage}
                    disabled={!valid}
                >
                    Сохранить сообщение
                </button>
            </div>
        </div>
    );
}