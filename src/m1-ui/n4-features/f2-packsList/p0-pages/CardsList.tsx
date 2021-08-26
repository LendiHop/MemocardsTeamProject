import React, {useEffect} from "react";
import CardsTable from "../p3-tables/CardsTable";
import {Container, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link, useParams} from "react-router-dom";
import {SearchContainer} from "../p1-search/SearchContainer";
import {PaginationContainer} from "../p2-pagination/PaginationContainer";
import {getCardsTC} from "../../../../m2-bll/b1-reducers/cards-reduser";

export const CardsList: React.FC = () => {
    const dispatch = useDispatch()

    const sort = useSelector<AppRootStateType, boolean>(state => state.cards.sort);

    const {id, name} = useParams<{id: string, name: string}>(); //current pack data

    useEffect(() => {
        dispatch(getCardsTC(id))
    }, [dispatch, id, sort])

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
