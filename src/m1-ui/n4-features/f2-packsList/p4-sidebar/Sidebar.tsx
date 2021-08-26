import React from 'react'
import {Button, ButtonGroup, Grid, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {onChangePrivateAC} from "../../../../m2-bll/b1-reducers/cards-reduser";
import RangeSlider from "./RangeSlider";

export const Sidebar: React.FC = () => {
    const dispatch = useDispatch()

    const privatCardsTrue = () => {
        dispatch(onChangePrivateAC(true))
    }
    const privatCardsFalse = () => {
        dispatch(onChangePrivateAC(false))
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
                    <RangeSlider/>
                </Grid>
            </Grid>
        </>
    )
}



