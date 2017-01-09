import React, { Component } from 'react'
import { connect } from 'react-redux'
import template from '../templates/Results'

const mapStateToProps = (state) => {
    return {
        results: state.appReducer.results
    }
}

export class Results extends Component {
    render() {
        return template.apply(this)
    }
}

export default connect(mapStateToProps)(Results)