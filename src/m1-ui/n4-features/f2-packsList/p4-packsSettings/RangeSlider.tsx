import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import {useDispatch, useSelector} from "react-redux";
import {setMinMaxValues} from "../../../../m2-bll/b1-reducers/packs-reducer";
import {AppRootStateType} from "../../../../m2-bll/b0-store/redux-store";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        width: 100,
    },
});

export default function RangeSlider() {
    const dispatch = useDispatch();
    const max = useSelector<AppRootStateType, number>(state => state.packs.max)
    const min = useSelector<AppRootStateType, number>(state => state.packs.min)

    const [value, setValue] = React.useState<number[]>([min, max]);

    const classes = useStyles();

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const handleSearch = () => {
        dispatch(setMinMaxValues(value));
    }

    return (
        <div className={classes.root}>
            <Typography id="range-slider" variant="caption">
                Min/Max cards
            </Typography>

            <Slider
                onMouseUp={handleSearch}
                value={value}
                onChange={handleChange}
                aria-labelledby="range-slider"
                valueLabelDisplay="auto"
            />
        </div>
    );
}
