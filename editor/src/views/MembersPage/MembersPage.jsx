import React from 'react';
import {NavLayout} from "../NavLayout/NavLayout";
import {MembersList} from "./components/MembersList";
import {BaseModal} from "../shared/BaseModal";

export const MembersPage = () => {

    return (
        <main className="page">
            <NavLayout title="Участники диалога">
                <>
                    <MembersList />
                </>
            </NavLayout>

            <BaseModal title="Добавить участника">
                <div>
                    <h5>Base modal</h5>
                </div>
            </BaseModal>
        </main>
    )
}