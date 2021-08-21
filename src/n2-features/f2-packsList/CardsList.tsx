import React, {useEffect} from "react";
import CardsTable from "./p3-tables/CardsTable";
import {Container, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/store/redux-store";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link, Redirect, useParams} from "react-router-dom";
import {SearchContainer} from "./p1-search/SearchContainer";
import {PaginationContainer} from "./p2-pagination/PaginationContainer";
import {getCardsTC} from "../../n1-main/m2-bll/reducers/cards-reduser";

export const CardsList: React.FC = () => {
    const dispatch = useDispatch()

    const {id, name} = useParams<{id: string, name: string}>(); //current pack data

    const packsTrue = useSelector<AppRootStateType, boolean>(state => state.cards.packsTrue)

    useEffect(() => {
        dispatch(getCardsTC(id))
    }, [id])

    if (!packsTrue) {
        return <Redirect to={'/profile'}/>
    }
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
                <h1>{name}</h1>
                <SearchContainer/>
                <CardsTable/>
                <PaginationContainer/>
            </Grid>
        </Container>
    )
}
