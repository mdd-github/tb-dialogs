import React, {useState} from 'react';
import {BaseModal} from "../../shared/BaseModal";
import {useDispatch} from "react-redux";
import {actions} from "../../../store";

// TODO: Добавить ссаную валидацию полей
export const AddMemberModal = ({isOpen, onClose}) => {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        description: ''
    });

    const onChange = (field, value) => {
        setForm({
            ...form,
            [field]: value
        });
    };

    const onResetAndClose = () => {
        setForm({
            firstName: '',
            lastName: '',
            description: ''
        });
        onClose?.();
    }

    const onAddMember = () => {
        dispatch(actions.addMember(form));
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
                        value={form.firstName}
                        onChange={(e) => onChange('firstName', e.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="firstName">Фамилия:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={form.lastName}
                        onChange={(e) => onChange('lastName', e.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="firstName">Информация об участнике:</label>
                    <textarea
                        id="description"
                        value={form.description}
                        rows="3"
                        onChange={(e) => onChange('description', e.target.value)}
                    />
                </div>

                <button type="button" className="button mt-8" onClick={onAddMember}>
                    Добавить участника
                </button>
            </div>
        </BaseModal>
    )
}