import React from 'react';
import {BaseModal} from "../../shared/BaseModal";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "../../../hooks/useForm";
import {actions} from "../../../store";
import CloseOutlined from "@mui/icons-material/CloseOutlined";

export const AddMessageModal = ({isOpen, onClose}) => {
    const members = useSelector((state) => state.members.list);
    const dispatch = useDispatch();

    const {values, resetValues, onChangeById, valid, updateValue} = useForm({
        authorId: 0,
        content: '',
        userActionType: 'NONE',
        userActionButtons: []
    }, {
        content: 'required',
        userActionButtons: 'userActionButtons'
    });

    const onResetAndClose = () => {
        resetValues();
        onClose?.();
    }

    const onAddMessage = () => {
        let userAction = null;

        if(values.userActionType === 'TEXT') {
            userAction = {
                type: 'TEXT'
            };
        } else if (values.userActionType === 'BUTTONS') {
            userAction = {
                type: 'BUTTONS',
                buttons: values.userActionButtons.filter((item) => item.content.length > 0)
            }
        }

        dispatch(actions.messages.add({
            authorId: +values.authorId,
            content: values.content,
            userAction
        }));
        onResetAndClose();
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
        <BaseModal title="Добавить новое сообщение" onClose={onResetAndClose} isOpen={isOpen}>
            <div className="modal_content f-col f-align-stretch f-justify-start">
                <div className="field">
                    <label htmlFor="authorId">Автор сообщения:</label>
                    <div className="select-wrapper">
                        <select id="authorId" name="authorId" value={values.authorId} onChange={onChangeById}>
                            {
                                members.map((member) => (
                                    <option key={member.id} value={member.id} selected={+values.authorId === member.id}>
                                        { `${member.firstName} ${member.lastName}` }
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
                        <select id="userActionType" name="userActionType" onChange={onChangeById}  value={values.userActionType}>
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
                    onClick={onAddMessage}
                    disabled={!valid}
                >
                    Добавить сообщение
                </button>
            </div>
        </BaseModal>
    )
}