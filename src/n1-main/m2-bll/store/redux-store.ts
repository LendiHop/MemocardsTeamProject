import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth-reducer";
import {profileReducer} from "../reducers/profile-reducer";
import {appReducer} from "../reducers/app-reduser";
import {packsReducer} from "../reducers/packs-reducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    packs: packsReducer
});

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)));

export type AppRootStateType = ReturnType<typeof reducers>

export default store;