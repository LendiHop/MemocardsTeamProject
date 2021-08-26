import React, {useEffect, useState} from "react";
import CardsTable from "../p3-tables/CardsTable";
import {Container, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link, useParams} from "react-router-dom";
import {
    getCardsTC, setCardsPage, setCardsPageCount, setSearchByAnswerQuery, setSearchByQuestionQuery,
} from "../../../../m2-bll/b1-reducers/cards-reduser";
import {SearchInput} from "../p2-search/Search";
import TablePagination from "@material-ui/core/TablePagination";

export const CardsList: React.FC = () => {
    const dispatch = useDispatch()
    const page = useSelector<AppRootStateType, number>(state => state.cards.page);
    const pageCount = useSelector<AppRootStateType, number>(state => state.cards.pageCount);
    const sort = useSelector<AppRootStateType, boolean>(state => state.cards.sort);
    const SearchByQuestionQuery = useSelector<AppRootStateType, string>(state => state.cards.SearchByQuestionQuery);
    const SearchByAnswerQuery = useSelector<AppRootStateType, string>(state => state.cards.SearchByAnswerQuery);

    const {id, name} = useParams<{id: string, name: string}>(); //current pack data

    useEffect(() => {
        dispatch(getCardsTC(id))
    }, [dispatch, id, sort, SearchByQuestionQuery, SearchByAnswerQuery, page, pageCount])

    //search
    const [inputQuestionValue, setInputQuestionValue] = useState("");
    const [inputAnswerValue, setInputAnswerValue] = useState("");

    const handleSearchByQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputQuestionValue(event.target.value);
    }

    const handleSearchByQuestionClick = () => {
        dispatch(setSearchByQuestionQuery(inputQuestionValue));
    }

    const handleSearchByQuestionEnter = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter') {
            dispatch(setSearchByQuestionQuery(inputQuestionValue));
        }
    }

    const handleSearchByAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputAnswerValue(event.target.value);
    }

    const handleSearchByAnswerClick = () => {
        dispatch(setSearchByAnswerQuery(inputAnswerValue));
    }

    const handleSearchByAnswerEnter = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter') {
            dispatch(setSearchByAnswerQuery(inputAnswerValue));
        }
    }

    //pagination
    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(setCardsPage(newPage+1));
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(setCardsPageCount(parseInt(event.target.value, 10)));
        dispatch(setCardsPage(0));
    };

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
                <SearchInput placeholder="Search card by question.." handleChange={handleSearchByQuestionChange} handleClick={handleSearchByQuestionClick} handleEnter={handleSearchByQuestionEnter}/>
                <SearchInput placeholder="Search card by answer.." handleEnter={handleSearchByAnswerEnter} handleClick={handleSearchByAnswerClick} handleChange={handleSearchByAnswerChange}/>
                <CardsTable/>
                <TablePagination
                    component="div"
                    count={cardsTotalCount}
                    page={page-1}
                    onPageChange={handleChangePage}
                    rowsPerPage={pageCount}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </Container>
    )
}
