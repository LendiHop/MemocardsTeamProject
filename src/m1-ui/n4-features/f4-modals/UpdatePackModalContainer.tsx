import React from 'react';
import Modal from "./Modal";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import {useDispatch} from "react-redux";
import {updateCardPackTC} from "../../../m2-bll/b1-reducers/packs-reducer";
import {useFormik} from "formik";

type UpdatePackModalContainerPropsType = {
    show: boolean
    setShow: (show: boolean) => void
    packId: string
    packName: string
}

type FormikErrorType = {
    packName?: string
}

export const UpdatePackModalContainer: React.FC<UpdatePackModalContainerPropsType> = ({show, setShow, packId, packName}) => {
    const dispatch = useDispatch()


    const formik = useFormik({
        initialValues: {
            packName: packName,
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
            dispatch(updateCardPackTC({_id: packId, name: values.packName}))
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

                show={show}
            >

                <form onSubmit={formik.handleSubmit}>

                    <FormControl>
                        <FormGroup>

                            <TextField label="Enter new pack name"
                                       margin="normal"
                                       {...formik.getFieldProps("packName")}/>
                            {formik.touched.packName && formik.errors.packName ?
                                <div style={{color: "red"}}>{formik.errors.packName}</div> : null}

                            <Button type={'submit'} variant={'contained'} color={'primary'}>Change</Button>
                        </FormGroup>
                    </FormControl>
                </form>

            </Modal>
        </>
    );
};


