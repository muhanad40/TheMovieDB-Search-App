import React, { Component } from 'react'
import { connect } from 'react-redux'
import template from "../templates/App"

const mapStateToProps = (state) => {
    return {}
}

export class App extends Component {
    onChange() {

    }

    render() {
        return template.apply(this)
    }
}

export default connect(mapStateToProps)(App)