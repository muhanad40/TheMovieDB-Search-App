let initialState = {
    results: [],
    configuration: {}
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

        case 'STORE_CONFIGURATION':
            newState = Object.assign({}, state)
            newState.configuration = action.configuration
            return newState

        default:
            return state
    }
}

export default appReducer
