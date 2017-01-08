import React from 'react'
import { Provider, connect } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ConnectedApp, { App } from '../src/components/App'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

let store = mockStore()

describe('App component', () => {
    it('should call onChange callback when text is entered into search box', () => {
        App.prototype.onChange = sinon.spy()

        let AppComponent = connect((state) => { return {} })(App),
            linkComponent = mount(
                <Provider store={ store }>
                    <AppComponent />
                </Provider>
            ),
            elements = linkComponent.find('input')

        elements.value = 'the matrix'
        elements.simulate('change')

        expect(App.prototype.onChange.called).toEqual(true)
    })

    it('should clear results when search input has been cleared')
})