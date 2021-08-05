import React from "react";
import CardsTable from "./p3-tables/CardsTable";
import {Container, Grid, Icon} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/store/redux-store";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from "react-router-dom";

export const CardsList: React.FC = () => {
    const packName = useSelector<AppRootStateType, string>(state => state.cards.currentPackData.name);

    return (
        <Container>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{height: "92vh"}}
            >
                <Link to='/packs-list'><ArrowBackIcon style={{ fontSize: 40 }}/></Link>
                <h1>{packName}</h1>
                <CardsTable/>
            </Grid>
        </Container>
    )
}
