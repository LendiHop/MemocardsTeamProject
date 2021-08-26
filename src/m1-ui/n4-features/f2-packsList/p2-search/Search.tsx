import React from "react";
import {IconButton, InputBase, Paper} from "@material-ui/core";
import style from './Search.module.css'
import {Search} from '@material-ui/icons'

type SearchProps = {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleClick: () => void
    handleEnter: (event: React.KeyboardEvent<HTMLButtonElement>) => void
    placeholder: string
}

export const SearchInput: React.FC<SearchProps> = ({placeholder, handleChange, handleEnter, handleClick}) => {
    return <div>
        <Paper component={'form'} className={style.root}>
            <InputBase
                className={style.input}
                onChange={handleChange}
                placeholder={placeholder}
                inputProps={{'aria-label': 'search'}}
            />
            <IconButton type="submit" className={style.iconButton} aria-label="search-icon" onClick={handleClick} onKeyDown={handleEnter}>
                <Search/>
            </IconButton>
        </Paper>
    </div>
}