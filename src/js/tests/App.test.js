import React from 'react'
import { Provider, connect } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ConnectedApp, { App } from '../src/components/App'
import testResponses from './test_responses'
import Results from '../src/components/Results'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('App component', () => {
    let store = mockStore({
            appReducer: {
                configuration: testResponses.configuration,
                results: testResponses.searchResults.results
            }
        }),
        server

    beforeEach(() => {
        server = sinon.fakeServer.create()
    })

    afterEach(() => {
        server.restore()
    })

    it('should call onChange callback when text is entered into search box', () => {
        sinon.spy(App.prototype, 'onChange')

        let AppComponent = connect((state) => { return { results: state.appReducer.results } })(App),
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

    // it('should clear results when search input has been cleared', (done) => {
    //     let component = mount(
    //             <Provider store={ store }>
    //                 <ConnectedApp />
    //             </Provider>
    //         ),
    //         inputEl = component.find('input')

    //     inputEl.simulate('change', { target: { value: 'The matrix' } })
    //     inputEl.simulate('change', { target: { value: '' } })

    //     setTimeout(() => {
    //         expect(component.node.store.getState().appReducer.results.length).toEqual(0)
    //         done()
    //     }, 1000)
    // })

    it('should fetch configuration when the app is initially loaded', () => {
        let component = mount(
                <Provider store={ store }>
                    <ConnectedApp />
                </Provider>
            )

        expect(server.requests[0].url).toMatch(/http:\/\/api.themoviedb.org\/3\/configuration/)
    })

    it('should render results if any exist', () => {
        let component = mount(
                <Provider store={ store }>
                    <ConnectedApp />
                </Provider>
            ),
            resultsComponent = component.find(Results)

        expect(resultsComponent.length).toEqual(1)
    })

    it('should not render results if no result items exist', () => {
        let store = mockStore({
                appReducer: {
                    results: []
                }
            }),
            component = mount(
                <Provider store={ store }>
                    <ConnectedApp />
                </Provider>
            ),
            resultsComponent = component.find(Results)

        expect(resultsComponent.length).toEqual(0)
    })
})