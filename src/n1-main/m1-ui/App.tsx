import React, {useEffect} from 'react';
import './App.css';
import {Header} from "./Header/Header";
import {Routes} from "./Routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC, RequestStatusType} from "../m2-bll/reducers/app-reduser";
import {ErrorSnackbar} from "./ErrorSnackbar/ErrorSnackbar";
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import {AppRootStateType} from '../m2-bll/store/redux-store';

export const App = () => {
    console.log('app')
    const status = useSelector((state: AppRootStateType): RequestStatusType => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch()

    useEffect(() => {

            dispatch(initializeAppTC())

    }, [])


    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>
            {status === "loading" && <LinearProgress color="secondary"/>}
            <Routes/>
        </div>
    );
}
