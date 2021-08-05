import React, {useCallback, useEffect} from 'react';
import {createStyles, makeStyles, Theme, withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import {
    addCardPackTC,
    CardPackType,
    deleteCardPackTC,
    getCardPacksTC,
    updateCardPackTC
} from "../../../n1-main/m2-bll/reducers/packs-reducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";
import {getCardsTC, setCurrentPackDataAC} from "../../../n1-main/m2-bll/reducers/cards-reduser";

export const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }),
)(TableCell);

export const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);

export const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function PacksTable() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCardPacksTC({pageCount: 8}))
    }, [dispatch]);

    const cardPacks = useSelector<AppRootStateType, Array<CardPackType>>(state => state.packs.cardPacks);

    const classes = useStyles();

    const addPackHandler = useCallback(() => {
        dispatch(addCardPackTC({name: "-TestPackName-"}))
        dispatch(getCardPacksTC({pageCount: 8}))
    }, [dispatch])

    const deletePackHandler = useCallback((e, id: string) => {
        dispatch(deleteCardPackTC(id))
        dispatch(getCardPacksTC({pageCount: 8}))
    }, [dispatch])

    const updatePackHandler = useCallback((e, id: string) => {
        dispatch(updateCardPackTC({_id: id, name: "-UpdatedTestPackName-"}))
        dispatch(getCardPacksTC({pageCount: 8}))
    }, [dispatch])

    const getCardsHandler = useCallback((e, id: string, name: string) => {
        dispatch(setCurrentPackDataAC({id, name}))
        dispatch(getCardsTC(id))
    }, [dispatch])

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Cards</StyledTableCell>
                        <StyledTableCell align="right">Last Update</StyledTableCell>
                        <StyledTableCell align="right">Created by</StyledTableCell>
                        <StyledTableCell align="right">
                            <Button variant="contained" onClick={addPackHandler}>
                                Add New Pack
                            </Button>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cardPacks.map((pack) => (
                        <StyledTableRow key={pack.updated.toString()}>
                            <StyledTableCell component="th" scope="row">
                                <Link to='/cards-list' onClick={e => getCardsHandler(e, pack._id, pack.name)}>{pack.name}</Link>
                            </StyledTableCell>
                            <StyledTableCell align="right">{pack.cardsCount}</StyledTableCell>
                            <StyledTableCell align="right">{pack.updated.toString().slice(0, 10)}</StyledTableCell>
                            <StyledTableCell align="right">{pack.user_name}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Button onClick={e => deletePackHandler(e, pack._id)}>Delete</Button>
                                <Button onClick={e => updatePackHandler(e, pack._id)}>Edit</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}