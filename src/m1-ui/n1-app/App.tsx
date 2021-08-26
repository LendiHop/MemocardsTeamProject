import React, {useEffect} from 'react';
import './App.css';
import {Header} from "../n2-header/Header";
import {Routes} from "../n3-routes/Routes";
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC, RequestStatusType} from "../../m2-bll/b1-reducers/app-reduser";
import {ErrorSnackbar} from "../n0-errorSnackbar/ErrorSnackbar";
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';
import {AppRootStateType} from '../../m2-bll/b0-store/redux-store';

export const App = () => {
    console.log('app')
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const status = useSelector((state: AppRootStateType): RequestStatusType => state.app.status)
    const dispatch = useDispatch()

    useEffect(() => {
            dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <LinearProgress color={"secondary"}/>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>
            {status === "loading" && <LinearProgress color="secondary"/>}
            <Routes/>
        </div>
    );
}
