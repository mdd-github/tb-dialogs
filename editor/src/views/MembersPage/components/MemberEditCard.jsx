import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {actions} from "../../../store";

export const MemberEditCard = ({id}) => {
    const members = useSelector((state) => state.members.list);
    const member = useMemo(() => {
        return members.find((member) => member.id === id);
    }, [id, members]);

    const avatars = useSelector((state) => state.members.avatars);
    const avatar = useMemo(() => {
        return avatars.find(({id}) => member.avatarId === id);
    }, [avatars, member.avatarId]);

    const dispatch = useDispatch();

    const [form, setForm] = useState({
        id: -1,
        firstName: '',
        lastName: '',
        description: '',
        avatarId: 0
    });

    const onChange = (field, value) => {
        setForm({
            ...form,
            [field]: value
        });
    };

    const onAddMember = () => {
        dispatch(actions.updateMember(form));
    };

    useEffect(() => {
        setForm({
            id: member.id,
            firstName: member.firstName,
            lastName: member.lastName,
            description: member.description,
            avatarId: member.avatarId
        });
    }, [member]);

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
                    <button className="button-secondary mt-12">Сменить изображение</button>
                </div>

                <div className="card flex-1">
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
                        Сохранить данные
                    </button>
                </div>
            </div>
        </div>
    )
}