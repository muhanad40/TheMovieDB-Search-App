import React, { Component } from 'react'
import { connect } from 'react-redux'
import template from "../templates/App"

const mapStateToProps = (state) => {
    return {}
}

class App extends Component {

    render() {
        return template.apply(this)
    }
}

export default connect(mapStateToProps)(App)