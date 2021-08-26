import React from 'react';
import {Error404} from "../n4-features/f0-404/Error404";
import {Redirect, Route, Switch} from 'react-router-dom';
import {PasswordRecovery} from "../n4-features/f1-auth/a3-passwordRecovery/PasswordRecovery";
import {NewPasswordContainer} from "../n4-features/f1-auth/a4-NewPassword/NewPasswordContainer";
import {Profile} from "../n4-features/f1-auth/a5-profile/Profile";
import {RegistrationContainer} from "../n4-features/f1-auth/a2-registration/RegistrationContainer";
import {LoginContainer} from "../n4-features/f1-auth/a1-login/LoginContainer";
import {CheckOnEmail} from "../n4-features/f1-auth/a3-passwordRecovery/CheckOnEmail";
import {PacksList} from "../n4-features/f2-packsList/p0-pages/PacksList";
import {CardsList} from "../n4-features/f2-packsList/p0-pages/CardsList";
import LearnPage from "../n4-features/f3-learning/LearnPage";

export const PATH = {
        LOGIN: '/login',
        REGISTRATION: '/registration',
        PROFILE: '/profile',
        PASSWORD_RECOVERY: '/password-recovery',
        NEW_PASSWORD: '/set-new-password/:token',
        PACKS_LIST: '/packs-list',
        CARDS: '/cards-list/:name/:id',
        LEARN: '/learn/:name/:id',
        CHECK_EMAIL: '/check-on-email',
        ERROR_404: '/404',
}

export const Routes = () => {
    return (
        <Switch>
                <Route exact path="/" strict render={() => <Redirect to={PATH.LOGIN}/>}/>
                <Route path={PATH.LOGIN} render={() => <LoginContainer/>}/>
                <Route path={PATH.PACKS_LIST} render={() => <PacksList/>}/>

                <Route path={PATH.CARDS} render={() => <CardsList/>}/>
                <Route path={PATH.LEARN} render={() => <LearnPage/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>

                <Route path={PATH.REGISTRATION} render={() => <RegistrationContainer/>}/>
                <Route path={PATH.PASSWORD_RECOVERY} render={() => <PasswordRecovery/>}/>
                <Route path={PATH.NEW_PASSWORD} render={() => <NewPasswordContainer/>}/>

                <Route path={PATH.ERROR_404} render={() => <Error404/>}/>
                <Route path={PATH.CHECK_EMAIL} render={() => <CheckOnEmail/>}/>
                <Redirect from="*" to={PATH.ERROR_404}/>
        </Switch>
    );
}
