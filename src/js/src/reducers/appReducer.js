let initialState = {
    results: []
}

const appReducer = (state = initialState, action) => {
    let newState

    switch (action.type) {
        case 'STORE_RESULTS':
            newState = Object.assign({}, state)
            newState.results = action.results
            return newState

        case 'CLEAR_RESULTS':
            newState = Object.assign({}, state)
            newState.results = []
            return newState

        default:
            return state
    }
}

export default appReducer
