import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {NoMembersMessage} from "./NoMembersMessage";
import {AddMemberModal} from "./AddMemberModal";
import {MemberListItem} from "./MemberListItem";

export const MembersList = ({selectedMemberId, onSelectMember}) => {
    const [isAddMemberModalVisible, setIsAddMemberModalVisible] = useState(false);

    const members = useSelector((state) => state.members.list);

    return (
        <div className="members-list f-col f-justify-start f-align-stretch">

            {
                members.length === 0 && (
                    <NoMembersMessage onCreate={() => setIsAddMemberModalVisible(true)}/>
                )
            }

            {
                members.length !== 0 && (
                    <>
                        <div className="members-list_list">
                            {members.map((member) => (
                                <MemberListItem
                                    key={member.id}
                                    member={member}
                                    isSelected={selectedMemberId === member.id}
                                    onSelect={() => onSelectMember?.(member.id)}
                                />
                            ))}
                        </div>
                        <div className="members-list_actions">
                            <button className="button" onClick={() => setIsAddMemberModalVisible(true)}>
                                Добавить участника
                            </button>
                        </div>
                    </>
                )
            }

            <AddMemberModal
                isOpen={isAddMemberModalVisible}
                onClose={() => setIsAddMemberModalVisible(false)}
            />
        </div>
    )
}