import React from "react";
import {IconButton, InputBase, Paper} from "@material-ui/core";
import Search from '@material-ui/icons/Search'
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

type SearchProps = {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleClick: () => void
    handleEnter: (event: React.KeyboardEvent<HTMLButtonElement>) => void
    placeholder: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 2,
            display: 'flex',
            alignItems: 'center',
        },
        input: {
            marginLeft: 30,
            flex: 1,
        },
        iconButton: {
            padding: 10,
            justifyContent: 'flex-end',
        },
    }),
);

export const SearchInput: React.FC<SearchProps> = ({placeholder, handleChange, handleEnter, handleClick}) => {
    const classes = useStyles();

    return <div>
        <Paper component={'form'} className={classes.root}>
            <InputBase
                className={classes.input}
                onChange={handleChange}
                placeholder={placeholder}
                inputProps={{'aria-label': 'search'}}
            />
            <IconButton type="submit" className={classes.iconButton} aria-label="search-icon" onClick={handleClick} onKeyDown={handleEnter}>
                <Search/>
            </IconButton>
        </Paper>
    </div>
}