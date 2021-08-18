import React from 'react';
import './Main.module.css';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../m2-bll/store/redux-store";
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';


export const Main = () => {
    console.log('main')
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    if (!isInitialized) {
        return <CircularProgress />
    }

    return (
        <div className="Main">
            main
        </div>
    );
}
