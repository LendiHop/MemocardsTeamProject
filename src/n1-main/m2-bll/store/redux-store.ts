import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth-reducer";

let reducers = combineReducers({
    auth: authReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export type AppStateType = ReturnType<typeof reducers>
export default store;