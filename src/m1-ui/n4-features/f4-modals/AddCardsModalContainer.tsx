import React from 'react';
import Modal from "./Modal";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {postCardsTC} from "../../../m2-bll/b1-reducers/cards-reduser";
import {useParams} from "react-router-dom";

type AddCardsModalContainerPropsType = {
    show: boolean
    setShow: (show: boolean) => void
}

type FormikErrorType = {
    question?: string
    answer?: string
}

export const AddCardsModalContainer: React.FC<AddCardsModalContainerPropsType> = ({show, setShow}) => {
    const dispatch = useDispatch()
    const {id} = useParams<{id: string, name: string}>()

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
            dispatch(postCardsTC(id, values.question, values.answer))
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

                            <TextareaAutosize placeholder="enter question"
                                       {...formik.getFieldProps("question")}/>
                            {formik.touched.question && formik.errors.question ?
                                <div style={{color: "red"}}>{formik.errors.question}</div> : null}

                            <TextareaAutosize placeholder="enter answer"
                                       {...formik.getFieldProps("answer")}/>
                            {formik.touched.answer && formik.errors.answer ?
                                <div style={{color: "red"}}>{formik.errors.answer}</div> : null}

                            <Button type={'submit'} variant={'contained'} color={'primary'}>add card</Button>
                        </FormGroup>
                    </FormControl>
                </form>

            </Modal>
        </>
    );
};


