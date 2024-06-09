import React, {useMemo} from 'react';
import {useSelector} from "react-redux";
import C from "classnames";

export const MemberListItem = ({member, isSelected, onSelect}) => {
    const avatars = useSelector((state) => state.members.avatars);

    const avatar = useMemo(() => {
        return avatars.find(({id}) => member.avatarId === id);
    }, [avatars, member.avatarId]);

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