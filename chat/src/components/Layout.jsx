import React from "react";

import TBankLogo from '../assets/images/tinkoff-logo.svg';

export const Layout = ({children, title}) => {
    return (
        <div className="layout">
            <header className="layout_header">
                <img src={TBankLogo} alt="TBank logo" className="layout_header-logo"/>
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