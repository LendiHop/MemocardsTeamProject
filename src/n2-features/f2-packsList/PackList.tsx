import React from "react";
import {Button, Container, Grid} from "@material-ui/core";
import {Sidebar} from "./p4-sidebar/Sidebar";
import {getCardsTC, getPacksTC} from "../../n1-main/m2-bll/reducers/cards-reduser";
import {useDispatch} from "react-redux";

export const PackList: React.FC = () => {
    const dispatch = useDispatch()
    const clickCardsCallback = () => {
        dispatch(getCardsTC('610a9eeb84e42f00045c32f6'))
    }
const clickPacksCallback = () => {
        dispatch(getPacksTC())
    }
    return (
        <Container style={{maxHeight: '100vh'}}>
            <Grid container direction={'row'} spacing={2} style={{height: '92vh'}}>
                <Grid item style={{border: 'solid 1px grey'}}>
                    <Sidebar/>
                </Grid>
                <Grid item style={{width: '80vh', border: 'solid 1px grey'}}>
                    hi
                    <Button onClick={clickPacksCallback}>get packs</Button>
                    <Button onClick={clickCardsCallback}>get cards</Button>
                </Grid>

            </Grid>
        </Container>
    )
}
