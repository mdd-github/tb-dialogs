import React from 'react';
import CloseOutlined from '@mui/icons-material/CloseOutlined';

export const BaseModal = ({ children, title, isOpen, onClose }) => {

    if(isOpen === false) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal card">
                <div className="modal_header">
                    <h6 className="modal_header-title">{title ?? ''}</h6>
                    <span className="modal_header-close" onClick={() => onClose?.()}>
                        <CloseOutlined />
                    </span>
                </div>
                { children }
            </div>
        </div>
    )
}