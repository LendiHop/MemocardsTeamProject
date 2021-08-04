import React from 'react'
import {Button, ButtonGroup, Grid, Typography} from "@material-ui/core";
import {DoubleSlider} from "./DoubleSlider";

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
                    <DoubleSlider />
                </Grid>
            </Grid>
        </>
    )
}



