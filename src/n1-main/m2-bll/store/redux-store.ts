import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import { loginReducer } from "../../../n2-features/f1-auth/a1-loginization/reducer/reducer";
import {profileReducer} from "../../../n2-features/f1-auth/a5-profile/reducer/reducer";

let reducers = combineReducers({
    login: loginReducer,
    profile: profileReducer,
});

let store = createStore(reducers, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof reducers>

export default store;