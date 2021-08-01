import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "../reducers/auth-reducer";
import { loginReducer } from "../../../n2-features/f1-auth/a1-loginization/reducer/reducer";
import {profileReducer} from "../../../n2-features/f1-auth/a5-profile/reducer/reducer";

const reducers = combineReducers({
    auth: authReducer,
    login: loginReducer,
    profile: profileReducer,
});

const store = createStore(reducers, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof reducers>

export default store;