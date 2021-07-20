let initialState = {

};

const appReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        // case "INITIALIZE_SUCCESS":
        //     return {
        //         ...state,
        //         initialized: true
        //     };
        default:
            return state;
    }
}

export default appReducer;