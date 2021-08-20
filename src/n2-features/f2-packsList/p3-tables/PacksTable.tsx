import React, {useCallback, useState} from 'react';
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
    CardPackType,
    deleteCardPackTC,
} from "../../../n1-main/m2-bll/reducers/packs-reducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {Button} from "@material-ui/core";
import {Link, Redirect} from "react-router-dom";
import {AddPackModalContainer} from "../../../common/AddPackModalContainer";
import {UpdatePackModalContainer} from "../../../common/UpdatePackModalContainer";

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
type PropsType = {
    userId: string
}

export default function PacksTable(props: PropsType) {
    const dispatch = useDispatch();

    const [showAddPackModal, setShowAddPackModal] = useState(false)
    const [showUpdatePackModal, setShowUpdatePackModal] = useState(false)

    const cardPacks = useSelector<AppRootStateType, Array<CardPackType>>(state => state.packs.cardPacks);

    const classes = useStyles();

    const addPackHandler = useCallback(() => {

        setShowAddPackModal(true)

    }, [])

    const deletePackHandler = useCallback(( id: string) => {
        dispatch(deleteCardPackTC(id))

    }, [])

    const updatePackHandler = useCallback(() => {
        setShowUpdatePackModal(true)

    }, [])

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
                            {showAddPackModal &&
                            <AddPackModalContainer show={showAddPackModal} setShow={setShowAddPackModal}/>}
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cardPacks.map((pack) => (
                        <StyledTableRow key={pack.updated.toString()}>
                            <StyledTableCell component="th" scope="row">
                                <Link to={`/cards-list/${pack.name}/${pack._id}`}>{pack.name}</Link>
                            </StyledTableCell>
                            <StyledTableCell align="right">{pack.cardsCount}</StyledTableCell>
                            <StyledTableCell align="right">{pack.updated.toString().slice(0, 10)}</StyledTableCell>
                            <StyledTableCell align="right">{pack.user_name}</StyledTableCell>
                            <StyledTableCell align="right">
                                <Button onClick={() => deletePackHandler( pack._id)}
                                        disabled={!(pack.user_id === props.userId)}>Delete</Button>
                                <Button onClick={updatePackHandler}
                                        disabled={!(pack.user_id === props.userId)}>Edit</Button>
                                <Link to={`/learn/${pack.name}/${pack._id}`}>Learn</Link>
                                {showUpdatePackModal &&
                                <UpdatePackModalContainer
                                    show={showUpdatePackModal} setShow={setShowUpdatePackModal}
                                    packId={pack._id}
                                />}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}