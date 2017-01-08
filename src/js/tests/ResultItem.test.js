import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import testResponses from './test_responses'
import ResultItem from '../src/components/ResultItem'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

let store = mockStore({
    appReducer: {
        configuration: testResponses.configuration
    }
})

describe('ResultItem component', () => {
    it('should render a result item', () => {
        let data = testResponses.searchResults.results[0],
            component = mount(
                <Provider store={ store }>
                    <ResultItem data={ data } />
                </Provider>
            ),
            resultItem = component.find(ResultItem)

        expect(resultItem.find('.result__title').text()).toEqual(data.title)
        expect(resultItem.find('.result__img').node.src).toEqual(`${testResponses.configuration.images.base_url}${testResponses.configuration.images.logo_sizes[2]}${data.poster_path}`)
        expect(resultItem.find('.result__type').text()).toEqual("Movie")
        expect(resultItem.find('.result__overview').text()).toEqual(data.overview)
    })

    it('should render an appropriate programme type', () => {
        let data = testResponses.searchResults.results[2],
            component = mount(
                <Provider store={ store }>
                    <ResultItem data={ data } />
                </Provider>
            ),
            resultItem = component.find(ResultItem)

        expect(resultItem.find('.result__type').text()).toEqual("TV")
    })
})