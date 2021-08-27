import React from "react";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

type SortArrowProps = {
    value: boolean
}

export const SortArrow: React.FC<SortArrowProps> = ({value}) => {
    if(value) return <ArrowDropUpIcon/>
    else return <ArrowDropDownIcon/>
}