import React, { Component } from 'react'
import { connect } from 'react-redux'
import template from '../templates/ResultItem'

const mapStateToProps = (state) => {
    return {
        configuration: state.appReducer.configuration
    }
}

export class ResultItem extends Component {
    render() {
        return template.apply(this)
    }
}

export default connect(mapStateToProps)(ResultItem)