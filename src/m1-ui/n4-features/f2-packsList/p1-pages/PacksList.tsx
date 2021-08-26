import React, {useEffect, useState} from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import {Sidebar} from "../p4-sidebar/Sidebar";
import PacksTable from "../p3-tables/PacksTable";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";
import {getCardPacksTC, setPage, setPageCount, setSearchQuery} from "../../../../m2-bll/b1-reducers/packs-reducer";
import { SearchInput } from "../p2-search/Search";
import TablePagination from "@material-ui/core/TablePagination";

export const PacksList: React.FC = () => {
    const dispatch = useDispatch();

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
        dispatch(setPage(newPage+1));
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch(setPageCount(parseInt(event.target.value, 10)));
        dispatch(setPage(0));
    };

    return (
        <Container>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{height: "92vh"}}
            >
                <Grid item>
                    <Sidebar/>
                </Grid>
                <Grid item>
                    <SearchInput placeholder="Search pack by name.." handleClick={handleClick} handleEnter={handleEnter} handleChange={handleChange}/>
                    <PacksTable userId={userId}/>
                    <TablePagination
                        component="div"
                        count={cardPacksTotalCount}
                        page={page-1}
                        onPageChange={handleChangePage}
                        rowsPerPage={pageCount}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}
