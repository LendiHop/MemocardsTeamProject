import React from 'react';
import Modal from "./Modal";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {deleteCardPackTC} from "../../../m2-bll/b1-reducers/packs-reducer";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

type DeletePackModalContainerPropsType = {
    show: boolean
    setShow: (show: boolean) => void
    packId: string
}

export const DeletePackModalContainer: React.FC<DeletePackModalContainerPropsType> = ({show, setShow, packId}) => {
    const dispatch = useDispatch()

    const onCancel = () => {
        setShow(false)
    }

    const onConfirm = () => {
        setShow(false)
        dispatch(deleteCardPackTC(packId))
    }

    return (
        <>
            <Modal
                enableBackground={true}
                backgroundOnClick={() => setShow(false)}
                width={250}
                height={120}

                show={show}
            >
                <Typography variant="subtitle1" gutterBottom>Are you sure you want to delete that pack?</Typography>
                <Grid container direction='row' justifyContent='space-between'>
                    <Grid item><Button variant={'contained'} color={'secondary'} onClick={onCancel}>Cancel</Button></Grid>
                    <Grid item><Button variant={'contained'} color={'secondary'} onClick={onConfirm}>Confirm</Button></Grid>
                </Grid>
            </Modal>
        </>
    );
};


