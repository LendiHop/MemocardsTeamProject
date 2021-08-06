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

type PropsType = {
    value: number []
    setValue: Function
}

export const DoubleSlider:React.FC<PropsType> = ({value, setValue}) => {
    const classes = useStyles();


    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" gutterBottom>
                Number of cards
            </Typography>
            <Slider
                style={{width: '170px'}}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}
