import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch} from "react-redux";
import {actions} from "../../../store";
import {UpdateAvatarModal} from "./UpdateAvatarModal";
import {useAvatar} from "../../../hooks/useAvatar";
import {useMember} from "../../../hooks/useMember";
import {useForm} from "../../../hooks/useForm";

export const MemberEditCard = ({id}) => {
    const [isUpdateAvatarModalVisible, setIsUpdateAvatarModalVisible] = useState(false);

    const {onChangeById, updateValue, values, valid, setValues, touchedFields} = useForm({
        id: -1,
        firstName: '',
        lastName: '',
        description: '',
        avatarId: 0
    }, {
        firstName: 'required',
        lastName: 'required'
    });

    const member = useMember(id);
    const avatar = useAvatar(values.avatarId)


    const onUpdateAvatar = (id) => {
        updateValue('avatarId', id);
        setIsUpdateAvatarModalVisible(false);
    }

    const dispatch = useDispatch();
    const onAddMember = () => {
        dispatch(actions.members.update(values));
    };

    useEffect(() => {
        setValues({
            id: member.id,
            firstName: member.firstName,
            lastName: member.lastName,
            description: member.description,
            avatarId: member.avatarId
        });
    }, [member]);

    const saveButtonDisabled = useMemo(() => (!valid || touchedFields.length === 0), [touchedFields.length, valid])

    return (
        <div className="member-edit-card f-align-stretch">
            <h2 className="member-edit-card_title">{member.firstName} {member.lastName}</h2>

            <div className="f-row f-gap-lg">
                <div className="card">
                    <img
                        className="member-edit-card_avatar"
                        src={avatar.content}
                        alt={`${member.firstName} ${member.lastName}`}
                    />
                    <button
                        className="button-secondary mt-12"
                        onClick={() => setIsUpdateAvatarModalVisible(true)}
                    >
                        Сменить изображение
                    </button>

                    <UpdateAvatarModal
                        isOpen={isUpdateAvatarModalVisible}
                        onClose={() => setIsUpdateAvatarModalVisible(false)}
                        onChange={(id) => onUpdateAvatar(id)}
                        avatarId={values.avatarId}
                    />
                </div>

                <div className="card flex-1">
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

                    <button type="button" className="button mt-8" onClick={onAddMember} disabled={saveButtonDisabled}>
                        Сохранить данные
                    </button>
                </div>
            </div>
        </div>
    )
}