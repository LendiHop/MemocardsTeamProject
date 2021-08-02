import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth-reducer";
import {profileReducer} from "../reducers/profile-reducer";

let reducers = combineReducers({
    auth: authReducer,
    profile: profileReducer
});

let store = createStore(reducers, applyMiddleware(thunk));
export type AppRootStateType = ReturnType<typeof reducers>

export default store;