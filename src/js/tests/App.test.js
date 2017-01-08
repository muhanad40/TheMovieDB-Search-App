import React from 'react'
import { Provider, connect } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ConnectedApp, { App } from '../src/components/App'
import testResponses from './test_responses'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

let store = mockStore()

describe('App component', () => {
    let server

    beforeEach(() => {
        server = sinon.fakeServer.create()
    })

    afterEach(() => {
        server.restore()
    })

    it('should call onChange callback when text is entered into search box', () => {
        sinon.spy(App.prototype, 'onChange')

        let AppComponent = connect((state) => { return {} })(App),
            component = mount(
                <Provider store={ store }>
                    <AppComponent />
                </Provider>
            ),
            inputEl = component.find('input')

        inputEl.simulate('change', {target: {value: 'The matrix'}})

        expect(App.prototype.onChange.called).toEqual(true)
        App.prototype.onChange.restore()
    })

    it('should clear results when search input has been cleared', () => {
        let store = mockStore({
                appReducer: {
                    results: testResponses.searchResults.results
                }
            }),
            component = mount(
                <Provider store={ store }>
                    <ConnectedApp />
                </Provider>
            ),
            inputEl = component.find('input')

        inputEl.simulate('change', { target: { value: 'The matrix' } })
        inputEl.simulate('change', { target: { value: '' } })

        setTimeout(() => {
            expect(component.node.store.getState().appReducer.results.length).toEqual(0)
        })
    })

    it('should fetch configuration when the app is initially loaded', () => {
        let store = mockStore({
                appReducer: {
                    results: []
                }
            }),
            component = mount(
                <Provider store={ store }>
                    <ConnectedApp />
                </Provider>
            )

        expect(server.requests[0].url).toMatch(/http:\/\/api.themoviedb.org\/3\/configuration/)
    })
})