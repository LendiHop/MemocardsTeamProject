import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth-reducer";
import {profileReducer} from "../reducers/profile-reducer";
import {appReducer} from "../reducers/app-reduser";

const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof reducers>

export default store;