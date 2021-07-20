import React from 'react';
import {Login} from "../../../n2-features/f1-auth/a1-loginization/Login";
import {Error404} from "../../../n2-features/f0-test/t2-404/Error404";
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import { App } from '../App';
import {Registration} from "../../../n2-features/f1-auth/a2-registration/Registration";
import {PasswordRecovery} from "../../../n2-features/f1-auth/a3-passwordRecovery/PasswordRecovery";
import {EnterPassword} from "../../../n2-features/f1-auth/a4-enterPassword/EnterPassword";
import {Profile} from "../../../n2-features/f1-auth/a5-profile/Profile";
import { Test } from '../../../n2-features/f0-test/t1-test/test';

export const Routes = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" render={() => <App/>}/>
                <Route path="/profile" render={() => <Profile/>}/>
                <Route path="/test" render={() => <Test/>}/>
                <Route path="/login" render={() => <Login/>}/>
                <Route path="/registration" render={() => <Registration/>}/>
                <Route path="/password-recovery" render={() => <PasswordRecovery/>}/>
                <Route path="/enter-password" render={() => <EnterPassword/>}/>
                <Route path={"/404"} render={() => <Error404/>}/>
                <Redirect from="*" to="/404"/>
            </Switch>
        </HashRouter>
    );
}
