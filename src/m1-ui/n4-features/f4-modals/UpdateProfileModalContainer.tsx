import React from 'react';
import Modal from "./Modal";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {editProfileTC} from "../../../m2-bll/b1-reducers/profile-reducer";
import Grid from "@material-ui/core/Grid";

type UpdatePackModalContainerPropsType = {
    show: boolean
    setShow: (show: boolean) => void
    profileName: string
}

export const UpdateProfileModalContainer: React.FC<UpdatePackModalContainerPropsType> = ({show, setShow, profileName}) => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            avatarUrl: '',
            profileName: profileName,
        },
        onSubmit: values => {
            setShow(false)
            dispatch(editProfileTC(values.profileName, values.avatarUrl))
            formik.resetForm();
        },
    })

    return (
        <>
            <Modal
                enableBackground={true}
                backgroundOnClick={() => setShow(false)}
                width={250}
                height={250}
                show={show}
            >

                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <Grid container direction='column' spacing={3} alignItems='center'>
                                <Grid item>
                                    <TextField label="Enter new avatar URL"
                                               margin="normal"
                                               {...formik.getFieldProps("avatarUrl")}/>
                                </Grid>
                                <Grid item>
                                    <TextField label="Enter new name"
                                               margin="normal"
                                               {...formik.getFieldProps("profileName")}/>
                                </Grid>
                                <Grid item>
                                    <Button type={'submit'} variant={'contained'} color='secondary'>Change</Button>
                                </Grid>
                            </Grid>
                        </FormGroup>
                    </FormControl>
                </form>

            </Modal>
        </>
    );
};


