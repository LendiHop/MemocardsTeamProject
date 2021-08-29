import React, {useCallback, useEffect, useState} from "react";
import Grid from '@material-ui/core/Grid';
import PacksTable from "../p3-tables/PacksTable";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";
import {getCardPacksTC, setPage, setPageCount, setSearchQuery} from "../../../../m2-bll/b1-reducers/packs-reducer";
import {SearchInput} from "../p2-search/Search";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import {AddPackModalContainer} from "../../f4-modals/AddPackModalContainer";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import MyPacksSetter from "../p4-packsSettings/MyPacksSetter";
import RangeSlider from "../p4-packsSettings/RangeSlider";

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

export const PacksList: React.FC = () => {
    const dispatch = useDispatch();

    const classes = useStyles();

    const page = useSelector<AppRootStateType, number>(state => state.packs.page);
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount);
    const searchQuery = useSelector<AppRootStateType, string>(state => state.packs.searchQuery);
    const sort = useSelector<AppRootStateType, boolean>(state => state.packs.sort);

    const max = useSelector<AppRootStateType, number>(state => state.packs.max)
    const min = useSelector<AppRootStateType, number>(state => state.packs.min)

    const privatCards = useSelector<AppRootStateType, boolean>(state => state.cards.privatCards)
    const userId = useSelector<AppRootStateType, string>(state => state.profile._id)

    useEffect(() => {
        dispatch(getCardPacksTC());
    }, [dispatch, privatCards, min, max, page, pageCount, searchQuery, sort]);

    const [showAddPackModal, setShowAddPackModal] = useState(false);

    //search
    const [inputValue, setInputValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleClick = () => {
        dispatch(setSearchQuery(inputValue));
    }

    const handleEnter = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter') {
            dispatch(setSearchQuery(inputValue));
        }
    }

    //pagination
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(setPage(newPage + 1));
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(setPageCount(parseInt(event.target.value, 10)));
        dispatch(setPage(0));
    };

    const addPackHandler = useCallback(() => {
        setShowAddPackModal(true)
    }, [])

    return (
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item container alignItems='center' >
                        <Grid item xs={2}><Button variant="contained" color="secondary" onClick={addPackHandler}>Add Pack</Button></Grid>
                        <Grid item xs={2}><MyPacksSetter/></Grid>
                        <Grid item xs={2}><RangeSlider/></Grid>
                        <Grid item xs={6}>
                            <SearchInput placeholder="Search pack by name.." handleClick={handleClick}
                                         handleEnter={handleEnter}
                                         handleChange={handleChange}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}><PacksTable userId={userId}/></Grid>
                    <Grid item xs={12} className={classes.pagination}>
                        <TablePagination
                            component="div"
                            count={cardPacksTotalCount}
                            page={page - 1}
                            onPageChange={handleChangePage}
                            rowsPerPage={pageCount}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </Paper>

            {showAddPackModal &&
            <AddPackModalContainer show={showAddPackModal} setShow={setShowAddPackModal}/>}
        </Container>
    )
}
