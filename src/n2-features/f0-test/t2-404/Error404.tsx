import React from 'react';
import s from './Error404.module.css';

export const Error404 = () => {
    return (
        <div className={s.container}>
            <div className={s.rail}>
                <div className={s.stamp + " " + s.four}>4</div>
                <div className={s.stamp + " " + s.zero}>0</div>
                <div className={s.stamp + " " + s.four}>4</div>
                <div className={s.stamp + " " + s.zero}>0</div>
                <div className={s.stamp + " " + s.four}>4</div>
                <div className={s.stamp + " " + s.zero}>0</div>
                <div className={s.stamp + " " + s.four}>4</div>
                <div className={s.stamp + " " + s.zero}>0</div>
                <div className={s.stamp + " " + s.four}>4</div>
                <div className={s.stamp + " " + s.zero}>0</div>
                <div className={s.stamp + " " + s.four}>4</div>
                <div className={s.stamp + " " + s.zero}>0</div>
                <div className={s.stamp + " " + s.four}>4</div>
                <div className={s.stamp + " " + s.zero}>0</div>
                <div className={s.stamp + " " + s.four}>4</div>
                <div className={s.stamp + " " + s.zero}>0</div>
                <div className={s.stamp + " " + s.four}>4</div>
                <div className={s.stamp + " " + s.zero}>0</div>
                <div className={s.stamp + " " + s.four}>4</div>
                <div className={s.stamp + " " + s.zero}>0</div>
            </div>
            <div className={s.world}>
                <div className={s.forward}>
                    <div className={s.box}>
                        <div className={s.wall}></div>
                        <div className={s.wall}></div>
                        <div className={s.wall}></div>
                        <div className={s.wall}></div>
                        <div className={s.wall}></div>
                        <div className={s.wall}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}