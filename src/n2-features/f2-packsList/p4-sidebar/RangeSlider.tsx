import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {useDispatch} from "react-redux";
import {setMinMaxValues} from "../../../n1-main/m2-bll/reducers/packs-reducer";

const useStyles = makeStyles({
    root: {
        width: 100,
    },
});

export default function RangeSlider() {
    const dispatch = useDispatch();

    const [value, setValue] = React.useState<number[]>([0, 100]);

    const classes = useStyles();

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleSearch = () => {
        dispatch(setMinMaxValues(value));
    }

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Set min/max number of cards in every pack:
            </Typography>
            <Slider
                onMouseUp={handleSearch}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
            />
        </div>
    );
}
