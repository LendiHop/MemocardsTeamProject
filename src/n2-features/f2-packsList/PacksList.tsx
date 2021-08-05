import React from "react";
import {Container, Grid} from "@material-ui/core";
import {Sidebar} from "./p4-sidebar/Sidebar";
import PacksTable from "./p3-tables/PacksTable";

export const PacksList: React.FC = () => {
    return (
    <Container>
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{height: "92vh"}}
        >
            <Grid item xs={3} style={{border: "1px solid black"}}>
                <Sidebar/>
            </Grid>
            <Grid item xs={9}>
                <PacksTable/>
            </Grid>
        </Grid>
    </Container>
    )
}
