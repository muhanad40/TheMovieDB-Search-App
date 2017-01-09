import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import testResponses from './test_responses'
import Results from '../src/components/Results'
import ResultItem from '../src/components/ResultItem'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

let store = mockStore({
    appReducer: {
        configuration: testResponses.configuration,
        results: testResponses.searchResults.results
    }
})

describe('Results component', () => {
    it('should render results', () => {
        let component = mount(
                <Provider store={ store }>
                    <Results />
                </Provider>
            ),
            resultItems = component.find(ResultItem)

        expect(resultItems.length).toEqual(testResponses.searchResults.results.length)
    })
})