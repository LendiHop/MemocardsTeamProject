import {makeStyles, Slider, Typography} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    root: {
        width: 300,
    },
});

function valuetext(value: number) {
    return `${value}°C`;
}

export default function RangeSlider() {
    const classes = useStyles();
    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Number of cards
            </Typography>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}
