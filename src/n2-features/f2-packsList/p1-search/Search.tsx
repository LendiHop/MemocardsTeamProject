import React from "react";
import {IconButton, InputBase, Paper} from "@material-ui/core";
import style from './Search.module.css'
import {Search} from '@material-ui/icons'

export const SearchPacks = () => {
    return <div>
        <Paper component={'form'} className={style.root}>
            <InputBase
                className={style.input}
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
            />
            <IconButton type="submit" className={style.iconButton} aria-label="search-icon">
                <Search/>
            </IconButton>

        </Paper>


    </div>
}