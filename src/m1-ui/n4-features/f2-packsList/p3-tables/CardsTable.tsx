import React, {useCallback, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";
import {StyledTableCell, StyledTableRow, useStyles} from './PacksTable';
import {CardType} from "../../../../m3-dal/cards-api";
import {Button} from "@material-ui/core";
import {deleteCardsTC, setCardsSortValue} from "../../../../m2-bll/b1-reducers/cards-reduser";
import {AddCardsModalContainer} from "../../f4-modals/AddCardsModalContainer";
import {UpdateCardsModalContainer} from "../../f4-modals/UpdateCardsModalContainer";
import {SortArrow} from "../p5-sort/SortArrow";

export default function CardsTable() {
    const dispatch = useDispatch();

    const sort = useSelector<AppRootStateType, boolean>(state => state.cards.sort);
    const handleSortArrowClick = () => {
        dispatch(setCardsSortValue(!sort));
    }

    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards);
    const packUserId = useSelector<AppRootStateType, string>(state => state.cards.packUserId);
    const userId = useSelector<AppRootStateType, string>(state => state.profile._id);
    const [showAddCardsModal, setShowAddCardsModal] = useState(false)
    const [showUpdateCardsModal, setShowUpdateCardsModal] = useState(false)
    const classes = useStyles();

    const addCardHandler = useCallback(() => {

            setShowAddCardsModal(true)


    }, [])

    const deleteCardHandler = useCallback(( id: string, packId: string) => {

        dispatch(deleteCardsTC(packId, id))
    }, [])

    const updateCardHandler = useCallback(( ) => {
        setShowUpdateCardsModal(true)
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Question</StyledTableCell>
                        <StyledTableCell align="right">Answer</StyledTableCell>
                        <StyledTableCell align="right">Last Update</StyledTableCell>
                        <StyledTableCell align="right">Grade <SortArrow value={sort} handleClick={handleSortArrowClick}/></StyledTableCell>
                        <StyledTableCell align="right">
                            <Button variant="contained" onClick={addCardHandler} disabled={!(userId === packUserId)}>
                                Add New Card
                            </Button>
                            {showAddCardsModal &&
                            <AddCardsModalContainer show={showAddCardsModal} setShow={setShowAddCardsModal}/>}


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
                                <Button onClick={() => deleteCardHandler( card._id, card.cardsPack_id)}>Delete</Button>
                                <Button onClick={() => updateCardHandler( )}>Edit</Button>
                                {showUpdateCardsModal &&
                                <UpdateCardsModalContainer
                                    show={showUpdateCardsModal} setShow={setShowUpdateCardsModal}
                                    cardsPackId={card.cardsPack_id} cardId={card._id}
                                />}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}