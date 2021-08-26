import React from "react";
import {IconButton, InputBase, Paper} from "@material-ui/core";
import style from './Search.module.css'
import {Search} from '@material-ui/icons'

type SearchProps = {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleClick: () => void
    handleEnter: (event: React.KeyboardEvent<HTMLButtonElement>) => void
}

export const SuperSearch: React.FC<SearchProps> = ({handleChange, handleClick, handleEnter}) => {
    return <div>
        <Paper component={'form'} className={style.root}>
            <InputBase
                className={style.input}
                onChange={handleChange}
                placeholder="Search…"
                inputProps={{'aria-label': 'search'}}
            />
            <IconButton type="submit" className={style.iconButton} aria-label="search-icon" onClick={handleClick} onKeyDown={handleEnter}>
                <Search/>
            </IconButton>
        </Paper>
    </div>
}