import React from 'react';
import Modal from "./Modal";
import {Button, FormControl, FormGroup, TextField} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {addCardPackTC} from "../n1-main/m2-bll/reducers/packs-reducer";
import {useFormik} from "formik";

type AddPackModalContainerPropsType = {
    show: boolean
    setShow: (show: boolean) => void
}

type FormikErrorType = {
    packName?: string
}

export const AddPackModalContainer: React.FC<AddPackModalContainerPropsType> = ({show, setShow}) => {
    const dispatch = useDispatch()


    const formik = useFormik({
        initialValues: {
            packName: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.packName) {
                errors.packName = 'name is required';
            } else if (!/[A-Z]/i.test(values.packName)) {
                errors.packName = 'Invalid name';
            }

            return errors;
        },
        onSubmit: values => {

            setShow(false)
            dispatch(addCardPackTC({name: values.packName}))
            formik.resetForm();
        },
    })

    return (
        <>


            <Modal
                enableBackground={true}
                backgroundOnClick={() => setShow(false)}

                width={300}
                height={200}
                // modalOnClick={() => setShow(false)}

                show={show}
            >

                <form onSubmit={formik.handleSubmit}>

                    <FormControl>
                        <FormGroup>

                            <TextField label="enter pack name"
                                       margin="normal"
                                       {...formik.getFieldProps("packName")}/>
                            {formik.touched.packName && formik.errors.packName ?
                                <div style={{color: "red"}}>{formik.errors.packName}</div> : null}

                            <Button type={'submit'} variant={'contained'} color={'primary'}>add pack</Button>
                        </FormGroup>
                    </FormControl>
                </form>

            </Modal>
        </>
    );
};


