import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import appReducer from "../reducers/app-reducer";

let reducers = combineReducers({
    app: appReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;