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

    // TODO: Fix this test. Mock store is not detecting the second action for whatever reason :/
    it('should fetch results', (done) => {
        let expectedActions = [
                { type: 'SEARCH', keywords: 'the departed' },
                { type: 'STORE_RESULTS', results: testResponses.searchResults.results }
            ]

        store.dispatch(search('the departed'))

        setTimeout(() => {
            server.requests[0].respond(200,
                                       { "Content-Type": "application/json" },
                                       JSON.stringify(testResponses.searchResults))

            expect(store.getActions()).toEqual(expectedActions)
            expect(server.requests[0].url).toMatch(/query=the departed/)
            done()
        }, 400)
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