import React from 'react';
import Modal from "./Modal";
import {Button, FormControl, FormGroup, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {addCardPackTC} from "../n1-main/m2-bll/reducers/packs-reducer";
import {useFormik} from "formik";
import {postCardsTC, updateCardsTC} from "../n1-main/m2-bll/reducers/cards-reduser";
import {AppRootStateType} from "../n1-main/m2-bll/store/redux-store";

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
    // const packIdForAdd = useSelector<AppRootStateType, string>(state => state.cards.currentPackData.id)

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

                width={300}
                height={200}
                // modalOnClick={() => setShow(false)}

                show={show}
            >

                <form onSubmit={formik.handleSubmit}>

                    <FormControl>
                        <FormGroup>

                            <TextField label="enter question"
                                       margin="normal"
                                       {...formik.getFieldProps("question")}/>
                            {formik.touched.question && formik.errors.question ?
                                <div style={{color: "red"}}>{formik.errors.question}</div> : null}

                            <TextField label="enter answer"
                                       margin="normal"
                                       {...formik.getFieldProps("answer")}/>
                            {formik.touched.answer && formik.errors.answer ?
                                <div style={{color: "red"}}>{formik.errors.answer}</div> : null}

                            <Button type={'submit'} variant={'contained'} color={'primary'}>update card</Button>
                        </FormGroup>
                    </FormControl>
                </form>

            </Modal>
        </>
    );
};


