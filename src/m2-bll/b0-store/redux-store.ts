import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import authReducer from "../b1-reducers/auth-reducer";
import {profileReducer} from "../b1-reducers/profile-reducer";
import {appReducer} from "../b1-reducers/app-reduser";
import {packsReducer} from "../b1-reducers/packs-reducer";
import {cardsReducer} from "../b1-reducers/cards-reduser";
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer
});

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)));

export type AppRootStateType = ReturnType<typeof reducers>

export default store;