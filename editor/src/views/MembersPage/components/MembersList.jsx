import React from 'react';
import {useSelector} from "react-redux";
import {NoMembersMessage} from "./NoMembersMessage";

export const MembersList = () => {
    const members = useSelector((state) => state.members.list);

    return (
        <div className="members-list f-col f-justify-start f-align-stretch">

            {
                members.length === 0 && <NoMembersMessage />
            }

            {
                members.length !== 0 && (
                    <>
                        <div className="members-list_list">
                            {members.map((member) => (<div key={member.id}>{member.firstName}</div>))}
                        </div>
                        <div className="members-list_actions">
                            <button className="button-lg">Добавить участника</button>
                        </div>
                    </>
                )
            }
        </div>
    )
}