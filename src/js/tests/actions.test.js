import { search, storeResults, clearResults, fetchConfiguration } from '../src/actions'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import testResponses from './test_responses'
import React from 'react'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('Actions', () => {
    it('should dispatch action to store results', () => {
        let action = storeResults(testResponses.searchResults.results)

        expect(action).toEqual({
            type: 'STORE_RESULTS',
            results: testResponses.searchResults.results
        })
    })

    it('should dispatch action to clear results', () => {
        let action = clearResults()

        expect(action).toEqual({
            type: 'CLEAR_RESULTS'
        })
    })
})

describe('Async actions', () => {
    let store,
        server

    beforeEach(() => {
        server = sinon.fakeServer.create()
        store = mockStore()
    })

    afterEach(() => {
        server.restore()
    })

    it('should fetch results', () => {
        let expectedActions = [
                { type: 'SEARCH', keywords: 'the matrix' },
                { type: 'STORE_RESULTS', results: [
                    testResponses.searchResults.results[0]
                ]}
            ]

        store.dispatch(search('the matrix'))

        server.requests[0].respond(200,
                                   { "Content-Type": "application/json" },
                                   JSON.stringify([testResponses.searchResults.results[0]]))

        expect(store.getActions()).toEqual(expectedActions)
        expect(server.requests[0].url).toMatch(/query=the matrix/)
    })

    it('should fetch tmdb configuration', () => {
        let expectedActions = [
                { type: 'FETCH_CONFIGURATION' },
                { type: 'STORE_CONFIGURATION', configuration: testResponses.configuration }
            ]

        store.dispatch(fetchConfiguration())

        server.requests[0].respond(200,
                                   { "Content-Type": "application/json" },
                                   JSON.stringify(testResponses.configuration))

        expect(store.getActions()).toEqual(expectedActions)
    })
})