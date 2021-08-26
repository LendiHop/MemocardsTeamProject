import React from "react";
import {SuperSearch} from "./Search";
import {useDispatch} from "react-redux";
import {setSearchQuery} from "../../../../m2-bll/b1-reducers/packs-reducer";

export const SearchContainer = () => {
    const dispatch = useDispatch();

    let inputValue: string;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        inputValue = event.target.value;
    }

    const handleClick = () => {
        dispatch(setSearchQuery(inputValue));
    }

    const handleEnter = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter') {
            dispatch(setSearchQuery(inputValue));
        }
    }

    return <div>
        <SuperSearch handleChange={handleChange} handleClick={handleClick} handleEnter={handleEnter}/>
    </div>
}