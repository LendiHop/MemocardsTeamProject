let initialState = {

};

const authReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        //тут тоже пишете свою обработку, потом будем мержить
        // case "INITIALIZE_SUCCESS":
        //     return {
        //         ...state,
        //         initialized: true
        //     };
        default:
            return state;
    }
}

export default authReducer;