import React from "react";
import {Container, Grid} from "@material-ui/core";
import {Sidebar} from "./p4-sidebar/Sidebar";

export const PackList: React.FC = () => {

    return (
        <Container style={{maxHeight: '100vh'}}>
            <Grid container direction={'row'} spacing={2} style={{height: '92vh'}}>
                <Grid item style={{border: 'solid 1px grey'}}>
                    <Sidebar/>
                </Grid>
                <Grid item style={{width: '80vh', border: 'solid 1px grey'}}>
hi
                </Grid>

            </Grid>
        </Container>
    )
}
