import React from 'react'
import {Button, ButtonGroup, Grid, Typography} from "@material-ui/core";
import {DoubleSlider} from "./DoubleSlider";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";

export const Sidebar: React.FC = () => {
    const dispatch = useDispatch()
    const  maxGrade = useSelector<AppRootStateType, number>(state => state.cards.maxGrade)
    const  minGrade = useSelector<AppRootStateType, number>(state => state.cards.minGrade)

    return (
        <>
            <Grid container direction={'column'} justifyContent={'center'}
                  alignContent={'space-around'} style={{height: '500px'}}>
                <Grid item xs>
                    <Typography id="range-slider" gutterBottom>Show packs cards</Typography>
                </Grid>
                <Grid item xs={6}>
                    <ButtonGroup disableElevation color="primary" aria-label="outlined primary button group">
                        <Button>My</Button>
                        <Button>All</Button>

                    </ButtonGroup>
                </Grid>
                <Grid item xs={4}>
                    <DoubleSlider min={minGrade} max={maxGrade}/>
                </Grid>
            </Grid>
        </>
    )
}



