import React from 'react';
import {BaseModal} from "../../shared/BaseModal";
import {useDispatch} from "react-redux";
import {actions} from "../../../store";
import {useForm} from "../../../hooks/useForm";

export const AddMemberModal = ({isOpen, onClose}) => {
    const dispatch = useDispatch();

    const {values, resetValues, onChangeById, valid} = useForm({
        firstName: '',
        lastName: '',
        description: ''
    }, {
        firstName: 'required',
        lastName: 'required'
    });

    const onResetAndClose = () => {
        resetValues();
        onClose?.();
    }

    const onAddMember = () => {
        dispatch(actions.members.add(values));
        onResetAndClose();
    };

    return (
        <BaseModal title="Добавить нового участника" onClose={onResetAndClose} isOpen={isOpen}>
            <div className="modal_content f-col f-align-stretch f-justify-start">
                <div className="field">
                    <label htmlFor="firstName">Имя:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={values.firstName}
                        onChange={onChangeById}
                    />
                </div>
                <div className="field">
                    <label htmlFor="firstName">Фамилия:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={values.lastName}
                        onChange={onChangeById}
                    />
                </div>
                <div className="field">
                    <label htmlFor="firstName">Информация об участнике:</label>
                    <textarea
                        id="description"
                        value={values.description}
                        rows="3"
                        onChange={onChangeById}
                    />
                </div>

                <button
                    type="button"
                    className="button mt-8"
                    onClick={onAddMember}
                    disabled={!valid}
                >
                    Добавить участника
                </button>
            </div>
        </BaseModal>
    )
}