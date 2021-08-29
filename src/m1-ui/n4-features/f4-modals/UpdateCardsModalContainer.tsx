import React from 'react';
import Modal from "./Modal";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {updateCardsTC} from "../../../m2-bll/b1-reducers/cards-reduser";
import Grid from "@material-ui/core/Grid";

type UpdateCardsModalContainerPropsType = {
    show: boolean
    setShow: (show: boolean) => void
    cardsPackId: string
    cardId: string
}

type FormikErrorType = {
    question?: string
    answer?: string
}

export const UpdateCardsModalContainer: React.FC<UpdateCardsModalContainerPropsType> = (
    {show, setShow, cardsPackId, cardId}) => {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            question: '',
            answer: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.question) {
                errors.question = 'name is required';
            } else if (!/[A-Z]/i.test(values.question)) {
                errors.question = 'Invalid name';
            }
            if (!values.answer) {
                errors.answer = 'name is required';
            } else if (!/[A-Z]/i.test(values.answer)) {
                errors.answer = 'Invalid name';
            }

            return errors;
        },
        onSubmit: values => {

            setShow(false)
            dispatch(updateCardsTC(cardsPackId, cardId, values.question, values.answer))
            formik.resetForm();
        },
    })

    return (
        <>
            <Modal
                enableBackground={true}
                backgroundOnClick={() => setShow(false)}
                width={180}
                height={200}
                show={show}
            >

                <form onSubmit={formik.handleSubmit}>

                    <FormControl>
                        <FormGroup>
                            <Grid container direction='column' spacing={1} alignItems='center'>
                                <Grid item>
                                    <TextareaAutosize minRows={3} placeholder="enter question"
                                                       {...formik.getFieldProps("question")}/>
                                    {formik.touched.question && formik.errors.question ?
                                        <div style={{color: "red"}}>{formik.errors.question}</div> : null}
                                </Grid>
                                <Grid item>
                                    <TextareaAutosize minRows={3} placeholder="enter answer"
                                                       {...formik.getFieldProps("answer")}/>
                                    {formik.touched.answer && formik.errors.answer ?
                                        <div style={{color: "red"}}>{formik.errors.answer}</div> : null}
                                </Grid>
                                <Grid item>
                                    <Button type={'submit'} variant={'contained'} color={'secondary'}>update card</Button>
                                </Grid>
                            </Grid>
                        </FormGroup>
                    </FormControl>
                </form>

            </Modal>
        </>
    );
};


