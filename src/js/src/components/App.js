import React, { Component } from 'react'
import { connect } from 'react-redux'
import template from "../templates/App"
import { search, clearResults, fetchConfiguration } from '../actions'

const mapStateToProps = (state) => {
    return {
        results: state.appReducer.results
    }
}

export class App extends Component {
    componentDidMount() {
        this.props.dispatch(fetchConfiguration())
    }

    onChange(e) {
        if(e.target.value == '') {
            this.props.dispatch(clearResults())
        } else {
            this.props.dispatch(search(e.target.value))
        }
    }

    render() {
        return template.apply(this)
    }
}

export default connect(mapStateToProps)(App)