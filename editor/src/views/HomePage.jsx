import React from 'react';

import TBankLogo from '../assets/images/tinkoff-logo.svg';
import {useNavigate} from "react-router-dom";

export const HomePage = () => {
    let navigate = useNavigate();

    const onCreateButtonClick = () => {
        navigate("/members");
    }

    return (
        <main className="page">
            <div className="home-page">
                <div className="card f-align-center f-gap-lg">
                    <img src={TBankLogo} alt="T-Bank" className="tbank-logo-img"/>

                    <h3>Добро пожаловать в конструктор диалогов</h3>

                    <div className="f-row f-justify-center f-gap-md">
                        <button className="button" onClick={onCreateButtonClick}>Создать</button>
                        <button className="button-secondary">Загрузить из файла</button>
                    </div>
                </div>
            </div>
        </main>
    );
};