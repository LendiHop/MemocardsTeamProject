import React from 'react'
import {Button, ButtonGroup, Grid, Slider, Typography} from "@material-ui/core";
import RangeSlider from "./DoubleSlider";

export const Sidebar: React.FC = () => {

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
                    <RangeSlider />
                </Grid>
            </Grid>
        </>
    )
}



