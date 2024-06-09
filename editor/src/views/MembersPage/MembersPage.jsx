import React, {useState} from 'react';
import {NavLayout} from "../NavLayout/NavLayout";
import {MembersList} from "./components/MembersList";
import {BaseModal} from "../shared/BaseModal";
import {AddMemberModal} from "./components/AddMemberModal";
import {MemberEditCard} from "./components/MemberEditCard";

export const MembersPage = () => {
    const [selectedMemberId, setSelectedMemberId] = useState(-1);

    return (
        <main className="page">
            <NavLayout title="Участники диалога">
                <div className="members-page">
                    <MembersList
                        selectedMemberId={selectedMemberId}
                        onSelectMember={(id) => setSelectedMemberId(id)}
                    />

                    {selectedMemberId >= 0 && <MemberEditCard id={selectedMemberId} />}
                </div>
            </NavLayout>
        </main>
    )
}