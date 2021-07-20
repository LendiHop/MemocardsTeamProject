import React from 'react';
import s from './Error404.module.css';

export const Error404 = () => {
    return (
        <div className={s.container}>
            <h3 className={s.h3}>OH JEEZ, IT'S A</h3>
            <h2 className={s.h2}>4</h2>
            <h2 className={s.four}>4</h2>
            <div className={s.morty}>
                <div className={s.hair}></div>
                <div className={s.ears}></div>
                <div className={s.face}></div>
                <div className={s.eyes}></div>
                <div className={s.nose}></div>
                <div className={s.mouth}></div>
                <div className={s.lines}></div>
            </div>
            <h1 className={s.h1}>ERROR</h1>
        </div>
    );
}