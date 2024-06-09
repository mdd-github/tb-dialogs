import React from "react";

import TBankLogo from '../../assets/images/tinkoff-logo.svg';
import {Link} from "react-router-dom";

export const NavLayout = ({children, title}) => {


    return (
        <div className="layout">
            <header className="layout_header">
                <img src={TBankLogo} alt="TBank logo" className="layout_header-logo"/>

                <ul className="layout_header-steps">
                    <li>
                        <Link to="/members">Участники диалога</Link>
                    </li>
                    <li>
                        <Link to="/messages">Сообщения диалога</Link>
                    </li>
                    <li>
                        <Link to="/check">Проверка диалога</Link>
                    </li>
                </ul>

                <ul className="layout_header-actions">
                    <li>
                        <button className="button-secondary-sm">Сохранить в файл</button>
                    </li>
                    <li>
                        <button className="button-sm">Сгенерировать ZIP</button>
                    </li>
                </ul>
            </header>

            <div className="layout_body">
                <div className="card f-col f-align-stretch f-justify-start f-gap-lg">
                    {title && <h3 className="text-center">{title}</h3>}

                    {children}
                </div>
            </div>
        </div>
    );
};