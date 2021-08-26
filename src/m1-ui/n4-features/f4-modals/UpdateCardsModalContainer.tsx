import React from 'react';
import Modal from "./Modal";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {updateCardsTC} from "../../../m2-bll/b1-reducers/cards-reduser";

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

                            <TextareaAutosize  placeholder="enter question"
                                       {...formik.getFieldProps("question")}/>
                            {formik.touched.question && formik.errors.question ?
                                <div style={{color: "red"}}>{formik.errors.question}</div> : null}

                            <TextareaAutosize  placeholder="enter answer"
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


