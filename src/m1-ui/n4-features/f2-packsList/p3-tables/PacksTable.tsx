import React, {useCallback, useState} from 'react';
import {createStyles, Theme, withStyles} from '@material-ui/core/styles';
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
    setPacksSortValue,
} from "../../../../m2-bll/b1-reducers/packs-reducer";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {UpdatePackModalContainer} from "../../f4-modals/UpdatePackModalContainer";
import {SortArrow} from "../p5-sort/SortArrow";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SchoolIcon from '@material-ui/icons/School';
import {DeletePackModalContainer} from "../../f4-modals/DeletePackModalContainer";

export const StyledTableCell = withStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: theme.palette.primary.main,
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

type PacksTablePropsType = {
    userId: string
}

export default function PacksTable(props: PacksTablePropsType) {
    const dispatch = useDispatch();

    const sort = useSelector<AppRootStateType, boolean>(state => state.packs.sort);
    const handleSortArrowClick = () => {
        dispatch(setPacksSortValue(!sort));
    }

    const [showUpdatePackModal, setShowUpdatePackModal] = useState(false);
    const [showDeletePackModal, setShowDeletePackModal] = useState(false);
    const [currentPackData, setCurrentPackData] = useState(["id", "name"]);

    const cardPacks = useSelector<AppRootStateType, Array<CardPackType>>(state => state.packs.cardPacks);

    const deletePackHandler = useCallback((id: string) => {
        setCurrentPackData([id])
        setShowDeletePackModal(true)
    }, [])

    const updatePackHandler = useCallback((id: string, name: string) => {
        setCurrentPackData([id, name])
        setShowUpdatePackModal(true)
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="right">Cards</StyledTableCell>
                        <StyledTableCell align="right">
                            <IconButton color='inherit' onClick={handleSortArrowClick}><SortArrow value={sort}/></IconButton>
                            Last Update
                        </StyledTableCell>
                        <StyledTableCell align="right">Created by</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cardPacks.map((pack) => (
                        <StyledTableRow key={pack.updated.toString()}>
                            <StyledTableCell component="th" scope="row">
                                <Link to={`/cards-list/${pack.name}/${pack._id}`}><Button>{pack.name}</Button></Link>
                            </StyledTableCell>
                            <StyledTableCell align="right">{pack.cardsCount}</StyledTableCell>
                            <StyledTableCell align="right">{pack.updated.toString().slice(0, 10)}</StyledTableCell>
                            <StyledTableCell align="right">{pack.user_name}</StyledTableCell>
                            <StyledTableCell align="right">
                                <IconButton onClick={() => deletePackHandler(pack._id)}
                                        disabled={!(pack.user_id === props.userId)}><DeleteIcon/></IconButton>
                                <IconButton onClick={() => updatePackHandler(pack._id, pack.name)}
                                        disabled={!(pack.user_id === props.userId)}><EditIcon/></IconButton>
                                <Link to={`/learn/${pack.name}/${pack._id}`}><IconButton><SchoolIcon/></IconButton></Link>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>

            {showDeletePackModal &&
            <DeletePackModalContainer
                show={showDeletePackModal} setShow={setShowDeletePackModal}
                packId={currentPackData[0]}
            />}

            {showUpdatePackModal &&
            <UpdatePackModalContainer
                show={showUpdatePackModal} setShow={setShowUpdatePackModal}
                packId={currentPackData[0]} packName={currentPackData[1]}
            />}

        </TableContainer>
    );
}