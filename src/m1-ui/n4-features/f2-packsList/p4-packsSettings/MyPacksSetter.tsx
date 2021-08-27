import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";
import {onChangePrivateAC} from "../../../../m2-bll/b1-reducers/cards-reduser";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export default function MyPacksSetter() {
    const dispatch = useDispatch();

    const privatCards = useSelector<AppRootStateType, boolean>(state => state.cards.privatCards);

    const privatCardsTrue = () => {
        dispatch(onChangePrivateAC(true))
    }
    const privatCardsFalse = () => {
        dispatch(onChangePrivateAC(false))
    }

    return (
        <ButtonGroup disableElevation color="primary">
            <Button onClick={privatCardsTrue} disabled={privatCards}>My</Button>
            <Button onClick={privatCardsFalse} disabled={!privatCards}>All</Button>
        </ButtonGroup>
    );
}
