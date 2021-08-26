import React from 'react'
import TablePagination from '@material-ui/core/TablePagination';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";
import {setPage, setPageCount} from "../../../../m2-bll/b1-reducers/packs-reducer";

export const PaginationContainer = () => {
    const dispatch = useDispatch();

    const page = useSelector<AppRootStateType, number>(state => state.packs.page);
    const pageCount = useSelector<AppRootStateType, number>(state => state.packs.pageCount);
    const cardPacksTotalCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        dispatch(setPage(newPage+1));
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(setPageCount(parseInt(event.target.value, 10)));
        dispatch(setPage(0));
    };

    return <>
        <TablePagination
            component="div"
            count={cardPacksTotalCount}
            page={page-1}
            onPageChange={handleChangePage}
            rowsPerPage={pageCount}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>

}