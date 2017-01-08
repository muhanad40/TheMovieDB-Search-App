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
})