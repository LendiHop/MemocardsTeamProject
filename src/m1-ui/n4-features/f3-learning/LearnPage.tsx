import React, {useEffect, useState} from "react";
import {CardType} from "../../../m3-dal/cards-api";
import {AppRootStateType} from "../../../m2-bll/b0-store/redux-store";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {getCardsTC, updateGradeTC} from "../../../m2-bll/b1-reducers/cards-reduser";
import {Button, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup} from "@material-ui/core";
import s from "../f1-auth/a1-login/Login.module.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
        return {sum: newSum, id: newSum < rand ? i : acc.id}
    }, {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const LearnPage: React.FC = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const {cards} = useSelector((store: AppRootStateType) => store.cards);
    const {id, name} = useParams<{ id: string, name: string }>(); // current pack data

    let grade: number;

    const [card, setCard] = useState<CardType>({
        _id: 'fake',
        __v: 0,
        cardsPack_id: '',

        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,
        user_id: '',
        type: '',
        rating: 0,
        more_id: '',
        created: '',
        updated: '',
    });

    const dispatch = useDispatch();
    useEffect(() => {
        console.log('LearnContainer useEffect');

        if (first) {
            dispatch(getCardsTC(id));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, id, cards, first]);

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            dispatch(updateGradeTC(card._id, grade));
            setCard(getCard(cards));
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        grade = +event.target.value;
    };

    return (
        <Grid container justifyContent="center" alignItems="center" className={s.container}>
            <Grid item>
                <Paper style={{padding: '15px'}}>
                    <Link to='/packs-list'><ArrowBackIcon style={{ fontSize: 30 }}/></Link>
                    <h2>Learn "{name}"</h2>
                    <div>Go to pack lists</div>
                    <h5>Question: "{card.question}"</h5>

                    {isChecked || (
                        <div>
                            <Button onClick={() => setIsChecked(true)}>Check</Button>
                        </div>
                    )}

                    {isChecked && (
                        <>
                            <h5>Answer: "{card.answer}"</h5>

                            <FormControl component="fieldset">
                                <FormLabel component="legend">---Rate yourself---</FormLabel>
                                <RadioGroup defaultValue="1" aria-label="grade" name="grade" onChange={handleChange}>
                                    <FormControlLabel value="1" control={<Radio color="primary"/>} label="Didn't know"/>
                                    <FormControlLabel value="2" control={<Radio color="primary"/>} label="Forgot"/>
                                    <FormControlLabel value="3" control={<Radio color="primary"/>}
                                                      label="A lot of thought"/>
                                    <FormControlLabel value="4" control={<Radio color="primary"/>} label="Confused"/>
                                    <FormControlLabel value="5" control={<Radio color="primary"/>}
                                                      label="Knew the answer"/>
                                </RadioGroup>
                            </FormControl>

                            <div><Button onClick={onNext}>Next</Button></div>
                        </>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default LearnPage;