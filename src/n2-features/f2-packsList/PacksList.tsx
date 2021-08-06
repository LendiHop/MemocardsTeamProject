import React, {useEffect} from "react";
import {Container, Grid} from "@material-ui/core";
import {Sidebar} from "./p4-sidebar/Sidebar";
import PacksTable from "./p3-tables/PacksTable";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../n1-main/m2-bll/store/redux-store";
import {Redirect} from "react-router-dom";
import {getCardPacksTC} from "../../n1-main/m2-bll/reducers/packs-reducer";

export const PacksList: React.FC = () => {
    const maxCardsCount = useSelector<AppRootStateType, number>(state => state.packs.maxCardsCount)
    const minCardsCount = useSelector<AppRootStateType, number>(state => state.packs.minCardsCount)
    const [value, setValue] = React.useState<number[]>([minCardsCount, maxCardsCount]);

    const dispatch = useDispatch();
    const privatCards = useSelector<AppRootStateType, boolean>(state => state.cards.privatCards)
    useEffect(() => {
        dispatch(getCardPacksTC(value))
    }, [privatCards, value]);
    console.log('value'+ value)
    const packsTrue = useSelector<AppRootStateType, boolean>(state => state.cards.packsTrue)
    if (!packsTrue) {
        return <Redirect to={'/profile'}/>
    }
    return (
        <Container>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{height: "92vh"}}
            >
                <Grid item>
                    <Sidebar value={value} setValue={setValue}/>
                </Grid>
                <Grid item>
                    <PacksTable/>
                </Grid>
            </Grid>
        </Container>
    )
}
