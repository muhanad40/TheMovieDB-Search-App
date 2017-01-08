import themoviedb from '../themoviedb'

export function storeResults(results) {
    return {
        type: 'STORE_RESULTS',
        results
    }
}

export function clearResults() {
    return {
        type: 'CLEAR_RESULTS'
    }
}

export function search(keywords) {
    return dispatch => {
        dispatch({
            type: 'SEARCH',
            keywords
        })

        themoviedb.search.getMulti({"query": keywords}, function onSearchSuccess(res) {
            let parsedRes = JSON.parse(res)

            dispatch(storeResults(parsedRes))
        }, function onSearchError() {})
    }
}