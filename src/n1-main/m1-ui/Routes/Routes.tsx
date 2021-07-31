import React from 'react';
import {Login} from "../../../n2-features/f1-auth/a1-loginization/Login";
import {Error404} from "../../../n2-features/f0-test/t2-404/Error404";
import {Redirect, Route, Switch} from 'react-router-dom';
import {PasswordRecovery} from "../../../n2-features/f1-auth/a3-passwordRecovery/PasswordRecovery";
import {NewPasswordContainer} from "../../../n2-features/f1-auth/a4-enterPassword/NewPasswordContainer";
import {Profile} from "../../../n2-features/f1-auth/a5-profile/Profile";
import {Test} from '../../../n2-features/f0-test/t1-test/test';
import {Main} from '../Main/Main';
import {RegistrationContainer} from "../../../n2-features/f1-auth/a2-registration/RegistrationContainer";
import {CheckOnEmail} from "../../../n2-features/f1-auth/a3-passwordRecovery/CheckOnEmail";


export const Routes = () => {

    return (
        <Switch>
            <Route exact path="/" render={() => <Main/>}/>
            <Route path="/profile" render={() => <Profile/>}/>
            <Route path="/test" render={() => <Test/>}/>
            <Route path="/login" render={() => <Login/>}/>
            <Route path="/registration" render={() => <RegistrationContainer/>}/>
            <Route path="/password-recovery" render={() => <PasswordRecovery/>}/>
            <Route path="/set-new-password" render={() => <NewPasswordContainer/>}/>
            <Route path={"/404"} render={() => <Error404/>}/>
            <Route path={"/go-to-email"} render={() => <CheckOnEmail/>}/>
            <Redirect from="*" to="/404"/>
        </Switch>
    );
}
