import React, {useEffect, useState} from "react";
import {CardType} from "../../../m3-dal/cards-api";
import {AppRootStateType} from "../../../m2-bll/b0-store/redux-store";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {getCardsTC, updateGradeTC} from "../../../m2-bll/b1-reducers/cards-reduser";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Container from "@material-ui/core/Container";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '93vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        paper: {
            maxWidth: 350,
            padding: 20,
        },
    }),
);

const LearnPage: React.FC = () => {
    const classes = useStyles();
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
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>

                    <Grid item container justifyContent='space-between' alignItems='center'>
                        <Grid item>
                            <Link to='/packs-list'><IconButton><ArrowBackIcon
                                style={{fontSize: 30}}/></IconButton></Link>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5" gutterBottom>Learn "{name}"</Typography>
                        </Grid>
                    </Grid>

                    <Grid item container direction='column' spacing={3}>
                        <Grid item>
                            <Typography variant="subtitle1" gutterBottom>Question: "{card.question}"</Typography>
                        </Grid>
                            {isChecked || (
                                <Grid item>
                                    <Button onClick={() => setIsChecked(true)}>Check</Button>
                                </Grid>
                            )}

                            {isChecked && (
                                <>
                                    <Grid item>
                                        <Typography variant="subtitle1" gutterBottom>Answer: "{card.answer}"</Typography>
                                    </Grid>

                                    <Grid item container direction='column' alignItems='center' spacing={2}>
                                    <Grid item>
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Rate yourself:</FormLabel>
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
                                    </Grid>

                                    <Grid item>
                                        <Button onClick={onNext} color='primary' variant='contained'>Next</Button>
                                    </Grid>
                                    </Grid>
                                </>
                            )}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default LearnPage;