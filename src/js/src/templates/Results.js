import React from "react"
import ResultItem from '../components/ResultItem'

export default function() {
    let resultsItems = this.props.results.map(function iterateResultItems(resultItemData, index) {
        return <ResultItem key={ index } data={ resultItemData } />
    })

    return (
        <div>
            { resultsItems }
        </div>
    )
}