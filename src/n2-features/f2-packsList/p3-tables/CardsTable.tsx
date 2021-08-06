import React, {useCallback} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {StyledTableCell, StyledTableRow, useStyles} from './PacksTable';
import {CardType} from "../../../n1-main/m3-dal/api/cards-api";
import {Button} from "@material-ui/core";
import {deleteCardsTC, postCardsTC, updateCardsTC} from "../../../n1-main/m2-bll/reducers/cards-reduser";

export default function CardsTable() {
    const dispatch = useDispatch();
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards);
    const packIdForAdd = useSelector<AppRootStateType, string>(state => state.cards.currentPackData.id);

    const classes = useStyles();

    const addCardHandler = useCallback(() => {
        dispatch(postCardsTC(packIdForAdd))
    }, [])

    const deleteCardHandler = useCallback((e, id: string, packId: string) => {
        debugger
        dispatch(deleteCardsTC(packId, id))
    }, [])

    const updateCardHandler = useCallback((e, id: string, packId: string) => {
        dispatch(updateCardsTC(packId, id))
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Question</StyledTableCell>
                        <StyledTableCell align="right">Answer</StyledTableCell>
                        <StyledTableCell align="right">Last Update</StyledTableCell>
                        <StyledTableCell align="right">Grade</StyledTableCell>
                        <StyledTableCell align="right">
                            <Button variant="contained" onClick={addCardHandler}>
                                Add New Card
                            </Button>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards.map((card) => (
                        <StyledTableRow key={card.updated.toString()}>
                            <StyledTableCell component="th" scope="row">{card.question}</StyledTableCell>
                            <StyledTableCell align="right">{card.answer}</StyledTableCell>
                            <StyledTableCell align="right">{card.updated.toString().slice(0, 10)}</StyledTableCell>
                            <StyledTableCell align="right">{card.grade}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Button onClick={e => deleteCardHandler(e, card._id, card.cardsPack_id)}>Delete</Button>
                                <Button onClick={e => updateCardHandler(e, card._id, card.cardsPack_id)}>Edit</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}