import React, {useCallback, useEffect, useState} from "react";
import CardsTable from "../p3-tables/CardsTable";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link, useParams} from "react-router-dom";
import {
    getCardsTC,
    setCardsPage,
    setCardsPageCount,
    setSearchByAnswerQuery,
    setSearchByQuestionQuery,
} from "../../../../m2-bll/b1-reducers/cards-reduser";
import {SearchInput} from "../p2-search/Search";
import TablePagination from "@material-ui/core/TablePagination";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {AddCardsModalContainer} from "../../f4-modals/AddCardsModalContainer";
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: 30,
            marginBottom: 30,
        },
        paper: {
            padding: 20,
        },
        pagination: {
            flexGrow: 1,
        },
    }),
);

export const CardsList: React.FC = () => {
    const dispatch = useDispatch()
    const classes = useStyles();
    const page = useSelector<AppRootStateType, number>(state => state.cards.page);
    const pageCount = useSelector<AppRootStateType, number>(state => state.cards.pageCount);
    const SearchByQuestionQuery = useSelector<AppRootStateType, string>(state => state.cards.SearchByQuestionQuery);
    const SearchByAnswerQuery = useSelector<AppRootStateType, string>(state => state.cards.SearchByAnswerQuery);

    const {id, name} = useParams<{id: string, name: string}>(); //current pack data

    useEffect(() => {
        dispatch(getCardsTC(id))
    }, [dispatch, id, SearchByQuestionQuery, SearchByAnswerQuery, page, pageCount])

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
        dispatch(setCardsPage(newPage + 1));
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(setCardsPageCount(parseInt(event.target.value, 10)));
        dispatch(setCardsPage(0));
    };

    const [showAddCardsModal, setShowAddCardsModal] = useState(false);
    const packUserId = useSelector<AppRootStateType, string>(state => state.cards.packUserId);
    const userId = useSelector<AppRootStateType, string>(state => state.profile._id);

    const addCardHandler = useCallback(() => {
        setShowAddCardsModal(true)
    }, [])

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item container justifyContent='space-between'>
                        <Grid item>
                            <Link to='/packs-list'><IconButton><ArrowBackIcon style={{fontSize: 30}}/></IconButton></Link>
                        </Grid>
                        <Grid item><Typography variant="h4">{name}</Typography></Grid>
                    </Grid>

                    <Grid item container spacing={4} alignItems='center'>
                        <Grid item xs={2}>
                            <Button variant="contained" color="secondary" onClick={addCardHandler} disabled={!(userId === packUserId)}>Add Card</Button>
                        </Grid>
                        <Grid item xs={5}>
                            <SearchInput placeholder="Search card by question.."
                                         handleChange={handleSearchByQuestionChange}
                                         handleClick={handleSearchByQuestionClick}
                                         handleEnter={handleSearchByQuestionEnter}/>
                        </Grid>
                        <Grid item xs={5}>
                            <SearchInput placeholder="Search card by answer.." handleEnter={handleSearchByAnswerEnter}
                                         handleClick={handleSearchByAnswerClick}
                                         handleChange={handleSearchByAnswerChange}/>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}><CardsTable/></Grid>
                    <Grid item xs={12} className={classes.pagination}>
                        <TablePagination
                            component="div"
                            count={cardsTotalCount}
                            page={page - 1}
                            onPageChange={handleChangePage}
                            rowsPerPage={pageCount}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </Paper>

            {showAddCardsModal &&
            <AddCardsModalContainer show={showAddCardsModal} setShow={setShowAddCardsModal}/>}
        </Container>
    );
}
