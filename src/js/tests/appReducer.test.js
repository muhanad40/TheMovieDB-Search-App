import appReducer from '../src/reducers/appReducer'
import testResponses from './test_responses'

describe('appReducer', () => {
    it('should store results to store', () => {
        let initialState = {
                results: []
            },
            newState = appReducer(initialState, {
                type: 'STORE_RESULTS',
                results: testResponses.searchResults.results
            })

        expect(newState.results).toEqual(testResponses.searchResults.results)
    })

    it('should clear results from store', () => {
        let initialState = {
                results: testResponses.searchResults.results
            },
            newState = appReducer(initialState, {
                type: 'CLEAR_RESULTS'
            })

        expect(newState.results.length).toEqual(0)
    })
})