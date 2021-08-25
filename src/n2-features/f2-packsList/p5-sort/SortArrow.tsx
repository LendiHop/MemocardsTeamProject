import React from "react";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

type SortArrowProps = {
    value: boolean
    handleClick: () => void
}

export const SortArrow: React.FC<SortArrowProps> = ({value, handleClick}) => {
    if(value) return <ArrowDropUpIcon onClick={handleClick}/>
    else return <ArrowDropDownIcon onClick={handleClick}/>
}