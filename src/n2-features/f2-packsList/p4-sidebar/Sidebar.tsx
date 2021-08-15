import React from 'react'
import {Button, ButtonGroup, Grid, Typography} from "@material-ui/core";
import {DoubleSlider} from "./DoubleSlider";
import {useDispatch} from "react-redux";
import {onChangePrivateAC} from "../../../n1-main/m2-bll/reducers/cards-reduser";
import {getCardPacksTC} from "../../../n1-main/m2-bll/reducers/packs-reducer";

type PropsType = {
    value: number []
    setValue: (value: number[]) => void
}

export const Sidebar: React.FC<PropsType> = (props) => {
    const dispatch = useDispatch()


    const privatCardsTrue = () => {
        dispatch(onChangePrivateAC(true))
    }
    const privatCardsFalse = () => {
        dispatch(onChangePrivateAC(false))
    }

    const searchSlider = () => {

    }
    return (
        <>
            <Grid container direction={'column'} justifyContent={'center'}
                  alignContent={'space-around'} style={{height: '500px'}}>
                <Grid item xs>
                    <Typography id="range-slider" gutterBottom>Show packs cards</Typography>
                </Grid>
                <Grid item xs={6}>
                    <ButtonGroup disableElevation color="primary" aria-label="outlined primary button group">
                        <Button onClick={privatCardsTrue}>My</Button>
                        <Button onClick={privatCardsFalse}>All</Button>

                    </ButtonGroup>
                </Grid>
                <Grid item xs={4}>
                    <DoubleSlider searchSlider={searchSlider} value={props.value} setValue={props.setValue}/>
                </Grid>
            </Grid>
        </>
    )
}



