import React, {useCallback, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";
import {StyledTableCell, StyledTableRow} from './PacksTable';
import {CardType} from "../../../../m3-dal/cards-api";
import {UpdateCardsModalContainer} from "../../f4-modals/UpdateCardsModalContainer";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { DeleteCardModalContainer } from '../../f4-modals/DeleteCardModalContainer';

export default function CardsTable() {
    const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards);
    const [showUpdateCardsModal, setShowUpdateCardsModal] = useState(false);
    const [showDeleteCardModal, setShowDeleteCardModal] = useState(false);
    const [currentCardData, setCurrentCardData] = useState(["id", "packId"]);

    const deleteCardHandler = useCallback((id: string, packId: string) => {
        setCurrentCardData([id, packId])
        setShowDeleteCardModal(true)
    }, [])

    const updateCardHandler = useCallback((id: string, packId: string) => {
        setCurrentCardData([id, packId]);
        setShowUpdateCardsModal(true)
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Question</StyledTableCell>
                        <StyledTableCell align="right">Answer</StyledTableCell>
                        <StyledTableCell align="right">Last Update</StyledTableCell>
                        <StyledTableCell align="right">Grade</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
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
                                <IconButton onClick={() => deleteCardHandler(card._id, card.cardsPack_id)}><DeleteIcon/></IconButton>
                                <IconButton onClick={() => updateCardHandler(card._id, card.cardsPack_id)}><EditIcon/></IconButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>

            {showDeleteCardModal &&
            <DeleteCardModalContainer
                show={showDeleteCardModal} setShow={setShowDeleteCardModal}
                packId={currentCardData[1]} cardId={currentCardData[0]}
            />}

            {showUpdateCardsModal &&
            <UpdateCardsModalContainer
                show={showUpdateCardsModal} setShow={setShowUpdateCardsModal}
                cardId={currentCardData[0]} cardsPackId={currentCardData[1]}
            />}
        </TableContainer>
    );
}