import React from 'react';
import C from "classnames";
import {useAvatar} from "../../../hooks/useAvatar";

export const MemberListItem = ({member, isSelected, onSelect}) => {
    const avatar = useAvatar(member.avatarId);

    return (
        <div
            className={C([
                'member-list-item card f-row f-gap-md',
                isSelected && 'member-list-item--selected'
            ])}
            onClick={onSelect}
        >
            <img
                className="member-list-item_avatar"
                src={avatar.content}
                alt={`${member.firstName} ${member.lastName}`}
            />

            <div className="f-col f-gap-sm">
                <h3>{member.firstName} {member.lastName}</h3>
                <p>{member.description}</p>
            </div>

        </div>
    )
}