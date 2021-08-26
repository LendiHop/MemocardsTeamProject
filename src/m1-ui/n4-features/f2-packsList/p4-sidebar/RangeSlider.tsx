import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {useDispatch} from "react-redux";
import {setMinMaxValues} from "../../../../m2-bll/b1-reducers/packs-reducer";

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
                Number of cards:
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
