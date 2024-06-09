import React from "react";
import {BaseModal} from "../../shared/BaseModal";
import {useDispatch, useSelector} from "react-redux";
import C from "classnames";
import {actions} from "../../../store";

export const UpdateAvatarModal = ({isOpen, onClose, avatarId, onChange}) => {
    const dispatch = useDispatch();
    const avatars = useSelector((state) => state.members.avatars);

    const onUploadImage = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.addEventListener('input', function onChange(e){
            const reader = new FileReader();
            reader.readAsDataURL(fileInput.files[0]);

            reader.onload = (e) => {
                dispatch(actions.addAvatar({
                    content: e.target.result
                }));

                fileInput.removeEventListener('input', onChange);
                fileInput.remove();
            }
        });

        fileInput.click();
    }

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title="Выберите или загрузите изображение">
            <div className="update-avatar">
                <div className="update-avatar_list">
                    {
                        avatars.map((avatar) => (
                            <div
                                key={avatar.id}
                                className={C([
                                    'card update-avatar_list-item',
                                    avatar.id === avatarId && 'update-avatar_list-item--selected'
                                ])}
                                onDoubleClick={() => onChange(avatar.id)}
                            >
                                <img src={avatar.content} alt={avatar.id}/>
                            </div>
                        ))
                    }
                </div>
                <div className="update-avatar_loader">
                    <h4>Выберите изображение слева<br/>двойным кликом</h4>
                    <h5>Либо загрузите новое изображение с диска</h5>
                    <button className="button" onClick={onUploadImage}>Выбрать изображение</button>
                </div>
            </div>

        </BaseModal>
    )
}